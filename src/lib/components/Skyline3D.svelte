<script>
  // @ts-nocheck — creative WebGL code; three is imported dynamically so types don't resolve
  /**
   * Full 3D London skyline — fine gold linework on navy, rendered with Three.js.
   *
   * - Depth-layered tower clusters with Shard / Gherkin / Canary Wharf silhouettes
   * - Slow cinematic camera drift + mouse parallax + subtle scroll response
   * - Twinkling window lights and floating golden dust
   * - SSR-safe (Three.js is imported dynamically on mount)
   * - Respects prefers-reduced-motion (renders a still frame)
   * - Falls back to the flat SVG skyline if WebGL is unavailable
   */
  import { onMount } from 'svelte';
  import Skyline from './Skyline.svelte';

  let { class: klass = '' } = $props();

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
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      } catch {
        failed = true;
        return;
      }

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      renderer.setClearColor(0x000000, 0); // transparent — page navy shows through
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity 1.4s ease';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 900);
      const CAM_BASE = { x: 0, y: 30, z: 185 };
      camera.position.set(CAM_BASE.x, CAM_BASE.y, CAM_BASE.z);

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
      const track = (obj) => { disposables.push(obj); return obj; };

      const lineMat = (opacity, color = GOLD) =>
        track(new THREE.LineBasicMaterial({ color, transparent: true, opacity }));

      const addEdges = (geometry, material, x, y, z, ry = 0) => {
        const edges = track(new THREE.EdgesGeometry(geometry, 12));
        geometry.dispose();
        const lines = new THREE.LineSegments(edges, material);
        lines.position.set(x, y, z);
        lines.rotation.y = ry;
        city.add(lines);
        return lines;
      };

      // ---- floor lines (storeys) on a facade ----
      const floorLines = (w, h, d, x, z, material) => {
        const pts = [];
        const step = 6.5;
        for (let y = step; y < h - 2; y += step) {
          pts.push(-w / 2, y, d / 2 + 0.01, w / 2, y, d / 2 + 0.01);
        }
        if (!pts.length) return;
        const geo = track(new THREE.BufferGeometry());
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const seg = new THREE.LineSegments(geo, material);
        seg.position.set(x, 0, z);
        city.add(seg);
      };

      // ---- window lights (points on facades, twinkled in the loop) ----
      const windowPts = [];
      const sprinkleWindows = (w, h, d, x, z, count) => {
        for (let i = 0; i < count; i++) {
          windowPts.push(
            x - w / 2 + rand() * w,
            4 + rand() * (h - 8),
            z + d / 2 + 0.3
          );
        }
      };

      // ---- generic tower ----
      const tower = (x, z, w, h, d, mat, { floors = null, windows = 0, crown = false } = {}) => {
        addEdges(new THREE.BoxGeometry(w, h, d), mat, x, h / 2, z);
        if (floors) floorLines(w, h, d, x, z, floors);
        if (windows) sprinkleWindows(w, h, d, x, z, windows);
        if (crown) {
          // slim rooftop plant / spire
          addEdges(new THREE.BoxGeometry(w * 0.4, 6, d * 0.4), mat, x, h + 3, z);
        }
      };

      // ---- The Shard — tapered 4-sided spire ----
      const shard = (x, z, mat) => {
        const geo = new THREE.ConeGeometry(13, 132, 4, 1, true);
        geo.rotateY(Math.PI / 4);
        addEdges(geo, mat, x, 66, z);
        // glazing seams
        const pts = [];
        for (const t of [0.28, 0.52, 0.74]) {
          const r = 13 * (1 - t) * Math.SQRT2 * 0.5;
          const y = 132 * t;
          pts.push(-r, y, r, r, y, r);
        }
        const g = track(new THREE.BufferGeometry());
        g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        const seg = new THREE.LineSegments(g, mat);
        seg.position.set(x, 0, z);
        city.add(seg);
      };

      // ---- The Gherkin — lathe profile with radial ribs ----
      const gherkin = (x, z, mat) => {
        const profile = [];
        const H = 66, R = 11;
        for (let i = 0; i <= 12; i++) {
          const t = i / 12;
          const r = R * Math.sin(Math.pow(t, 0.72) * Math.PI) * (1 - t * 0.12) + 0.6;
          profile.push(new THREE.Vector2(Math.max(r, 0.4), t * H));
        }
        const geo = new THREE.LatheGeometry(profile, 10);
        addEdges(geo, mat, x, 0, z);
      };

      // ---- One Canada Square — slab with pyramid roof ----
      const canary = (x, z, mat, floors) => {
        tower(x, z, 26, 88, 26, mat, { floors });
        const pyr = new THREE.ConeGeometry(15, 16, 4, 1);
        pyr.rotateY(Math.PI / 4);
        addEdges(pyr, mat, x, 96, z);
      };

      // ---- BT Tower-ish cylinder ----
      const btTower = (x, z, mat) => {
        addEdges(new THREE.CylinderGeometry(5, 5, 92, 10, 1, true), mat, x, 46, z);
        addEdges(new THREE.CylinderGeometry(6.5, 6.5, 5, 10, 1, true), mat, x, 72, z);
      };

      // ---- depth layers: front is brightest, back fades into the navy ----
      const layers = [
        { z: 0,    opacity: 0.55, floors: 0.16, n: 11, spread: 330, hMin: 22, hMax: 66 },
        { z: -70,  opacity: 0.3,  floors: 0.1,  n: 13, spread: 420, hMin: 30, hMax: 92 },
        { z: -150, opacity: 0.17, floors: 0,    n: 15, spread: 520, hMin: 36, hMax: 110 },
        { z: -240, opacity: 0.09, floors: 0,    n: 16, spread: 620, hMin: 40, hMax: 120 }
      ];

      layers.forEach((L, li) => {
        const mat = lineMat(L.opacity);
        const fMat = L.floors ? lineMat(L.floors) : null;
        for (let i = 0; i < L.n; i++) {
          const x = -L.spread / 2 + (i + 0.5) * (L.spread / L.n) + (rand() - 0.5) * 18;
          // keep a gap in the front-centre so landmarks read clearly
          if (li === 0 && Math.abs(x) < 34) continue;
          const centrality = 1 - Math.min(Math.abs(x) / (L.spread / 2), 1);
          const h = L.hMin + (L.hMax - L.hMin) * (0.35 + 0.65 * centrality) * (0.6 + rand() * 0.4);
          const w = 10 + rand() * 14;
          const d = 9 + rand() * 9;
          const z = L.z + (rand() - 0.5) * 24;
          tower(x, z, w, h, d, mat, {
            floors: fMat,
            windows: li <= 1 ? Math.round(3 + rand() * 7) : 0,
            crown: rand() > 0.72
          });
        }
      });

      // landmarks — mid-stage, slightly brighter than their row
      const landmarkMat = lineMat(0.42, GOLD_LIGHT);
      shard(-52, -46, landmarkMat);
      gherkin(38, -58, landmarkMat);
      canary(112, -104, lineMat(0.26), null);
      btTower(-138, -96, lineMat(0.24));

      // ---- ground grid — perspective floor ----
      const grid = new THREE.GridHelper(760, 34, GOLD, GOLD);
      grid.material.transparent = true;
      grid.material.opacity = 0.05;
      grid.position.y = 0;
      track(grid.material);
      track(grid.geometry);
      scene.add(grid);

      // baseline
      {
        const g = track(new THREE.BufferGeometry());
        g.setAttribute('position', new THREE.Float32BufferAttribute([-380, 0, 20, 380, 0, 20], 3));
        scene.add(new THREE.Line(g, lineMat(0.3)));
      }

      // ---- window lights ----
      let windows = null;
      if (windowPts.length) {
        const g = track(new THREE.BufferGeometry());
        g.setAttribute('position', new THREE.Float32BufferAttribute(windowPts, 3));
        const m = track(new THREE.PointsMaterial({
          color: GOLD_LIGHT, size: 1.6, sizeAttenuation: true,
          transparent: true, opacity: 0.55, depthWrite: false
        }));
        windows = new THREE.Points(g, m);
        city.add(windows);
      }

      // ---- floating golden dust ----
      const DUST_N = 90;
      const dustPos = new Float32Array(DUST_N * 3);
      for (let i = 0; i < DUST_N; i++) {
        dustPos[i * 3] = (rand() - 0.5) * 420;
        dustPos[i * 3 + 1] = rand() * 130;
        dustPos[i * 3 + 2] = -30 - rand() * 160;
      }
      const dustGeo = track(new THREE.BufferGeometry());
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = track(new THREE.PointsMaterial({
        color: GOLD, size: 1.1, sizeAttenuation: true,
        transparent: true, opacity: 0.28, depthWrite: false
      }));
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      // ---- interaction state ----
      const mouse = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      let scrollY = 0;
      let visible = true;
      let raf = 0;

      const onMouse = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onScroll = () => { scrollY = window.scrollY; };

      const resize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();

      const clock = new THREE.Clock();

      const renderFrame = () => {
        const t = clock.getElapsedTime();

        // cinematic drift
        const driftX = Math.sin(t * 0.045) * 10;
        const driftY = Math.sin(t * 0.08) * 1.6;

        // mouse parallax (eased)
        eased.x += (mouse.x - eased.x) * 0.028;
        eased.y += (mouse.y - eased.y) * 0.028;

        camera.position.x = CAM_BASE.x + driftX + eased.x * 14;
        camera.position.y = Math.max(CAM_BASE.y + driftY - eased.y * 6 + scrollY * 0.028, 12);
        camera.position.z = CAM_BASE.z;
        camera.lookAt(0, 52 + scrollY * 0.012, -60);

        // gentle scene breathing
        city.rotation.y = Math.sin(t * 0.03) * 0.012;

        // twinkle + dust
        if (windows) windows.material.opacity = 0.45 + Math.sin(t * 1.7) * 0.1 + Math.sin(t * 3.3 + 1) * 0.05;
        dust.position.y = Math.sin(t * 0.12) * 3;
        dust.rotation.y = t * 0.008;

        renderer.render(scene, camera);
      };

      const loop = () => {
        raf = requestAnimationFrame(loop);
        renderFrame();
      };

      // first frame, then fade the canvas in over the SVG fallback
      renderFrame();
      renderer.domElement.style.opacity = '1';
      ready = true;

      if (!reduceMotion) {
        window.addEventListener('mousemove', onMouse, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        loop();
      }

      // pause when offscreen / tab hidden
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
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
        });
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

<div bind:this={container} class="relative {klass}" aria-hidden="true">
  {#if !ready || failed}
    <!-- SVG skyline as loading state / no-WebGL fallback -->
    <div class="absolute inset-x-0 bottom-0">
      <Skyline class="mx-auto w-full max-w-5xl" />
    </div>
  {/if}
</div>
