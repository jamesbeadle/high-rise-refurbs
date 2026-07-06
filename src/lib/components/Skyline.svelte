<script>
  /** Fine-line London high-rise skyline, drawn to match the linework of the shield mark. */
  let { class: klass = '' } = $props();
</script>

<svg
  viewBox="0 0 1440 220"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="xMidYMax meet"
  class={klass}
  aria-hidden="true"
>
  <!-- baseline -->
  <line x1="0" y1="219" x2="1440" y2="219" stroke="#c9a44c" stroke-opacity="0.35" />
  <g stroke="#c9a44c" stroke-opacity="0.28" stroke-width="1">
    <!-- left cluster -->
    <path d="M40 219V150h50v69" />
    <path d="M55 150v-22h20v22" />
    <path d="M120 219V120h34v99M137 120v-18" />
    <path d="M180 219V165h60v54M195 165v-20h30v20" />
    <!-- mid-left towers -->
    <path d="M290 219V95h44v124M300 95V78h24v17" />
    <path d="M360 219V140h36v79" />
    <path d="M420 219V60h56v159M434 60V38h28v22M448 38V22" />
    <!-- shard-like spire -->
    <path d="M560 219L600 30l40 189" />
    <path d="M580 145h40M572 180h56" />
    <!-- centre cluster -->
    <path d="M680 219V110h48v109M692 110V88h24v22" />
    <path d="M760 219V70h40v149M770 70V52" />
    <path d="M830 219V130h52v89" />
    <!-- gherkin-ish curve -->
    <path d="M930 219c-6-70 10-130 34-150 24 20 40 80 34 150" />
    <path d="M938 160h52M934 190h60" />
    <!-- right cluster -->
    <path d="M1050 219V100h44v119M1062 100V80h20v20" />
    <path d="M1120 219V145h38v74" />
    <path d="M1190 219V55h50v164M1202 55V35h26v20" />
    <path d="M1270 219V125h40v94" />
    <path d="M1340 219V160h48v59M1352 160v-18h24v18" />
  </g>
  <!-- window hints -->
  <g stroke="#c9a44c" stroke-opacity="0.14" stroke-width="1">
    <path d="M430 90h36M430 120h36M430 150h36M430 180h36" />
    <path d="M296 130h32M296 160h32M296 190h32" />
    <path d="M766 100h28M766 130h28M766 160h28M766 190h28" />
    <path d="M1196 90h38M1196 125h38M1196 160h38M1196 195h38" />
  </g>
</svg>
