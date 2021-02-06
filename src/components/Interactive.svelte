<script>
    import { Canvas, Svg } from "layercake";
    import { getContext } from 'svelte';
    import { range, bin } from 'd3-array'
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Line from "./Line.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"


    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width } = getContext('LayerCake');

    export let step = 'all'
    export let blockWidth = 20;
    export let blockHeight = blockWidth / 2;
    export let allData;

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

    // binning data
    $: lightBin = bin()
        .thresholds(($data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
        .domain([0.15, 0.99])
        .value(d => d.lightness)

    $: binnedFiltered = lightBin($data)
    $: binnedAll = lightBin(allData)

</script>

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

<style>

</style>