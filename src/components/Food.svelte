<script>
    import data from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram-old.svelte"
    import Gradient from "./Gradient.svelte"
    import Line from "./Line.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import Switch from "./Switch.svelte"
    import Interactive from "./Interactive.svelte"
    import copy from "../data/copy.json";
    import SectionHed from "./SectionHed.svelte"
    import InteractiveWrapper from "./InteractiveWrapper.svelte"
    import UI from "./UI.svelte"
    import extendedHeight from './../stores/stores.js';


    const xKey = 'lightness'
    const blockWidth = 20;
    $: blockHeight = blockWidth / 4;

    $: cleanedData = data.map(d => ({
        ...d,
        categories: d.categories.split(', ')
    }))


    //$: filteredData = data.filter(d => d.category === 'food').filter(d => switchValue === 'varied' ? d.namingScheme === 'variety' : d.namingScheme === 'NA' )

    let exHeight;
    let containerHeight = 600;
    let heightMeasure = 'vh'

    $: extendedHeight.subscribe(val => exHeight = val)


    const sections = ['drink', 'food']

    function filterData(sectionName){
        const cat = data.filter(d => d.categories.includes(sectionName))

        return cat
    }

    let options = ['histogram', 'gradient', 'majority', 'tooltip']
    let UIOptions = ['radio']

    function determineHeight(sectionLabel, exHeight){
        if (exHeight[sectionLabel].expanded === true) return `${exHeight[sectionLabel].height + containerHeight + 4}px`
        return `${containerHeight}px`
    }

</script>

<section id='food'>
<SectionHed text={'Food and Drinks'} />

{#each copy.foodIntro as {type, value}}
    <p class='prose'>{@html value}</p>
{/each}

{#each sections as sectionLabel (sectionLabel)}
    <div class='container' style="height:{determineHeight(sectionLabel, exHeight)}">
        <InteractiveWrapper title={`${filterData(sectionLabel).length} shades with ${sectionLabel} items in the name`} filteredData={filterData(sectionLabel)} 
        allData={data} {options} {UIOptions} id={sectionLabel}/>
    </div>

    {#each copy[sectionLabel] as {type, value}}
    <p class='prose'>{@html value}</p>
    {/each}
{/each}
</section>




<style>
    .container{
        /* height: 90vh; */
        max-width: 50rem;
        margin: 3rem auto;
        border: 1px solid var(--gray);
        padding: 1rem 1.5rem;
        box-shadow: 12px -12px 0 -1px var(--white), 12px -12px 0 0 var(--gray);
    }

    .chart-container.drink{
        height: 400px;
    }

    .chart-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }
</style>