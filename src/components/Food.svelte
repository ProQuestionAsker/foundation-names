<script>
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


    export let data;
    const xKey = 'lightness'
    const blockWidth = 20;
    $: blockHeight = blockWidth / 4;

    $: cleanedData = data.map(d => ({
        ...d,
        categories: d.categories.split(', ')
    }))


    //$: filteredData = data.filter(d => d.category === 'food').filter(d => switchValue === 'varied' ? d.namingScheme === 'variety' : d.namingScheme === 'NA' )

    let exHeight;
    let containerHeight = 650;
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
        if (exHeight[sectionLabel].expanded === true) return `${exHeight[sectionLabel].height / 0.98 }px`
        return `${containerHeight}px`
    }

</script>

<section id='food'>
<SectionHed text={'Food & Drink'} />

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
    section {
        max-width: 75rem;
        margin: 0 auto;
    }
    .container{
    /* height: 90vh; */
    max-width: 75rem;
    margin: 5rem auto 8rem;

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

    .chart-container.drink{
        height: 400px;
    }

    .chart-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }
</style>