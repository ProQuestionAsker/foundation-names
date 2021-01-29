<script>
    import data from "../data/nude_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import { LayerCake, Canvas } from "layercake";

    export let step;
    

    $: filterValue = step === 'natural' ? 'natural' : 'nude'

</script>

<p>Currently on {step}</p>
<div class='container'>
    <div class='chart-container container-hist'>
        <LayerCake data={data}>
            <Canvas>
                <Gradient /> 
            </Canvas>
            <Canvas class="hist">
                <SwatchHistogram blockWidth={20} 
                    filterProp = "namingScheme" 
                    {filterValue} />
            </Canvas>
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