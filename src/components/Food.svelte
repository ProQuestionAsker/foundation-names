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

    const xKey = 'lightness'
    const blockWidth = 20;
    $: blockHeight = blockWidth / 4;

    //$: filteredData = data.filter(d => d.category === 'food').filter(d => switchValue === 'varied' ? d.namingScheme === 'variety' : d.namingScheme === 'NA' )

    const sections = ['drink', 'food']

    function filterData(sectionName){
        const cat = data.filter(d => d.category === sectionName)

        return cat
    }

    let options = ['histogram', 'gradient', 'majority', 'tooltip']
    let UIOptions = ['radio']

    


   
</script>

<section>
<SectionHed text={'Food and Drinks'} />

{#each copy.foodIntro as {type, value}}
    <p class='prose'>{value}</p>
{/each}

{#each sections as sectionLabel (sectionLabel)}
    <InteractiveWrapper title={`${filterData(sectionLabel).length} shades with ${sectionLabel} items in the name`} filteredData={filterData(sectionLabel)} 
    allData={data} {options} {UIOptions} id={sectionLabel}/>
    {#each copy[sectionLabel] as {type, value}}
    <p class='prose'>{value}</p>
    {/each}
{/each}
</section>




<style>
    .chart-container{
        height: 600px;
        max-width: 50rem;
        margin: 0 auto 5rem auto;
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