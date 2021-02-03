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
    export let blockWidth = 10;
    export let step;

    // binned data from swatch histograms component
    export let filteredBins;

    $:  blockHeight = blockWidth / 2
    const blockPadding = 2;

    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }

    $: graphWidth = $width - margins.left - margins.right;
    $: colNum = Math.round( graphWidth / ((blockPadding * 2) + blockWidth))

    $: maxScale = max(scaledDistribution.map(d => d.count))

    $: yScale = scaleLinear()
        .range([0, +maxScale])
        .domain([height, +maxScale * (blockHeight + blockPadding)])

        $: console.log({test: yScale(5), maxScale})

    $: lineGenerator = line()
        .x(d => $xScale(d.x1))
        //.y(d => yScale(d.count))
        .y(d => $height - margins.bottom - (+d.count * (blockHeight + blockPadding)))
        .curve(curveStepBefore)


    $: lightBin = bin()
            .thresholds(($data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
            .domain([0.15, 0.99])
            .value(d => d.lightness)

    // get bins for all of the data
    $: binnedData = lightBin(allData).map(d => ({
        x0: d.x0,
        x1: d.x1,
        count: d.length
    }))

    // get bins for this filtered section of data
    $: binnedFiltered = lightBin($data).map(d => ({
        x0: d.x0,
        x1: d.x1,
        count: d.length, 
        center: ((d.x1 - d.x0) / 2) + d.x0
    }))
    // let distributionScale;
    // let scaledDistribution;
    // let linePath;


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
        $: binnedFiltered.unshift({count: 0, x1: 0.15})//.sort((a, b) => ascending(a.x1, b.x1))


        $: linePath = lineGenerator(scaledDistribution)
        $: filteredLine = lineGenerator(binnedFiltered)

        $: console.log({filteredLine, binnedFiltered, scaledDistribution})


    
</script>

{#if linePath}        
    <path class='path-line filtered' transition:fade d={filteredLine}></path>

    {#if step === 'compare'}
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