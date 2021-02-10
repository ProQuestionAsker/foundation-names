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

    let blockWidth = 20;
    $: blockHeight = blockWidth / 2;

    $: filterValue = step === 'natural' ? 'natural' : 'nude'
    $: blockValue = step === 'all' || step === 'sort' ? 'off' : 'on'

    $: filteredData = data.filter(d => d.namingScheme === filterValue)

</script>

<div class='container'>
    <h4>Shades with "{filterValue}" in the name</h4>
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
        height: 400px;
    }

    h4 {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }


</style>