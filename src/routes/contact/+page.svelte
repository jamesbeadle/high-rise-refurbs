<script>
  import Corners from '$lib/components/Corners.svelte';
  import Rule from '$lib/components/Rule.svelte';

  let name = $state('');
  let email = $state('');
  let building = $state('');
  let message = $state('');

  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Consultation enquiry — ${building || 'High-Rise Building'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBuilding / portfolio: ${building}\n\n${message}`
    );
    window.location.href = `mailto:enquiries@hrrltd.co.uk?subject=${subject}&body=${body}`;
  }

  const inputClass =
    'w-full border border-gold/25 bg-navy-900 px-4 py-3.5 text-sm text-ivory placeholder:text-mist/50 focus:border-gold focus:outline-none transition-colors';
</script>

<svelte:head>
  <title>Contact — High Rise Refurbishments Ltd</title>
  <meta
    name="description"
    content="Arrange a consultation on your high-rise building's holistic asset integrity strategy."
  />
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-20 text-center md:pt-28">
  <p class="eyebrow">Contact</p>
  <h1 class="display mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
    Let certainty <em class="text-gold-light">replace ambiguity</em>
  </h1>
  <div class="mt-9"><Rule width="6rem" /></div>
  <p class="mx-auto mt-9 max-w-xl leading-relaxed text-mist">
    Schedule a consultation on your building’s holistic asset integrity strategy. Discretion
    assured, as it has been for six decades.
  </p>
</section>

<section class="mx-auto max-w-6xl px-6 py-20 md:py-24">
  <div class="grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-20">
    <!-- details -->
    <div>
      <p class="eyebrow">Enquiries</p>
      <a
        href="mailto:enquiries@hrrltd.co.uk"
        class="link-quiet mt-4 block font-serif text-xl text-ivory"
      >
        enquiries@hrrltd.co.uk
      </a>

      <p class="eyebrow mt-12">Telephone</p>
      <p class="mt-4 font-serif text-xl text-ivory">+44 (0)20 0000 0000</p>
      <p class="mt-1 text-xs text-mist/60">(Draft — number to be confirmed)</p>

      <p class="eyebrow mt-12">Registered office</p>
      <p class="mt-4 text-sm leading-relaxed text-mist">
        High Rise Refurbishments Ltd<br />
        London &amp; the South East<br />
        A Jewel Group company
      </p>

      <div class="mt-12 border-t border-gold/15 pt-8">
        <p class="text-sm leading-relaxed text-mist">
          For Accountable Persons with urgent BSR determination deadlines, please mark your
          enquiry <span class="text-gold">“Gateway — time critical”</span> and we will
          respond as a priority.
        </p>
      </div>
    </div>

    <!-- form -->
    <form onsubmit={submit} class="relative border border-gold/20 p-8 sm:p-12">
      <Corners size="1.25rem" inset="-1px" opacity="0.9" />
      <div class="grid gap-6 sm:grid-cols-2">
        <label class="block">
          <span class="eyebrow !text-[0.62rem]">Name</span>
          <input class="{inputClass} mt-3" type="text" bind:value={name} required placeholder="Your name" />
        </label>
        <label class="block">
          <span class="eyebrow !text-[0.62rem]">Email</span>
          <input class="{inputClass} mt-3" type="email" bind:value={email} required placeholder="you@example.co.uk" />
        </label>
      </div>
      <label class="mt-6 block">
        <span class="eyebrow !text-[0.62rem]">Building or portfolio</span>
        <input class="{inputClass} mt-3" type="text" bind:value={building} placeholder="e.g. residential HRB, W1" />
      </label>
      <label class="mt-6 block">
        <span class="eyebrow !text-[0.62rem]">How can we help?</span>
        <textarea class="{inputClass} mt-3" rows="6" bind:value={message} required placeholder="Refurbishment, BSR application, Golden Thread, health & safety…"></textarea>
      </label>
      <button type="submit" class="btn-gold mt-9 w-full sm:w-auto">Send enquiry</button>
      <p class="mt-5 text-xs text-mist/60">
        This draft form opens your email client — it will be wired to a backend before launch.
      </p>
    </form>
  </div>
</section>
