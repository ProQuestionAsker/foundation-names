<script>
    import { getContext } from 'svelte';
    import { extent, range, bin, shuffle, ascending, max } from 'd3-array'
    import { format } from 'd3-format';
    import { scaleLinear } from 'd3-scale';
    import { line, curveStepBefore } from 'd3-shape';
    import { fade } from 'svelte/transition'


    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, width, height, xScale } = getContext('LayerCake');


    const formatNumber = format('.1f')

    // data as prop, not from layercake!
    // export let allData;
    export let lineData = [];
    export let blockDimensions;
    export let options;
    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    $: console.log({lineData})
 

    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 0
    }

    $: lineGenerator = line()
        .x(d => $xScale(d.x1))
        .y(d => $height - margins.bottom - (+d.count * (blockHeight + blockPadding)))
        .curve(curveStepBefore)

    $: allLineGenerator = line()
        .x(d => $xScale(d.x1))
        .y(d => $height - margins.bottom - (+d.allCount * (blockHeight + blockPadding)))
        .curve(curveStepBefore)

    $: lineData.push({count: 0, x1: 1, allCount: 0})
    $: lineData.unshift({count: 0, x1: 0.15, allCount: 0})

    $: linePath = allLineGenerator(lineData)
    $: filteredLine = lineGenerator(lineData)
  
   


    
</script>

{#if lineData.length > 0}        
    <path class='path-line filtered' transition:fade d={filteredLine}></path>
    {#if options.includes('allLine')}
        <path class='path-line full' transition:fade d={linePath}></path>
    {/if}
{/if}

<style>
    .path-line {
        fill: none;
        stroke-width: 3px;
        stroke: #ccc;
        fill-opacity: 0.25;
    }

    .full {
        fill: #999;
        stroke: #999;
        stroke-dasharray: 5px;
    }
    .filtered {
        fill: #574CFA;
        stroke: #574CFA;

    }
</style>