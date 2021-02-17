<script>
    import { onMount } from "svelte";
    import InteractiveParent from "./InteractiveParent.svelte"
    import UI from "./UI.svelte"

    export let title;
    export let filteredData;
    export let allData;
    export let options;
    export let UIOptions;
    export let id;

    let radioValue;
    $: if (radioValue){
        if (radioValue === 'swatches') options = ['histogram', 'gradient', 'majority', 'tooltip']
        if (radioValue === 'names') options = ['wordwall']
        if (radioValue === 'table') options = ['table']
    }

    let width;
    let mounted = false;

    onMount(() => mounted = true)
</script>

<div class='container' bind:clientWidth={width}>
    <p class='chart-title'>{title}</p>
    <UI {UIOptions} {id} bind:radioValue/>
    {#if mounted}
        <InteractiveParent {filteredData} data = {allData} {options} {width}/>
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
        height: 40vh;
        pointer-events: none;
    }
</style>