<script>
    import { onMount } from "svelte";
    import {group, ascending} from 'd3-array';
    import { flatten } from 'layercake'
    import InteractiveParent from "./InteractiveParent.svelte"
    import UI from "./UI.svelte"
    import extendedHeight from './../stores/stores.js';

    export let title;
    export let filteredData;
    export let allData;
    export let options;
    export let UIOptions;
    export let id;
    export let containerHeight;
    let bottomHeight;

    let exHeight;
    let ogHeight = 0;


    $: if (ogHeight === 0 && containerHeight) ogHeight = containerHeight;


    // setting up dropdown menu data
    let allBrands = Array.from(group(allData, d => d.brand)
        .keys())
        .sort((a, b) => ascending(a.toLowerCase(), b.toLowerCase()))
    allBrands.unshift('All')

    let allCategories = [...new Set(flatten(allData.map(d => d.categories)))]
        .sort((a, b) => ascending(a.toLowerCase(), b.toLowerCase()))
    allCategories.unshift('all')


    let radioValue;
    let checkValue;
    let brandSel;
    let categorySel;
    $: if (radioValue){
        if (radioValue === 'swatches') options = ['histogram', 'gradient', 'majority', 'tooltip']
        if (radioValue === 'names') options = ['wordwall']
        if (radioValue === 'table') options = ['table']
    }

    $: if (checkValue === true) {
        options = ['gradient', 'majority', 'line', 'allLine', 'annotations', 'explore']
    } else if (checkValue == false) { options = ['histogram', 'gradient', 'majority', 'tooltip']}

    function filterData(categorySel, brandSel){

        let filtered;
        if (categorySel === 'all' && brandSel === 'All') filtered = allData;
        else if (categorySel === 'all' && brandSel !== 'All') filtered = allData.filter(d => d.brand === brandSel);
        else if (categorySel !== 'all' && brandSel === 'All') filtered = allData.filter(d => d.categories.includes(categorySel));
        else filtered = allData.filter(d => d.categories.includes(categorySel) && d.brand === brandSel)

        // filteredLength = filtered.length

        // finding all categories for selected brand

        if (brandSel === 'All'){
            allCategories = [...new Set(flatten(allData.map(d => d.categories)))].sort((a, b) => ascending(a, b)).filter(d => d !== 'NA')
            allCategories.unshift('all')
        } 
        else {
            const selBrand = allData.filter(d => d.brand === brandSel)
            allCategories = [...new Set(flatten(selBrand.map(d => d.categories)))].sort((a, b) => ascending(a, b)).filter(d => d !== 'NA')
            allCategories.unshift('all')
        }

        filteredData = filtered
    }

    let width;
    let mounted = false;

    $: if (brandSel || categorySel) filterData(categorySel, brandSel)


    function expandGraphic(){
        exHeight[id].expanded = !exHeight[id].expanded

        extendedHeight.set(exHeight)
    }

    function collapseGraphic(){
        exHeight[id].expanded = false

        extendedHeight.set(exHeight)
    }

    // $: if (radioValue !== 'names' && exHeight && exHeight[id]) collapseGraphic()

    onMount(() => {
        mounted = true    
        extendedHeight.subscribe((value) => exHeight = value)
    })
</script>

<div class='container' bind:clientWidth={width} bind:clientHeight={containerHeight}>

    <div class='container--top'>
        <p class='chart-title'>{title}</p>

        {#if UIOptions}
            <UI {UIOptions} {id} bind:radioValue bind:checkValue bind:brandSel bind:categorySel {allBrands} {allCategories}/>
        {/if}
    </div>

    <div class='container--bottom' bind:clientHeight={bottomHeight}>
        {#if mounted}
            {#key containerHeight}
            <InteractiveParent {filteredData} data = {allData} {options} {width} {id} {title}/>
            {#if exHeight[id] && exHeight[id].height > (ogHeight * 0.7) && radioValue === 'names'}              
            {#if exHeight[id].expanded === false}
                    <div class='gradient'></div>
                {/if}
                <div class='more-container'>
                    <button on:click = {() => expandGraphic()}>{exHeight[id].expanded ? 'Show Fewer' : 'Show All'}</button>
                </div>
            {/if}

            {/key}
        {/if}
    </div>

</div>


<style>
    .chart-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin: 0 auto;
    }

    .container {
        height: 100%;
        pointer-events: none;
        display: flex;
        flex-direction: column;
    }

    .container--top {
        max-height: 30%;
    }

    .container--bottom {
        min-height: 70%;
        height: 80%;
        position: relative;
    }

    .more-container {
        pointer-events: all;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        z-index: 10;
        background-color: var(--bg);
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    .gradient {
        pointer-events: none;
        height: 50px;
        width: 100%;
        position: absolute;
        bottom: 4rem;
        left: 0;
        background: linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    }
</style>