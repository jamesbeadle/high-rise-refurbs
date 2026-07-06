<script>
  /** Gold rule with central diamond — echoes the "REFURBISHMENTS LTD" band in the logo. */
  let { width = '10rem', center = true } = $props();
</script>

<div class="flex items-center gap-3 {center ? 'justify-center' : ''}" style="max-width:100%">
  <span class="h-px bg-gold/50" style="width:{width}"></span>
  <span class="block h-1.5 w-1.5 rotate-45 border border-gold/70"></span>
  <span class="h-px bg-gold/50" style="width:{width}"></span>
</div>
