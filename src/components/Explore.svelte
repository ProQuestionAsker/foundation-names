<script>
    import data from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import { group, ascending} from 'd3-array'
    import Gradient from "./Gradient.svelte"
    import Line from "./Line.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import Switch from "./Switch.svelte"
    import Radio from "./Radio.svelte"
    import Interactive from "./Interactive.svelte"
    import Checkbox from "./Checkbox.svelte"

    let categorySel = 'all'
    let brandSel = 'All'
    let radioValue = 'swatches'

    $: console.log({radioValue})

    const sections = ['drink', 'food']

    let filteredLength = 6000

    $: blockWidth = filteredLength > 1000 ? 5 : 10 
    $: blockHeight = filteredLength > 1000 ? 2 : blockWidth / 2

    let allBrands = Array.from(group(data, d => d.brand).keys()).sort((a, b) => ascending(a.toLowerCase(), b.toLowerCase()))
    allBrands.unshift('All')

    let allCategories = [];

    let filteredData;

    function filterData(){
        let filtered;
        if (categorySel === 'all' && brandSel === 'All') filtered = data;
        else if (categorySel === 'all' && brandSel !== 'All') filtered = data.filter(d => d.brand === brandSel);
        else if (categorySel !== 'all' && brandSel === 'All') filtered = data.filter(d => d.category === categorySel);
        else filtered = data.filter(d => d.category === categorySel && d.brand === brandSel)

        filteredLength = filtered.length
        
        filteredData = filtered

        // finding all categories for selected brand

        if (brandSel === 'All'){
            allCategories = Array.from(group(data, d => d.category).keys()).sort((a, b) => ascending(a, b)).filter(d => d !== 'NA')
            allCategories.unshift('all')
        } 
        else {
            const selBrand = data.filter(d => d.brand === brandSel)
            allCategories = Array.from(group(selBrand, d => d.category).keys()).sort((a, b) => ascending(a, b)).filter(d => d !== 'NA')
            allCategories.unshift('all')
        }

    }

    $: categorySel, brandSel, filterData()
    $: filteredData, blockWidth, blockHeight
    $: console.log({filteredLength, blockWidth, blockHeight})


   
</script>

<section>

<div class='divider-text'>
    <h3 class='section-hed'>Explore</h3>
</div>

    <div class='container'>
        <h3>Explore the shades</h3>
        <div class='ui-elements'>
            <div class='select-group'>
                <div>
                    <label for="brandSelect">Filter data by brand</label>
                    <select id="brandSelect" 
                        bind:value={brandSel} on:blur="{() => filterData()}">
                        {#each allBrands as brand}
                            <option>{brand}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <label for="categorySelect">Filter by name category</label>
                    <select id="categorySelect" bind:value={categorySel} on:blur="{() => filterData()}">
                        {#each allCategories as category}
                            <option>{category}</option>
                        {/each}
                    </select>
                </div>

                {#if radioValue === 'swatches'}
                    <Checkbox checks = {[{name: 'all', label: 'Compare to all shades', selected: 'false'}]} />
                {/if}
             </div>
            

            <Radio bind:value={radioValue}
            options={[
              {name: 'swatches', label: 'swatches'},
              {name: 'names', label: 'names'},
              {name: 'table', label: 'table'}
            ]}
            legend="Show Me" />
        </div>

        <div class='container'>
            <figure class='chart-container container-hist' >
                <LayerCake data={filteredData} x = {d => d.lightness}
                    padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
                    xDomain = {[0.15, 0.99]}>
                            
                    <Interactive allData = {data} {blockWidth} {blockHeight} {radioValue}  />
                </LayerCake>
            </figure>
        </div>

    </div>


</section>




<style>

    section {
        padding: 0 1rem;
    }
    .chart-container{
        height: 600px;
    }

    label {
        color: var(--gray)
    }

    .select-group {
        display: flex;
    }

    .select-group div:first-of-type{
        margin-right: 1rem;
    }

    .select-group label {
        font-size: 0.9em;
        /* font-weight: 600; */
        color: var(--gray);
        text-transform: uppercase;
    }
</style>