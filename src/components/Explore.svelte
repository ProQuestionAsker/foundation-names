<script>
    import copy from "../data/copy.json";
    import SwatchHistogram from "./SwatchHistogram-old.svelte"
    import { group, ascending} from 'd3-array'
    import Gradient from "./Gradient.svelte"
    import Line from "./Line.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import Switch from "./Switch.svelte"
    import Radio from "./Radio.svelte"
    import Interactive from "./Interactive.svelte"
    import Checkbox from "./Checkbox.svelte"
    import SectionHed from "./SectionHed.svelte"
    import InteractiveWrapper from "./InteractiveWrapper.svelte"
    import extendedHeight from './../stores/stores.js';

    export let data;
    let options = ['histogram', 'gradient', 'majority', 'tooltip']
    let UIOptions = ['radio', 'dropdown']

    $: screenWidth = 350;

    let exHeight;
    $: containerHeight = screenWidth < 500 ? 150: 100;
    let heightMeasure = 'vh'

    $: console.log({screenWidth, containerHeight})

    $: cleanData = data.map(d => ({
        ...d,
        categories: d.categories.split(', ')
    }))

    $: extendedHeight.subscribe(val => exHeight = val)


    function determineHeight(exHeight, screenWidth){
        let newHeight = null
        if (exHeight['explore'].expanded === true) newHeight = `${(exHeight['explore'].height / 0.98)}px`
        else newHeight =  `${containerHeight}${heightMeasure}`
        return newHeight;
    }

    $: filterData = cleanData
    let newHeight = exHeight;

    $: {
        newHeight = determineHeight(exHeight, screenWidth)
    }
    //$: determineHeight(exHeight, screenWidth)
   
</script>

<section id='explore'>

<SectionHed text={'Explore'} />

{#each copy.explore as {type, value}}
    <p class='prose'>{@html value}</p>
{/each}

<div class='container' style="height:{newHeight}" bind:clientWidth={screenWidth}>
    <InteractiveWrapper title={`Explore all ${filterData.length} shades`} filteredData={filterData} 
    allData={cleanData} {options} {UIOptions} id={'explore'}/>
</div>

</section>




<style>

section {
        max-width: 75rem;
        margin: 0 auto;
    }
    .container{
        margin: 5rem auto 8rem;
        max-width: 75rem;
        padding: 1rem 1.5rem;
        border-width: 1px;
        border-style: solid;
        border-image: 
        linear-gradient(
        to bottom, 
        var(--gray-light), 
        rgba(0, 0, 0, 0)
        ) 1 100%;

    }

    @media screen and (max-width: 500px) {

    }

</style>