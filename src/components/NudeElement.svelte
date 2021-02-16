<script>
    import data from "../data/nude_export.csv"
    import allData from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram-old.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import { fade } from 'svelte/transition';
    import { extent, range, bin, shuffle, ascending } from 'd3-array'
    import Interactive from "./Interactive.svelte"
    import InteractiveParent from "./InteractiveParent.svelte"

    export let step;

    let blockWidth = 20;
    //$: blockHeight = blockWidth / 2;

    $: filterValue = step === 'natural' ? 'natural' : 'nude'
    $: filteredData = data.filter(d => d.namingScheme === filterValue)

    let options;

    $: {
        if (step === 'all') options = ['shuffled'];
        if (step === 'sort') options = ['histogram', 'gradient']
        if (step === 'majority') options = ['histogram', 'gradient', 'majority']
        if (step === 'distribution') options = ['gradient', 'majority', 'line']
        if (step === 'compare') options = ['gradient', 'majority', 'line', 'allLine']
        if (step === 'nudestix') options = ['histogram', 'gradient', 'majority', 'nudestix']
        if (step === 'highlight') options = ['histogram', 'gradient', 'majority', 'highlight']  
        if (step === 'natural') options = ['histogram', 'gradient', 'majority', 'natural']
    }



    $: console.log({step, options})

    // if (step === 'nudestix') options = ['histogram', 'gradient', 'majority', 'nudestix']
    // if (step === 'highlight') options = ['histogram', 'gradient', 'majority', 'highlight']  


</script>

<div class='container'>
    <p class='chart-title'>Shades with "{filterValue}" in the name</p>

    <InteractiveParent {filteredData} data = {allData} {options}/>

    <!-- <div class='chart-container container-hist'>
        <LayerCake data={filteredData} x = {d => d.lightness}
            padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
            xDomain = {[0.15, 0.99]}>
                    
            <Interactive {step} {allData} {blockWidth} />
        </LayerCake> 
    </div> -->
</div>


<style>

    .chart-container{
        position: relative;
    }

    .container-hist {
        height: 400px;
    }

    .chart-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }


</style>