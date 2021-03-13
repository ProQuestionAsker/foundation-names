<script>
    import { getContext, onMount } from 'svelte';
    import { extent, range, bin, shuffle, ascending, max } from 'd3-array'
    import { format } from 'd3-format';
    import { scaleLinear } from 'd3-scale';
    import { line, curveStepBefore } from 'd3-shape';
    import { fade } from 'svelte/transition'


    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, width, height, xScale } = getContext('LayerCake');


    const formatNumber = format('.1f')
    let mounted = false;

    onMount(() => {
        mounted = true    
    })

    // data as prop, not from layercake!
    // export let allData;
    export let lineData = [];
    export let blockDimensions;
    export let options;
    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);
 
    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 0
    }


    $: lineData.push({count: 0, x0: 0.99, x1: 1, allCount: 0})
    $: lineData.unshift({count: 0, x0: 0, x1: 0.15, allCount: 0})

    let linePath;
    let filteredLine = '';

    $: if (blockHeight && mounted) {
        let lineGenerator = line()
            .x(d => $xScale(d.x1))
            .y(d => $height - margins.bottom - (+d.count * (blockHeight + blockPadding)))
            .curve(curveStepBefore)

        let allLineGenerator = line()
            .x(d => $xScale(d.x1))
            .y(d => $height - margins.bottom - (+d.allCount * (blockHeight + blockPadding)))
            .curve(curveStepBefore)

        linePath = allLineGenerator(lineData)
        filteredLine = lineGenerator(lineData)
    }
  


    
</script>

{#if filteredLine !== '' && blockHeight}     
    {#if options.includes('allLine')}
        <path class='path-line full' transition:fade d={linePath}></path>
    {/if}
    <path class='path-line filtered' transition:fade d={filteredLine}></path>
{/if}

<style>
    .path-line {
        fill: none;
        stroke-width: 3px;
        stroke: #ccc;
    }

    .path-line.full {
        fill:var(--gray);
        stroke: var(--gray);
        fill-opacity: 0.2;
        stroke-dasharray: 5px;
    }
    .path-line.filtered {
        fill: var(--muted-accent);
        stroke: var(--accent-color);

    }
</style>