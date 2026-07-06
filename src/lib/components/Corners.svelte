<script>
  /** Draws the four gold corner brackets used on the proposal cover.
   *  Parent element must be `relative`. */
  let { size = '1.75rem', inset = '0px', opacity = 0.6 } = $props();
</script>

<span
  aria-hidden="true"
  class="pointer-events-none absolute border-gold border-t border-l"
  style="width:{size};height:{size};top:{inset};left:{inset};opacity:{opacity}"
></span>
<span
  aria-hidden="true"
  class="pointer-events-none absolute border-gold border-t border-r"
  style="width:{size};height:{size};top:{inset};right:{inset};opacity:{opacity}"
></span>
<span
  aria-hidden="true"
  class="pointer-events-none absolute border-gold border-b border-l"
  style="width:{size};height:{size};bottom:{inset};left:{inset};opacity:{opacity}"
></span>
<span
  aria-hidden="true"
  class="pointer-events-none absolute border-gold border-b border-r"
  style="width:{size};height:{size};bottom:{inset};right:{inset};opacity:{opacity}"
></span>
