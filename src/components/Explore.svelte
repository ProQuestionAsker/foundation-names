<script>
    import data from "../data/shades_export.csv"
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

    let options = ['histogram', 'gradient', 'majority', 'tooltip']
    let UIOptions = ['radio', 'dropdown']

    let screenWidth = 0;

    let exHeight;
    $: containerHeight = screenWidth < 500 ? 150: 100;
    let heightMeasure = 'vh'

    $: console.log({screenWidth, containerHeight})

    $: cleanData = data.map(d => ({
        ...d,
        categories: d.categories.split(', ')
    }))

    $: extendedHeight.subscribe(val => exHeight = val)


    function determineHeight(exHeight){
        if (exHeight['explore'].expanded === true) return `${exHeight['explore'].height + containerHeight + 4}px`
        return `${containerHeight}${heightMeasure}`
    }

    $: filterData = cleanData
   
</script>

<section id='explore'>

<SectionHed text={'Explore'} />

{#each copy.explore as {type, value}}
    <p class='prose'>{@html value}</p>
{/each}

<div class='container' style="height:{determineHeight(exHeight)}" bind:clientWidth={screenWidth}>
    <InteractiveWrapper title={`Explore all ${filterData.length} shades`} filteredData={filterData} 
    allData={cleanData} {options} {UIOptions} id={'explore'}/>
</div>

</section>




<style>

    section {
        padding: 0 1rem;
    }
    .container{
        margin: 3rem auto;
        max-width: 1000px;
        border: 1px solid var(--gray);
        padding: 1rem 1.5rem;
        box-shadow: 12px -12px 0 -1px var(--white), 12px -12px 0 0 var(--gray);
        overflow-x: scroll;
    }

    @media screen and (max-width: 500px) {

    }

</style>