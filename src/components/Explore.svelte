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

    // let categorySel = 'all'
    // let brandSel = 'All'
    // let radioValue = 'swatches'

    // const sections = ['drink', 'food']

    // let filteredLength = 6000

    // $: blockWidth = filteredLength > 1000 ? 5 : 10 
    // $: blockHeight = filteredLength > 1000 ? 2 : blockWidth / 2

    // let allBrands = Array.from(group(data, d => d.brand).keys()).sort((a, b) => ascending(a.toLowerCase(), b.toLowerCase()))
    // allBrands.unshift('All')

    // let allCategories = [];

    // let filteredData;

    // function filterData(){
    //     let filtered;
    //     if (categorySel === 'all' && brandSel === 'All') filtered = data;
    //     else if (categorySel === 'all' && brandSel !== 'All') filtered = data.filter(d => d.brand === brandSel);
    //     else if (categorySel !== 'all' && brandSel === 'All') filtered = data.filter(d => d.category === categorySel);
    //     else filtered = data.filter(d => d.category === categorySel && d.brand === brandSel)

    //     filteredLength = filtered.length
        
    //     filteredData = filtered

    //     // finding all categories for selected brand

    //     if (brandSel === 'All'){
    //         allCategories = Array.from(group(data, d => d.category).keys()).sort((a, b) => ascending(a, b)).filter(d => d !== 'NA')
    //         allCategories.unshift('all')
    //     } 
    //     else {
    //         const selBrand = data.filter(d => d.brand === brandSel)
    //         allCategories = Array.from(group(selBrand, d => d.category).keys()).sort((a, b) => ascending(a, b)).filter(d => d !== 'NA')
    //         allCategories.unshift('all')
    //     }

    // }

    // $: categorySel, brandSel, filterData()
    // $: filteredData, blockWidth, blockHeight

    let options = ['histogram', 'gradient', 'majority', 'tooltip']
    let UIOptions = ['radio', 'dropdown']

    let exHeight;
    let containerHeight = 800;
    let heightMeasure = 'vh'



    $: extendedHeight.subscribe(val => exHeight = val)


    function determineHeight(exHeight){
        if (exHeight['explore'].expanded === true) return `${exHeight['explore'].height + containerHeight + 4}px`
        return `${containerHeight}px`
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
        margin-bottom: 4rem;
    }

</style>