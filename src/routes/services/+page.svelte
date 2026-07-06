<script>
  import Corners from '$lib/components/Corners.svelte';
  import Rule from '$lib/components/Rule.svelte';
  import { services } from '$lib/data/services.js';
</script>

<svelte:head>
  <title>Services — High Rise Refurbishments Ltd</title>
  <meta
    name="description"
    content="Four integrated service arms: High End Refurbishment, BSR Application Specialist, Golden Thread Gatherers, and Health & Safety Consulting."
  />
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pb-10 pt-20 text-center md:pt-28">
  <p class="eyebrow">Our services</p>
  <h1 class="display mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
    Four disciplines. <em class="text-gold-light">One accountable partner.</em>
  </h1>
  <div class="mt-9"><Rule width="6rem" /></div>
  <p class="mx-auto mt-9 max-w-2xl leading-relaxed text-mist">
    Whether for refurbishment, regulatory approval, record-keeping or safety counsel, every
    engagement contributes to one outcome: the verified, long-term integrity of your building.
  </p>
</section>

<section class="mx-auto max-w-6xl px-6 pb-28 pt-12">
  <div class="grid gap-6 md:grid-cols-2">
    {#each services as s}
      <a
        href="/services/{s.slug}"
        class="group relative border border-gold/20 p-9 transition-colors duration-300 hover:border-gold/50 hover:bg-navy-900/70 sm:p-11"
      >
        <Corners size="1.1rem" inset="-1px" opacity="0.8" />
        <span class="font-serif text-3xl italic text-gold/50 transition-colors duration-300 group-hover:text-gold">
          {s.number}
        </span>
        <h2 class="display mt-5 text-2xl transition-colors duration-300 group-hover:text-gold-light sm:text-3xl">
          {s.name}
        </h2>
        <p class="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-gold/80">{s.strap}</p>
        <p class="mt-5 text-sm leading-relaxed text-mist">{s.summary}</p>
        <span class="mt-8 inline-block text-[0.7rem] font-semibold uppercase tracking-widest2 text-gold">
          Explore <span class="inline-block transition-transform duration-300 group-hover:translate-x-1.5">⟶</span>
        </span>
      </a>
    {/each}
  </div>
</section>
