<script>
  import Corners from '$lib/components/Corners.svelte';
  import Rule from '$lib/components/Rule.svelte';

  const values = [
    {
      title: 'Probity',
      copy: 'Absolute discretion and unwavering principles. Our counsel is honest even when honesty is inconvenient — that is what trusted stewardship demands.'
    },
    {
      title: 'Pioneering Spirit',
      copy: 'Venerable techniques augmented by cutting-edge engineering and project technology. We honour heritage by refusing to be limited by it.'
    },
    {
      title: 'Deference',
      copy: 'A deep respect for our clients’ assets and their future intentions. Every building carries a legacy; we treat each one as if it were our own.'
    }
  ];

  const timeline = [
    ['1965', 'Founded as a specialist refurbishment house, serving the region’s most influential owners and developers.'],
    ['1980s', 'Six-decade heritage takes shape — confidentiality and structural excellence become the firm’s hallmarks.'],
    ['2022', 'The Building Safety Act reshapes the industry. We invest early in BSR expertise and digital record-keeping.'],
    ['2026', 'Rebranded as High Rise Refurbishments Ltd — four integrated service arms under one accountable partnership.']
  ];
</script>

<svelte:head>
  <title>Our Heritage — High Rise Refurbishments Ltd</title>
  <meta
    name="description"
    content="For over six decades, High Rise Refurbishments Ltd has stood alongside the region's most influential owners and developers as their trusted property counsel."
  />
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-20 text-center md:pt-28">
  <p class="eyebrow">Our heritage</p>
  <h1 class="display mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
    Over six decades of <em class="text-gold-light">trusted service</em>
  </h1>
  <div class="mt-9"><Rule width="6rem" /></div>
</section>

<section class="mx-auto max-w-3xl px-6 py-16 md:py-20">
  <p class="font-serif text-2xl leading-snug text-ivory">
    For over sixty years, High Rise Refurbishments Ltd has stood alongside the region’s most
    influential owners and developers — stewards who shape our skylines, communities and
    architectural culture.
  </p>
  <p class="mt-7 leading-relaxed text-mist">
    As their trusted property counsel, we furnish them with more than simple service. We convey
    insight, absolute discretion, and a partnership forged upon shared tenets of quality and
    permanence. Our heritage of confidentiality and structural excellence is augmented by
    cutting-edge engineering and project technology, delivering seamless, individualised service
    and expert technical guidance.
  </p>
  <p class="mt-6 leading-relaxed text-mist">
    We undertake this with a deep sense of passion and pride in craftsmanship, underscored by
    unwavering principles that reflect probity, pioneering spirit, and a deep deference for our
    clients’ assets and their future intentions.
  </p>
</section>

<!-- values -->
<section class="border-y border-gold/15 bg-navy-900">
  <div class="mx-auto max-w-6xl px-6 py-20 md:py-24">
    <div class="text-center">
      <p class="eyebrow">What we stand upon</p>
      <h2 class="display mt-5 text-3xl md:text-4xl">Three unwavering principles</h2>
    </div>
    <div class="mt-14 grid gap-6 md:grid-cols-3">
      {#each values as v, i}
        <div class="relative border border-gold/20 p-9">
          <Corners size="1.1rem" inset="-1px" opacity="0.8" />
          <span class="font-serif text-2xl italic text-gold/50">{String(i + 1).padStart(2, '0')}</span>
          <h3 class="mt-4 font-serif text-2xl font-medium text-gold-light">{v.title}</h3>
          <p class="mt-4 text-sm leading-relaxed text-mist">{v.copy}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- timeline -->
<section class="mx-auto max-w-4xl px-6 py-20 md:py-28">
  <div class="text-center">
    <p class="eyebrow">The story so far</p>
    <h2 class="display mt-5 text-3xl md:text-4xl">A legacy, carefully extended</h2>
  </div>

  <div class="relative mt-16">
    <div class="thread-v absolute bottom-0 left-[3.2rem] top-0 sm:left-1/2"></div>
    <div class="space-y-14">
      {#each timeline as [year, copy], i}
        <div class="relative grid grid-cols-[6.4rem_1fr] items-start gap-6 sm:grid-cols-2 sm:gap-14">
          <div class="text-right {i % 2 === 1 ? 'sm:order-2 sm:text-left' : ''}">
            <span class="font-serif text-3xl font-medium text-gold-light">{year}</span>
          </div>
          <span
            class="absolute left-[3.2rem] top-3 block h-2 w-2 -translate-x-1/2 rotate-45 border border-gold bg-navy-950 sm:left-1/2"
            aria-hidden="true"
          ></span>
          <p class="text-sm leading-relaxed text-mist {i % 2 === 1 ? 'sm:order-1 sm:text-right' : ''}">
            {copy}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="border-t border-gold/15 bg-navy-900">
  <div class="mx-auto max-w-4xl px-6 py-24 text-center">
    <h2 class="display text-3xl md:text-4xl">
      The next chapter is written <em class="text-gold-light">with our clients</em>
    </h2>
    <a href="/contact" class="btn-gold mt-10">Begin the conversation</a>
  </div>
</section>
