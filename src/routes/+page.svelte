<script>
  import Corners from '$lib/components/Corners.svelte';
  import Rule from '$lib/components/Rule.svelte';
  import Skyline3D from '$lib/components/Skyline3D.svelte';
  import { services } from '$lib/data/services.js';

  const stats = [
    { value: '60+', label: 'Years of trusted service' },
    { value: '4', label: 'Integrated service arms' },
    { value: '50%', label: 'Of BSR applications rejected industry-wide' },
    { value: '1st', label: 'Time right — our standard, not our ambition' }
  ];

  const audiences = [
    {
      title: 'Architects',
      copy: 'A builder fluent in design intent. We deliver to drawing, protect the detail, and carry your vision through the BSR gateway process without dilution.'
    },
    {
      title: 'Direct Clients',
      copy: 'Residential owners and developers receive one accountable partner — from feasibility and valuation-led refurbishment through to a stress-free, certified completion.'
    },
    {
      title: 'Managing Agents',
      copy: 'Across residential and commercial portfolios, we gather and maintain the Golden Thread of information — turning statutory burden into demonstrable stewardship.'
    }
  ];
</script>

<svelte:head>
  <title>High Rise Refurbishments Ltd — Securing Your Architectural Legacy</title>
  <meta
    name="description"
    content="High-end refurbishment, BSR building control applications, Golden Thread gathering and health & safety consulting for high-rise buildings. Trusted since 1965."
  />
</svelte:head>

<!-- ============ HERO ============ -->
<section class="relative overflow-hidden">
  <!-- faint radial gold glow -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[64rem] -translate-x-1/2 opacity-[0.07]"
    style="background: radial-gradient(closest-side, #c9a44c, transparent 70%)"
  ></div>

  <div class="relative mx-auto max-w-6xl px-6">
    <div class="relative px-2 pb-0 pt-20 text-center sm:px-10 md:pt-28">
      <Corners size="2.25rem" inset="0.5rem" opacity="0.5" />

      <p class="eyebrow">Est. 1965 &nbsp;·&nbsp; London &amp; the South East</p>

      <h1 class="display mx-auto mt-8 max-w-4xl text-5xl sm:text-6xl md:text-7xl">
        Securing your <em class="text-gold-light">architectural legacy</em>
      </h1>

      <div class="mt-9">
        <Rule width="7rem" />
      </div>

      <p class="mx-auto mt-9 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
        High-end refurbishment and Building Safety Regulator counsel for high-rise buildings.
        We recognise that refurbishment embodies more than structural updates — it is the
        foresight to build, protect and shape the optimal future of your asset.
      </p>

      <div class="mt-12 flex flex-wrap items-center justify-center gap-4 pb-4">
        <a href="/services" class="btn-gold">Explore our services</a>
        <a href="/contact" class="btn-ghost">Arrange a consultation</a>
      </div>
    </div>
  </div>

  <!-- interactive 3D London skyline — full-bleed, drawn in brand-gold linework -->
  <Skyline3D class="relative mt-4 h-72 w-full sm:h-80 md:h-[26rem]" />
</section>

<!-- ============ STATS ============ -->
<section class="border-y border-gold/15 bg-navy-900">
  <div class="mx-auto grid max-w-6xl grid-cols-2 divide-gold/10 px-6 md:grid-cols-4 md:divide-x">
    {#each stats as stat}
      <div class="px-4 py-12 text-center md:px-8">
        <p class="font-serif text-5xl font-medium text-gold-light">{stat.value}</p>
        <p class="mx-auto mt-3 max-w-[11rem] text-[0.7rem] uppercase leading-relaxed tracking-[0.18em] text-mist">
          {stat.label}
        </p>
      </div>
    {/each}
  </div>
</section>

<!-- ============ SERVICES ============ -->
<section class="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
  <div class="md:flex md:items-end md:justify-between">
    <div>
      <p class="eyebrow">What we do</p>
      <h2 class="display mt-5 text-4xl md:text-5xl">One partnership.<br />Four disciplines.</h2>
    </div>
    <p class="mt-6 max-w-sm text-sm leading-relaxed text-mist md:mt-0">
      End-to-end support for owners, developers and Accountable Persons of high-rise
      buildings — delivered by one team, recorded in one thread.
    </p>
  </div>

  <div class="mt-16 border-t border-gold/15">
    {#each services as s}
      <a
        href="/services/{s.slug}"
        class="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-b border-gold/15 py-9 transition-colors duration-300 hover:bg-navy-900/60 sm:grid-cols-[5rem_1fr_auto] sm:gap-8 md:px-6"
      >
        <span class="font-serif text-2xl italic text-gold/60 transition-colors duration-300 group-hover:text-gold sm:text-3xl">
          {s.number}
        </span>
        <span>
          <span class="display block text-2xl transition-colors duration-300 group-hover:text-gold-light sm:text-3xl">
            {s.name}
          </span>
          <span class="mt-2 block max-w-xl text-sm leading-relaxed text-mist">{s.summary}</span>
        </span>
        <span
          class="hidden text-gold/50 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-gold sm:block"
          aria-hidden="true"
        >
          ⟶
        </span>
      </a>
    {/each}
  </div>
</section>

<!-- ============ GOLDEN THREAD BAND ============ -->
<section class="relative overflow-hidden border-y border-gold/15 bg-navy-900">
  <div class="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[auto_1fr] md:gap-16 md:py-24">
    <div class="hidden md:block thread-v"></div>
    <div class="max-w-3xl">
      <p class="eyebrow">The digital keystone</p>
      <h2 class="display mt-5 text-3xl md:text-4xl">
        The Golden Thread is not paperwork.
        <em class="text-gold-light">It is the building’s memory.</em>
      </h2>
      <p class="mt-6 leading-relaxed text-mist">
        The BSR demands a single source of truth — a secure, accurate and accessible digital
        record of safety-critical information that persists across decades. Every survey we
        conduct, every application we secure and every intervention we deliver is captured,
        documented and tagged for seamless integration into your Principal Accountable
        Person’s record. One team, one thread, absolute certainty.
      </p>
      <a href="/services/golden-thread" class="btn-ghost mt-9">Meet the Golden Thread Gatherers</a>
    </div>
  </div>
</section>

<!-- ============ BSR IMPERATIVE ============ -->
<section class="mx-auto max-w-6xl px-6 py-24 md:py-32">
  <div class="grid gap-14 md:grid-cols-2 md:gap-20">
    <div>
      <p class="eyebrow">The imperative of certainty</p>
      <h2 class="display mt-5 text-3xl md:text-4xl">
        The Building Safety Act reshaped ownership. We reshape the burden.
      </h2>
      <p class="mt-6 text-sm leading-relaxed text-mist">
        For Accountable Persons of higher-risk buildings, compliance is a moral and legal
        imperative demanding precision, verified documentation and unwavering technical
        expertise. Around half of all BSR building control applications are rejected at first
        submission. Ours are built to pass — first time.
      </p>
      <a href="/services/bsr-applications" class="btn-gold mt-9">Your specialist BSR contractor</a>
    </div>

    <div class="relative border border-gold/20 p-8 sm:p-10">
      <Corners size="1.25rem" inset="-1px" opacity="0.9" />
      <ul class="space-y-7">
        {#each [
          ['Verification of asset integrity', 'Rigorous surveys establishing single-source-of-truth data on structure, compartmentation and services.'],
          ['Certified work delivery', 'Demonstrably competent persons, compliant methods, and a complete technical dossier on completion.'],
          ['Digitisation for the Golden Thread', 'Every intervention captured and structured for your PAP’s electronic management system.'],
          ['Proactive regulatory liaison', 'Expert counsel on Mandatory Occurrence Reporting and Accountable Person duties.']
        ] as [title, copy], i}
          <li class="flex gap-5">
            <span class="font-serif text-xl italic leading-none text-gold/70">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span class="block font-medium text-ivory">{title}</span>
              <span class="mt-1.5 block text-sm leading-relaxed text-mist">{copy}</span>
            </span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<!-- ============ WHO WE SERVE ============ -->
<section class="border-t border-gold/15 bg-navy-900">
  <div class="mx-auto max-w-6xl px-6 py-24 md:py-28">
    <div class="text-center">
      <p class="eyebrow">Who we serve</p>
      <h2 class="display mt-5 text-3xl md:text-4xl">In service of those who shape skylines</h2>
      <div class="mt-8"><Rule width="5rem" /></div>
    </div>

    <div class="mt-16 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 md:grid-cols-3">
      {#each audiences as a}
        <div class="bg-navy-900 p-9 md:p-10">
          <h3 class="font-serif text-2xl font-medium text-gold-light">{a.title}</h3>
          <p class="mt-4 text-sm leading-relaxed text-mist">{a.copy}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ============ CLOSING CTA ============ -->
<section class="relative overflow-hidden">
  <div
    aria-hidden="true"
    class="pointer-events-none absolute left-1/2 bottom-0 h-[30rem] w-[60rem] -translate-x-1/2 opacity-[0.06]"
    style="background: radial-gradient(closest-side, #c9a44c, transparent 70%)"
  ></div>
  <div class="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
    <img src="/mark.png" alt="" class="mx-auto h-14 w-auto opacity-90" />
    <h2 class="display mt-10 text-4xl md:text-5xl">
      From complex regulations<br />
      <em class="text-gold-light">to rewarding completion.</em>
    </h2>
    <p class="mx-auto mt-7 max-w-xl text-mist">
      Contact us to schedule a consultation on your building’s holistic asset
      integrity strategy — and let certainty replace ambiguity.
    </p>
    <a href="/contact" class="btn-gold mt-11">Begin the conversation</a>
  </div>
</section>
