<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from 'svelte';
    import { range, bin, least, greatest, ascending, max } from 'd3-array'
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Line from "./Line.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import NameHistogram from "./NameHistogram.svelte"
    import Table from "./Table.svelte"
    import Annotations from "./Annotations.svelte"



    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height, xScale } = getContext('LayerCake');

    export let step;
    export let blockWidth = 20;
    export let blockHeight = blockWidth / 3;
    export let allData;
    export let radioValue;
    // export let canvasHeight = 800;

    // dimensions
    let blockPadding = 2;

    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }

    $: graphWidth = $width - margins.left - margins.right;
    $: colNum = Math.round( graphWidth / ((blockPadding * 2) + blockWidth))
    $: blockValue = step === 'all' || step === 'sort' ? 'off' : 'on'

    let wordWidth = 100;
    let wordHeight = 12;
    $: wordColNum = Math.round(graphWidth / ((blockPadding * 2) + wordWidth))

    // binning data
    $: lightBin = bin()
        .thresholds(($data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
        .domain([0.15, 0.99])
        .value(d => d.lightness)

    $: binnedFiltered = lightBin($data)
    $: binnedAll = lightBin(allData)

    $: console.log({bf: binnedFiltered.length})

    // $: tallestBin = max(binnedFiltered.map(d => d.length))
    // $: console.log({$height})

    // $: if (tallestBin * ((blockWidth / 2) + blockPadding) > $height){
    //     blockHeight = Math.floor(Math.max(2, $height / tallestBin - blockPadding ))
    // } else blockHeight = Math.floor(blockWidth / 2)

    // $: console.log({blockHeight, $height, tallestBin})

    let comboData;
    $: leastMissing = least(comboData, (a, b) => ascending(a.difference, b.difference) )
    $: greatestMissing = greatest(comboData, (a, b) => ascending(a.difference, b.difference) )

    $: {
        const filterLimited = binnedFiltered.map(d => ({
            ...d,
            x0: d.x0,
            count: d.length,
            percent: d.length / $data.length
        }))

        const allLimited = binnedAll.map(d => ({
            x0: d.x0,
            count: d.length,
            percent: d.length / allData.length
        }))

        comboData = filterLimited.map((d, i) => ({
            ...d, 
            allCount: Math.round(allLimited[i].percent * ($data.length)),
            difference: Math.round(allLimited[i].percent * ($data.length)) - d.count
        }))
    }




    function roundNumber(num){
        return Math.round(num * 100)/100
    }

    // binning for words
    $: wordBin = bin()
        .thresholds(($data, min, max) => range(wordColNum).map(t => min + (t / wordColNum) * (max - min)))
        .domain([0.15, 0.99])
        .value(d => d.lightness)
    
    $: filteredWordBin = wordBin($data)

    $: tableData = $data.map(d => ([d.brand, d.product, d.name, d.hex, roundNumber(d.lightness)]))

    let tableHeaders = ['brand', 'product', 'name', 'hex', 'lightness']

    $: annotations = [{
        text: 'When the <span style="color:var(--gray); font-weight:700">all shades</span> line appears above the <span style="color:var(--accent-color); font-weight:700">"nude" shades</span> line, there are fewer shades named “nude” than we’d expect in this color range',
        x: $xScale(greatestMissing.x0),
        y: 150
    }, {
        text: 'When the <span style="color:var(--accent-color); font-weight:700">"nude" shades</span> line is higher than the <span style="color:var(--gray); font-weight:700">all shades</span> line there are more shades named "nude" in this color range than we would expect',
        x: $xScale(leastMissing.x0),
        y: 0
    }]

</script>

{#if step}
    <Canvas id='test'>
        <Gradient {step}/> 
    </Canvas>
    <Canvas class="hist">     
        <SwatchHistogram blockWidth={blockWidth} {blockHeight} {step} {blockPadding} {colNum} binnedData = {binnedFiltered} />
    </Canvas>
    <Svg zIndex={3}>
        {#if (step !== 'all' && step !== 'sort') }
            <GradientAnnotation block={blockValue} />
        {/if}       
        {#if (step === 'distribution' || step === 'compare')}        
            <Line filteredData = {comboData} {blockWidth} {blockHeight} {step}/>
        {/if}
    </Svg>  
    {#if step === 'compare'}
        <Html >
            <Annotations {annotations} />
        </Html>
    {/if}
{:else}
    {#if radioValue === 'swatches'}
        <Canvas id='test'>
            <Gradient /> 
        </Canvas>
    {/if}
    {#if radioValue === 'swatches' || radioValue === 'names'}
        <Canvas class="hist">     
            {#if radioValue === 'swatches' }
                <SwatchHistogram blockWidth={blockWidth} {blockHeight} {blockPadding} {colNum} binnedData = {binnedFiltered} {radioValue} />
            {:else if radioValue === 'names'}
                <NameHistogram {wordWidth} {wordHeight} {wordColNum} binnedData = {filteredWordBin} blockPadding = {8} />
            {/if}
        </Canvas>

    {/if}
    {#if radioValue === 'swatches'}
        <Svg zIndex={3}>
            <GradientAnnotation block={blockValue} />    
            {#if radioValue === 'histogram'}     
                <Line filteredData = {comboData} {blockWidth} {blockHeight} step = {'compare'}/>
            {/if}
        </Svg>  
    {/if}
    {#if radioValue === 'table'}
        <Html zIndex={4}>
            <Table headers = {tableHeaders} rows = {tableData} perPage = {20} />
        </Html>        
    {/if}
{/if}

<style>
    /* .canvas-container {
        overflow: auto;
        position: relative;
        height: 3000px;
    } */
</style>