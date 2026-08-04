<script>
  import '../app.css';
  import { page } from '$app/state';
  import { services } from '$lib/data/services.js';

  let { children } = $props();
  let menuOpen = $state(false);

  const nav = [
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'Heritage' },
    { href: '/contact', label: 'Contact' }
  ];

  const isActive = (href) =>
    href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);

  const SITE = 'https://hrrltd.co.uk';
  const canonical = $derived(SITE + (page.url.pathname === '/' ? '' : page.url.pathname));
</script>

<svelte:head>
  <link rel="canonical" href={canonical} />
  <meta property="og:site_name" content="High Rise Refurbishments Ltd" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content="{SITE}/logo-full.png" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-navy-950 text-ivory">
  <!-- gold hairline across the very top -->
  <div class="h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>

  <header class="sticky top-0 z-50 border-b border-gold/15 bg-navy-950/90 backdrop-blur">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="/" class="group flex items-center gap-3.5" onclick={() => (menuOpen = false)}>
        <img src="/mark.png" alt="" class="h-10 w-auto" />
        <span class="leading-none">
          <span class="block font-serif text-xl font-semibold tracking-[0.18em] text-ivory group-hover:text-gold-light transition-colors duration-300">
            HIGH RISE
          </span>
          <span class="mt-1 block text-[0.55rem] font-medium uppercase tracking-widest2 text-gold">
            Refurbishments Ltd
          </span>
        </span>
      </a>

      <div class="hidden items-center gap-10 md:flex">
        {#each nav as item}
          <a
            href={item.href}
            class="text-[0.72rem] font-medium uppercase tracking-widest2 transition-colors duration-200
              {isActive(item.href) ? 'text-gold' : 'text-mist hover:text-ivory'}"
          >
            {item.label}
          </a>
        {/each}
        <a href="/contact" class="btn-ghost !px-5 !py-2.5">Speak to us</a>
      </div>

      <button
        class="text-mist hover:text-gold md:hidden"
        aria-label="Toggle menu"
        onclick={() => (menuOpen = !menuOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          {#if menuOpen}
            <path d="M5 5l14 14M19 5L5 19" />
          {:else}
            <path d="M3 6.5h18M3 12h18M3 17.5h18" />
          {/if}
        </svg>
      </button>
    </nav>

    {#if menuOpen}
      <div class="border-t border-gold/15 px-6 py-6 md:hidden">
        <div class="flex flex-col gap-5">
          {#each nav as item}
            <a
              href={item.href}
              onclick={() => (menuOpen = false)}
              class="text-[0.78rem] font-medium uppercase tracking-widest2 {isActive(item.href) ? 'text-gold' : 'text-mist'}"
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="border-t border-gold/15 bg-navy-900">
    <div class="mx-auto max-w-6xl px-6 pb-10 pt-16">
      <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-4">
            <img src="/mark.png" alt="" class="h-14 w-auto" />
            <span class="leading-none">
              <span class="block font-serif text-2xl font-semibold tracking-[0.18em] text-ivory">HIGH RISE</span>
              <span class="mt-1.5 block text-[0.6rem] font-medium uppercase tracking-widest2 text-gold">Refurbishments Ltd</span>
            </span>
          </div>
          <p class="mt-6 max-w-xs text-sm leading-relaxed text-mist">
            Securing your architectural legacy. Trusted property counsel to the region’s most
            influential owners and developers since 1965.
          </p>
        </div>
        <div>
          <p class="eyebrow mb-5">Services</p>
          <ul class="space-y-3 text-sm">
            {#each services as s}
              <li><a href="/services/{s.slug}" class="link-quiet">{s.name}</a></li>
            {/each}
          </ul>
        </div>
        <div>
          <p class="eyebrow mb-5">Company</p>
          <ul class="space-y-3 text-sm">
            <li><a href="/about" class="link-quiet">Our Heritage</a></li>
            <li><a href="/services" class="link-quiet">What We Do</a></li>
            <li><a href="/contact" class="link-quiet">Contact</a></li>
          </ul>
          <p class="eyebrow mb-4 mt-10">Enquiries</p>
          <a href="mailto:enquiries@hrrltd.co.uk" class="link-quiet text-sm">
            enquiries@hrrltd.co.uk
          </a>
        </div>
      </div>

      <div class="mt-14 flex flex-col items-start justify-between gap-3 border-t border-gold/10 pt-6 text-xs text-mist/70 sm:flex-row">
        <span>© {new Date().getFullYear()} High Rise Refurbishments Ltd. All rights reserved.</span>
        <span>A Jewel Group company</span>
      </div>
    </div>
  </footer>
</div>
