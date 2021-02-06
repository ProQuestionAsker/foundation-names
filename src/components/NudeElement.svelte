<script>
    import data from "../data/nude_export.csv"
    import allData from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import { fade } from 'svelte/transition';
    import { extent, range, bin, shuffle, ascending } from 'd3-array'
    import Interactive from "./Interactive.svelte"

    export let step;

    // // dimensions
    // let width;
    // let blockPadding = 2;
    let blockWidth = 20;
    $: blockHeight = blockWidth / 2;
    // const margins = {
    //     top: 50,
    //     left: 20,
    //     right: 20, 
    //     bottom: 10
    // }


    // // data    
    // let filteredBins;
    // let binnedData;

    $: filterValue = step === 'natural' ? 'natural' : 'nude'
    $: blockValue = step === 'all' || step === 'sort' ? 'off' : 'on'

    $: filteredData = data.filter(d => d.namingScheme === filterValue)

    // $: graphWidth = width - margins.left - margins.right;
    // $: colNum = Math.round( graphWidth / ((blockPadding * 2) + blockWidth))

    // // binning data
    // $: lightBin = bin()
    //     .thresholds((data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
    //     .domain([0.15, 0.99])
    //     .value(d => d.lightness)

    // $: binnedFiltered = lightBin(data)
    // $: binnedAll = lightBin(allData)
    // $: console.log({width, colNum, graphWidth})





</script>

<p>Currently on {step}</p>
<div class='container'>
    <h3>Shades with "{filterValue}" in the name</h3>
    <div class='chart-container container-hist'>
        <LayerCake data={filteredData} x = {d => d.lightness}
            padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
            xDomain = {[0.15, 0.99]}>
                    
            <Interactive {step} {allData} {blockWidth} {blockHeight}/>
        </LayerCake>
    </div>

</div>


<style>
    .chart-container{
        position: relative;
    }

    .container-hist {
        height: 500px;
    }


</style>