<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from 'svelte';
    import { range, bin } from 'd3-array'
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Line from "./Line.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import NameHistogram from "./NameHistogram.svelte"
    import Table from "./Table.svelte"


    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width } = getContext('LayerCake');

    export let step;
    export let blockWidth = 20;
    export let blockHeight = blockWidth / 2;
    export let allData;
    export let radioValue;


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
            <Line allData = {binnedAll} filteredData = {binnedFiltered} {blockWidth} {blockHeight} {step}/>
        {/if}
    </Svg>  
{:else}
    {#if radioValue !== 'table'}
        <Canvas id='test'>
            <Gradient /> 
        </Canvas>
    {/if}
    {#if radioValue === 'swatches' || radioValue === 'names'}
        <Canvas class="hist">     
            {#if radioValue === 'swatches' }
                <SwatchHistogram blockWidth={blockWidth} {blockHeight} {blockPadding} {colNum} binnedData = {binnedFiltered} {radioValue} />
            {:else if radioValue === 'names'}
                <NameHistogram {wordWidth} {wordHeight} {wordColNum} {blockPadding} binnedData = {filteredWordBin}  />
            {/if}
        </Canvas>
    {/if}
    {#if radioValue !== 'table'}
        <Svg zIndex={3}>
            <GradientAnnotation block={blockValue} />    
            {#if radioValue === 'histogram'}     
                <Line allData = {binnedAll} filteredData = {binnedFiltered} {blockWidth} {blockHeight} step = {'compare'}/>
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

</style>