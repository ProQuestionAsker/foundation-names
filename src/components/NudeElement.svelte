<script>
    import data from "../data/nude_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";

    export let step;
    

    $: filterValue = step === 'natural' ? 'natural' : 'nude'
    $: blockValue = step === 'all' || step === 'sort' ? 'off' : 'on'
    $: console.log({blockValue})

</script>

<p>Currently on {step}</p>
<div class='container'>
    <h3>Shades with "{filterValue}" in the name</h3>
    <div class='chart-container container-hist'>
        <LayerCake data={data}>
            <Canvas>
                <Gradient block={blockValue} filterProp = "namingScheme" 
                {filterValue}/> 
            </Canvas>
            <Canvas class="hist">
                <SwatchHistogram blockWidth={20} 
                    filterProp = "namingScheme" 
                    {filterValue} 
                    {step} />
            </Canvas>
            <Svg zIndex={3}></Svg>
        </LayerCake>
    </div>

</div>


<style>
    .chart-container{
        position: relative;
    }

    .container-hist {
        height: 300px;
    }

</style>