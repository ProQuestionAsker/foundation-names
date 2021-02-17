<script>
    import { onMount } from "svelte";
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

    let exHeight;
    let ogHeight = 0;

    $: if (ogHeight === 0 && containerHeight) ogHeight = containerHeight;



    let radioValue;
    $: if (radioValue){
        if (radioValue === 'swatches') options = ['histogram', 'gradient', 'majority', 'tooltip']
        if (radioValue === 'names') options = ['wordwall']
        if (radioValue === 'table') options = ['table']
    }

    let width;
    let mounted = false;

    extendedHeight.subscribe((value) => exHeight = value)

    // $: exHeight[id].button = exHeight[id].height > containerHeight * 0.7

    // $: console.log({exHeight})
    // $: if(exHeight[id]){
    //     exHeight[id].button = exHeight[id].height > containerHeight * 0.7

    //     extendedHeight.set(exHeight)
    // }

    function expandGraphic(){
        exHeight[id].expanded = !exHeight[id].expanded

        extendedHeight.set(exHeight)
    }

    function collapseGraphic(){
        exHeight[id].expanded = false

        extendedHeight.set(exHeight)
    }

    $: if (radioValue !== 'names') collapseGraphic()

    onMount(() => mounted = true)
</script>

<div class='container' bind:clientWidth={width} bind:clientHeight={containerHeight}>
    <p class='chart-title'>{title}</p>
    {#if UIOptions}
        <UI {UIOptions} {id} bind:radioValue/>
    {/if}
    {#if mounted}
        {#key containerHeight}
        <InteractiveParent {filteredData} data = {allData} {options} {width} {id}/>

        {#if exHeight[id] && exHeight[id].height > (ogHeight * 0.7) && radioValue === 'names'}
            <div class='more-container'>
                <button on:click = {() => expandGraphic()}>{exHeight[id].expanded ? 'Show Fewer' : 'Show All'}</button>
            </div>
        {/if}

        {/key}
    {/if}
</div>


<style>
    .chart-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }

    .container {
        margin-bottom: 4rem;
        height: 100%;
        pointer-events: none;
    }

    .more-container {
        pointer-events: all;
    }
</style>