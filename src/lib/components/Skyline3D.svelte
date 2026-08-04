<script>
  // @ts-nocheck — creative WebGL code; three is vendored so types don't resolve
  /**
   * Cinematic 3D London — a full-viewport Three.js scene that lives behind the
   * entire homepage.
   *
   * On load:  towers rise from the ground in a staggered sweep, then the
   *           window lights flicker on across the city.
   * On scroll: the camera flies a curved path — from street level among the
   *           towers, up and over the city (revealing the ground grid from
   *           above), then back down to the horizon for the closing CTA.
   *           The city also slowly orbits as you descend. Content sections
   *           glide over the scene on translucent glass panels.
   * Always:   slow drift, eased mouse parallax, twinkling windows, gold dust.
   *
   * SSR-safe (vendored Three.js imported on mount), pauses offscreen/hidden,
   * honours prefers-reduced-motion, falls back to the flat SVG skyline.
   */
  import { onMount } from 'svelte';
  import Skyline from './Skyline.svelte';

  let container;
  let ready = $state(false);
  let failed = $state(false);

  onMount(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE;
      try {
        // vendored ESM build (src/lib/vendor) — no npm install required
        THREE = await import('$lib/vendor/three.module.min.js');
      } catch {
        failed = true;
        return;
      }
      if (disposed || !container) return;

      const GOLD = 0xc9a44c;
      const GOLD_LIGHT = 0xdfc57e;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        failed = true;
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .9s ease';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1200);

      const city = new THREE.Group();
      scene.add(city);

      // ---- deterministic RNG so the skyline is identical every visit ----
      const mulberry32 = (a) => () => {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
      const rand = mulberry32(20260804);

      const disposables = [];
      const track = (o) => { disposables.push(o); return o; };
      const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

      const lineMat = (opacity, color = GOLD, additive = false) =>
        track(new THREE.LineBasicMaterial({
          color, transparent: true, opacity,
          blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
          depthWrite: !additive
        }));

      // ---- buildings rise from the ground: each lives in a group we scale ----
      const buildings = [];
      const buildingGroup = (x, z) => {
        const g = new THREE.Group();
        g.position.set(x, 0, z);
        // stagger: centre rises first, edges follow like a wave
        g.userData.delay = 0.15 + (Math.abs(x) / 340) * 0.9 + (Math.abs(z) / 300) * 0.5 + rand() * 0.35;
        if (!reduceMotion) g.scale.y = 0.001;
        city.add(g);
        buildings.push(g);
        return g;
      };

      const addEdges = (group, geometry, material, lift = 0) => {
        geometry.translate(0, lift, 0); // base at ground so scale.y grows upward
        const edges = track(new THREE.EdgesGeometry(geometry, 12));
        geometry.dispose();
        group.add(new THREE.LineSegments(edges, material));
      };

      const floorLines = (group, w, h, d, material) => {
        const pts = [];
        for (let y = 6.5; y < h - 2; y += 6.5) pts.push(-w / 2, y, d / 2 + 0.01, w / 2, y, d / 2 + 0.01);
        if (!pts.length) return;
        const geo = track(new THREE.BufferGeometry());
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        group.add(new THREE.LineSegments(geo, material));
      };

      // ---- window lights, collected globally, switched on after the rise ----
      const windowPts = [];
      const sprinkleWindows = (w, h, d, x, z, count) => {
        for (let i = 0; i < count; i++) {
          const face = rand();
          if (face < 0.6) windowPts.push(x - w / 2 + rand() * w, 4 + rand() * (h - 8), z + d / 2 + 0.3);
          else windowPts.push(x + (rand() < 0.5 ? -1 : 1) * (w / 2 + 0.3), 4 + rand() * (h - 8), z - d / 2 + rand() * d);
        }
      };

      const tower = (x, z, w, h, d, mat, { floors = null, windows = 0, crown = false } = {}) => {
        const g = buildingGroup(x, z);
        addEdges(g, new THREE.BoxGeometry(w, h, d), mat, h / 2);
        if (floors) floorLines(g, w, h, d, floors);
        if (windows) sprinkleWindows(w, h, d, x, z, windows);
        if (crown) addEdges(g, new THREE.BoxGeometry(w * 0.4, 6, d * 0.4), mat, h + 3);
      };

      // ---- landmarks ----
      const shard = (x, z, mat) => {
        const g = buildingGroup(x, z);
        const geo = new THREE.ConeGeometry(13, 132, 4, 1, true);
        geo.rotateY(Math.PI / 4);
        addEdges(g, geo, mat, 66);
        const pts = [];
        for (const t of [0.28, 0.52, 0.74]) {
          const r = 13 * (1 - t) * Math.SQRT2 * 0.5;
          pts.push(-r, 132 * t, r, r, 132 * t, r);
        }
        const sg = track(new THREE.BufferGeometry());
        sg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        g.add(new THREE.LineSegments(sg, mat));
      };

      const gherkin = (x, z, mat) => {
        const g = buildingGroup(x, z);
        const profile = [];
        const H = 66, R = 11;
        for (let i = 0; i <= 12; i++) {
          const t = i / 12;
          const r = R * Math.sin(Math.pow(t, 0.72) * Math.PI) * (1 - t * 0.12) + 0.6;
          profile.push(new THREE.Vector2(Math.max(r, 0.4), t * H));
        }
        addEdges(g, new THREE.LatheGeometry(profile, 10), mat, 0);
      };

      const canary = (x, z, mat, floors) => {
        const g = buildingGroup(x, z);
        addEdges(g, new THREE.BoxGeometry(26, 88, 26), mat, 44);
        if (floors) floorLines(g, 26, 88, 26, floors);
        const pyr = new THREE.ConeGeometry(15, 16, 4, 1);
        pyr.rotateY(Math.PI / 4);
        addEdges(g, pyr, mat, 96);
        sprinkleWindows(26, 88, 26, x, z, 14);
      };

      const btTower = (x, z, mat) => {
        const g = buildingGroup(x, z);
        addEdges(g, new THREE.CylinderGeometry(5, 5, 92, 10, 1, true), mat, 46);
        addEdges(g, new THREE.CylinderGeometry(6.5, 6.5, 5, 10, 1, true), mat, 72);
      };

      // ---- depth layers — front brightest (additive glow), back fades away ----
      const layers = [
        { z: 0,    opacity: 0.6,  floors: 0.18, n: 11, spread: 330, hMin: 22, hMax: 66,  windows: 9,  add: true },
        { z: -70,  opacity: 0.34, floors: 0.11, n: 13, spread: 420, hMin: 30, hMax: 92,  windows: 7,  add: true },
        { z: -150, opacity: 0.18, floors: 0,    n: 15, spread: 520, hMin: 36, hMax: 110, windows: 4,  add: false },
        { z: -240, opacity: 0.1,  floors: 0,    n: 16, spread: 620, hMin: 40, hMax: 120, windows: 0,  add: false }
      ];

      layers.forEach((L, li) => {
        const mat = lineMat(L.opacity, GOLD, L.add);
        const fMat = L.floors ? lineMat(L.floors) : null;
        for (let i = 0; i < L.n; i++) {
          const x = -L.spread / 2 + (i + 0.5) * (L.spread / L.n) + (rand() - 0.5) * 18;
          if (li === 0 && Math.abs(x) < 34) continue; // keep front-centre open for landmarks
          const centrality = 1 - Math.min(Math.abs(x) / (L.spread / 2), 1);
          const h = L.hMin + (L.hMax - L.hMin) * (0.35 + 0.65 * centrality) * (0.6 + rand() * 0.4);
          const w = 10 + rand() * 14;
          const d = 9 + rand() * 9;
          const z = L.z + (rand() - 0.5) * 24;
          tower(x, z, w, h, d, mat, {
            floors: fMat,
            windows: L.windows ? Math.round(L.windows * (0.5 + rand())) : 0,
            crown: rand() > 0.72
          });
        }
      });

      const landmarkMat = lineMat(0.5, GOLD_LIGHT, true);
      shard(-52, -46, landmarkMat);
      gherkin(38, -58, landmarkMat);
      canary(112, -104, lineMat(0.3, GOLD, true), null);
      btTower(-138, -96, lineMat(0.26));

      // ---- ground grid — reads beautifully when the camera flies overhead ----
      const grid = new THREE.GridHelper(900, 44, GOLD, GOLD);
      grid.material.transparent = true;
      grid.material.opacity = 0.07;
      track(grid.material); track(grid.geometry);
      scene.add(grid);

      // ---- window lights (switch on after the towers rise) ----
      let windows = null;
      if (windowPts.length) {
        const g = track(new THREE.BufferGeometry());
        g.setAttribute('position', new THREE.Float32BufferAttribute(windowPts, 3));
        const m = track(new THREE.PointsMaterial({
          color: GOLD_LIGHT, size: 1.7, sizeAttenuation: true,
          transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
        }));
        windows = new THREE.Points(g, m);
        scene.add(windows);
      }

      // ---- floating golden dust ----
      const DUST_N = 160;
      const dustPos = new Float32Array(DUST_N * 3);
      for (let i = 0; i < DUST_N; i++) {
        dustPos[i * 3] = (rand() - 0.5) * 500;
        dustPos[i * 3 + 1] = rand() * 160;
        dustPos[i * 3 + 2] = -40 - rand() * 200;
      }
      const dustGeo = track(new THREE.BufferGeometry());
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = track(new THREE.PointsMaterial({
        color: GOLD, size: 1.2, sizeAttenuation: true,
        transparent: true, opacity: 0.3, depthWrite: false, blending: THREE.AdditiveBlending
      }));
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      // ---- scroll-driven camera path: street → overhead → horizon ----
      const camPath = new THREE.CatmullRomCurve3([
        v3(0, 30, 165),    // hero: among the towers
        v3(-45, 105, 185), // rising, banking left
        v3(40, 175, 120),  // overhead — the grid revealed
        v3(90, 110, 200),  // sweeping back down
        v3(0, 46, 230)     // closing CTA: calm horizon
      ]);
      const lookPath = new THREE.CatmullRomCurve3([
        v3(0, 58, -60), v3(0, 45, -70), v3(0, 0, -90), v3(0, 30, -70), v3(0, 66, -50)
      ]);

      // ---- animation state ----
      const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
      const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      const clamp01 = (x) => Math.min(Math.max(x, 0), 1);

      const mouse = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      let scrollP = 0;      // raw scroll progress 0..1 over the page
      let smoothP = 0;      // eased version the camera follows
      let visible = true;
      let raf = 0;

      const onMouse = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onScroll = () => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        scrollP = clamp01(window.scrollY / max);
      };
      onScroll();

      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      const INTRO_CAM = v3(0, 12, 78);
      const INTRO_LOOK = v3(0, 85, -30);
      const camPos = new THREE.Vector3();
      const lookAt = new THREE.Vector3();
      const clock = new THREE.Clock();

      const renderFrame = () => {
        const t = clock.getElapsedTime();

        // -- intro choreography --
        const introT = reduceMotion ? 1 : easeInOut(clamp01((t - 0.1) / 2.6));
        if (!reduceMotion) {
          for (const g of buildings) {
            g.scale.y = Math.max(easeOutCubic(clamp01((t - g.userData.delay) / 1.2)), 0.001);
          }
          // windows flicker on once the city is up
          if (windows) {
            const on = clamp01((t - 1.9) / 1.2);
            windows.material.opacity = on * (0.5 + Math.sin(t * 1.7) * 0.1 + Math.sin(t * 3.3 + 1) * 0.05);
          }
        } else if (windows) {
          windows.material.opacity = 0.5;
        }

        // -- scroll-driven flight --
        smoothP += (scrollP - smoothP) * 0.055;
        const p = clamp01(smoothP);
        camPath.getPointAt(p, camPos);
        lookPath.getPointAt(p, lookAt);

        // blend from the intro dolly into the flight path
        camPos.lerpVectors(INTRO_CAM, camPos, introT);
        lookAt.lerpVectors(INTRO_LOOK, lookAt, introT);

        // drift + mouse parallax
        eased.x += (mouse.x - eased.x) * 0.03;
        eased.y += (mouse.y - eased.y) * 0.03;
        camPos.x += Math.sin(t * 0.05) * 9 + eased.x * 18;
        camPos.y += Math.sin(t * 0.085) * 2 - eased.y * 9;

        camera.position.copy(camPos);
        camera.lookAt(lookAt);

        // the city slowly orbits beneath you as you descend the page
        city.rotation.y = Math.sin(t * 0.03) * 0.012 + p * 0.22;
        grid.rotation.y = city.rotation.y;

        dust.position.y = Math.sin(t * 0.12) * 3;
        dust.rotation.y = t * 0.008;

        // dim while reading, bright in the hero, warm again at the close
        const fade = p < 0.08 ? 1 : p < 0.3 ? 1 - ((p - 0.08) / 0.22) * 0.55 : p > 0.86 ? 0.45 + ((p - 0.86) / 0.14) * 0.35 : 0.45;
        renderer.domElement.style.opacity = String(fade);

        renderer.render(scene, camera);
      };

      const loop = () => {
        raf = requestAnimationFrame(loop);
        renderFrame();
      };

      renderFrame();
      ready = true;

      if (!reduceMotion) {
        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        loop();
      } else {
        window.addEventListener('scroll', onScroll, { passive: true });
        // still follow scroll (single frames), just without continuous animation
        const onScrollFrame = () => renderFrame();
        window.addEventListener('scroll', onScrollFrame, { passive: true });
      }

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (reduceMotion) return;
        if (!visible) { cancelAnimationFrame(raf); raf = 0; }
        else if (!raf) loop();
      });
      io.observe(container);

      const onVis = () => {
        if (reduceMotion) return;
        if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
        else if (visible && !raf) loop();
      };
      document.addEventListener('visibilitychange', onVis);

      const ro = new ResizeObserver(() => { resize(); if (reduceMotion) renderFrame(); });
      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('scroll', onScroll);
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); });
        disposables.forEach((d) => d.dispose && d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  });
</script>

<!-- fixed, full-viewport, behind everything; content glides over it -->
<div bind:this={container} class="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
  {#if !ready || failed}
    <!-- SVG skyline as loading state / no-WebGL fallback -->
    <div class="absolute inset-x-0 bottom-0">
      <Skyline class="mx-auto w-full max-w-5xl" />
    </div>
  {/if}
</div>
