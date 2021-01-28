<script>
    import data from "../data/nude_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import { LayerCake, Canvas } from "layercake";

    export let step;

    $: filterValue = step === 'natural' ? 'natural' : 'nude'

</script>

<p>Currently on {step}</p>
<div class='chart-container container-grad'>
    <LayerCake data={data}>
        <Canvas>
            <SwatchHistogram blockWidth={20} 
            filterProp = "namingScheme" 
            {filterValue} />
        </Canvas>
    </LayerCake>
</div>

<style>
    .container-grad {
        height: 300px;
    }
</style>