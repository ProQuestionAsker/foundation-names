<script>
    import { getContext, onMount } from 'svelte';
  
    import { swoopyArrow, getElPosition, parseCssValue } from '../utils/arrowUtils.js';
  
    export let annotations = [];
    export let blockDimensions;

    let mounted = false;
  
  
    const { width, height } = getContext('LayerCake');

    /* --------------------------------------------
     * Some lookups to convert between x, y / width, height terminology
     * and CSS names
     */
    const lookups = [
      { dimension: 'width', css: 'left', position: 'x' },
      { dimension: 'height', css: 'top', position: 'y' }
    ];
  
    let d = () => '';
    let annotationEls;

    $: if (mounted)  annotationEls = getContext('annotation-els');
  
    onMount(() => {
      mounted = true;
    });

  
    function setPath (anno, arrow) {
    //   return (anno, i, arrow) => {
        console.log('set path running')
        //const arrowSource = getElPosition(el);
        const dx = anno.dx ? anno.dx : 0
        const sourceCoords =  [anno.coordinates[0].x - 4 + dx, anno.coordinates[0].y - (anno.dy - anno.arrowOffset)]
  
        /* --------------------------------------------
         * Default to clockwise
         */
        const clockwise = arrow[0].clockwise
  
        /* --------------------------------------------
         * Parse where we're drawing to
         */
        const targetCoords = [anno.coordinates[0].x + (blockDimensions.blockWidth  - blockDimensions.blockPadding) + dx, anno.coordinates[0].y + (blockDimensions.blockHeight / 2)]
        

        console.log({sourceCoords, targetCoords, clockwise, arrow, anno, dx})
  
        /* --------------------------------------------
         * Create arrow path
         */
        return swoopyArrow()
          .angle(Math.PI / 2)
          .clockwise(clockwise)
          .x(q => q[0])
          .y(q => q[1])([sourceCoords, targetCoords]);
    //   };
    }
  
    // $: setPath($width, $height)
  </script>
  
  <defs>
    <marker id="arrowhead" viewBox="-10 -10 20 20" markerWidth="17" markerHeight="17" orient="auto">
      <path d="M-6,-6 L 0,0 L -6,6" fill="black"/>
    </marker>
  </defs>
  
  {#if annotations.length}
    <g class="swoops">
      {#each annotations as anno, i}
            <path
              marker-end='url(#arrowhead)'
              d={setPath(anno, anno.arrow)}></path>
      {/each}
    </g>
  {/if}
  
  <style>
    .swoops {
      position: absolute;
      max-width: 200px;
      line-height: 14px;
    }
    .swoops path {
      fill: none;
      stroke: #000;
      stroke-width: 1;
    }
  </style>