<script>
  import Corners from '$lib/components/Corners.svelte';
  import Rule from '$lib/components/Rule.svelte';

  let { data } = $props();
  let service = $derived(data.service);
  let prev = $derived(data.prev);
  let next = $derived(data.next);
</script>

<svelte:head>
  <title>{service.name} — High Rise Refurbishments Ltd</title>
  <meta name="description" content={service.summary} />
</svelte:head>

<!-- hero -->
<section class="relative overflow-hidden border-b border-gold/15">
  <span
    aria-hidden="true"
    class="pointer-events-none absolute -top-16 right-0 select-none font-serif italic leading-none text-gold/[0.07]"
    style="font-size: clamp(14rem, 34vw, 26rem)"
  >
    {service.number}
  </span>
  <div class="relative mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
    <p class="eyebrow">Service {service.number}</p>
    <h1 class="display mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{service.name}</h1>
    <p class="mt-5 text-sm uppercase tracking-[0.2em] text-gold/80">{service.strap}</p>
  </div>
</section>

<!-- body -->
<section class="mx-auto max-w-6xl px-6 py-20 md:py-24">
  <div class="grid gap-16 md:grid-cols-[1.3fr_1fr] md:gap-20">
    <div>
      {#each service.intro as para}
        <p class="mb-6 leading-relaxed text-mist first:font-serif first:text-2xl first:leading-snug first:text-ivory">
          {para}
        </p>
      {/each}

      <blockquote class="relative mt-12 border border-gold/20 p-8 sm:p-10">
        <Corners size="1.1rem" inset="-1px" opacity="0.9" />
        <p class="font-serif text-xl italic leading-relaxed text-gold-light sm:text-2xl">
          “{service.quote}”
        </p>
      </blockquote>
    </div>

    <aside>
      <p class="eyebrow">Key capabilities</p>
      <ul class="mt-7 space-y-5 border-t border-gold/15 pt-7">
        {#each service.capabilities as cap}
          <li class="flex gap-4 text-sm leading-relaxed text-mist">
            <span class="mt-2 block h-px w-6 shrink-0 bg-gold/60" aria-hidden="true"></span>
            {cap}
          </li>
        {/each}
      </ul>
    </aside>
  </div>
</section>

<!-- who this serves -->
<section class="border-y border-gold/15 bg-navy-900">
  <div class="mx-auto max-w-6xl px-6 py-20">
    <div class="text-center">
      <p class="eyebrow">Who this serves</p>
      <div class="mt-6"><Rule width="4rem" /></div>
    </div>
    <div class="mt-12 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 md:grid-cols-3">
      {#each service.audience as a}
        <div class="bg-navy-900 p-8">
          <h3 class="font-serif text-xl font-medium text-gold-light">{a.who}</h3>
          <p class="mt-3 text-sm leading-relaxed text-mist">{a.detail}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA + prev/next -->
<section class="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
  <h2 class="display text-3xl md:text-4xl">Discuss this service with our specialists</h2>
  <a href="/contact" class="btn-gold mt-9">Arrange a consultation</a>

  <div class="mt-20 flex items-center justify-between border-t border-gold/15 pt-8 text-left">
    <a href="/services/{prev.slug}" class="link-quiet group text-sm">
      <span class="eyebrow block !text-mist/60">⟵ Previous</span>
      <span class="mt-1.5 block font-serif text-lg text-ivory transition-colors group-hover:text-gold-light">
        {prev.name}
      </span>
    </a>
    <a href="/services/{next.slug}" class="link-quiet group text-right text-sm">
      <span class="eyebrow block !text-mist/60">Next ⟶</span>
      <span class="mt-1.5 block font-serif text-lg text-ivory transition-colors group-hover:text-gold-light">
        {next.name}
      </span>
    </a>
  </div>
</section>
