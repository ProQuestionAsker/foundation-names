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
    export let allData;
    export let filteredData;
    export let blockWidth = 10;
    export let blockHeight = blockWidth / 2;
    export let step;
    const blockPadding = 2;

    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }

    $: maxScale = max(scaledDistribution.map(d => d.count))

    $: lineGenerator = line()
        .x(d => $xScale(d.x1))
        .y(d => $height - margins.bottom - (+d.count * (blockHeight + blockPadding)))
        .curve(curveStepBefore)

    // get bins for all of the data
    $: binnedData = allData.map(d => ({
        x0: d.x0,
        x1: d.x1,
        count: d.length
    }))

    // get bins for this filtered section of data
    $: binnedFiltered = filteredData.map(d => ({
        x0: d.x0,
        x1: d.x1,
        count: d.length, 
        center: ((d.x1 - d.x0) / 2) + d.x0
    }))


    $: distributionScale = scaleLinear()
        .range([0, max(binnedFiltered.map(d => d.count))])
        .domain([0, max(binnedData.map(d => d.count))])


    $: scaledDistribution = binnedData.map(d => ({
        ...d,
        count: formatNumber(distributionScale(d.count)),
        center: (d.x1 - d.x0) + d.x0
    }))
    
    $: scaledDistribution.push({count: 0, x1: 1})
    $: scaledDistribution.unshift({count: 0, x1: 0.15})
    $: binnedFiltered.push({count: 0, x1: 1})
    $: binnedFiltered.unshift({count: 0, x1: 0.15})


    $: linePath = lineGenerator(scaledDistribution)
    $: filteredLine = lineGenerator(binnedFiltered)
    
</script>

{#if linePath}        
    <path class='path-line filtered' transition:fade d={filteredLine}></path>

    {#if step === 'compare'}
        <path class='path-line full' transition:fade d={linePath}></path>

        <g class='annotation__low'>
            <text>
                <tspan>When the all shades</tspan>
                <tspan>line appears above the </tspan>
                <tspan>"nude" shades line, there</tspan>
                <tspan>are fewer shades named "nude"</tspan>
                <tspan>than we'd expect in this color range</tspan>
            </text>

        </g>
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