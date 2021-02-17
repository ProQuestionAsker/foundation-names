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

    let radioValue;
    $: if (radioValue){
        if (radioValue === 'swatches') options = ['histogram', 'gradient', 'majority', 'tooltip']
        if (radioValue === 'names') options = ['wordwall']
        if (radioValue === 'table') options = ['table']
    }

    let width;
    let mounted = false;

    extendedHeight.subscribe((value) => exHeight = value)

    function expandGraphic(){
        exHeight[id].expanded = !exHeight[id].expanded

        extendedHeight.set(exHeight)
    }

    onMount(() => mounted = true)
</script>

<div class='container' bind:clientWidth={width} bind:clientHeight={containerHeight}>
    <p class='chart-title'>{title}</p>
    {#if UIOptions}
        <UI {UIOptions} {id} bind:radioValue/>
    {/if}
    {#if mounted}
        <InteractiveParent {filteredData} data = {allData} {options} {width} {id}/>

        {#if exHeight[id] && exHeight[id].height > (containerHeight * 0.7) && radioValue === 'names'}
            <div class='more-container'>
                <button on:click = {() => expandGraphic()}>Show All</button>
            </div>
        {/if}
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