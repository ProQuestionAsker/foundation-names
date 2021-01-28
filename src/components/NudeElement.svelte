<script>
    import data from "../data/nude_export.csv"
    import GradientHistogram from "./GradientHistogram.svelte"
    import { LayerCake, Canvas } from "layercake";

    export let step;

</script>

<p>Currently on {step}</p>
<div class='chart-container container-grad'>
    <LayerCake data={data}>
        <Canvas>
            <GradientHistogram />
        </Canvas>
    </LayerCake>
</div>

<style>
    .container-grad {
        height: 300px;
    }
</style>