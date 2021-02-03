<script>
    import data from "../data/nude_export.csv"
    import allData from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import { fade } from 'svelte/transition';

    export let step;

    let filteredBins;

    const xKey = 'lightness'
    

    $: filterValue = step === 'natural' ? 'natural' : 'nude'
    $: blockValue = step === 'all' || step === 'sort' ? 'off' : 'on'
    const blockWidth = 20

    $: filteredData = data.filter(d => d.namingScheme === filterValue)

</script>

<p>Currently on {step}</p>
<div class='container'>
    <h3>Shades with "{filterValue}" in the name</h3>
    <div class='chart-container container-hist'>
        <LayerCake data={filteredData} x = {d => d.lightness}
            padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
            xDomain = {[0.15, 0.99]}>
            <Canvas id='test'>
                <Gradient {step}/> 
            </Canvas>
            <Canvas class="hist">     
              
                    <SwatchHistogram bind:binnedData = {filteredBins} blockWidth={blockWidth} {step} />
        
            </Canvas>
            <Svg zIndex={3}>
                {#if (step !== 'all' && step !== 'sort') }
                    <GradientAnnotation block={blockValue} />
                {/if}       
                {#if (step === 'distribution' || step === 'compare')}        
                    <Line {allData} {filteredBins} {blockWidth} {step}/>
                {/if}
            </Svg>            
 
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