<script>
    import data from "../data/shades_export.csv"
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

    let exHeight;
    let containerHeight = 100;
    let heightMeasure = 'vh'



    $: extendedHeight.subscribe(val => exHeight = val)


    function determineHeight(exHeight){
        if (exHeight['explore'].expanded === true) return `${exHeight['explore'].height + containerHeight + 4}px`
        return `${containerHeight}${heightMeasure}`
    }

    let filterData = data
   
</script>

<section>

<SectionHed text={'Explore'} />


<div class='container' style="height:{determineHeight(exHeight)}">
    <InteractiveWrapper title={`Explore all ${filterData.length} shades`} filteredData={filterData} 
    allData={data} {options} {UIOptions} id={'explore'}/>
</div>

</section>




<style>

    section {
        padding: 0 1rem;
    }
    .container{
        margin: 0 auto 4rem;
        max-width: 1000px;
    }

</style>