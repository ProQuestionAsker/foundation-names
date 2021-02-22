<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import { groups } from 'd3-array';
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import Tooltip from "./Tooltip.svelte"
    import Table from "./Table.svelte"
    import Wordwall from "./WordWall.svelte"
    import Controller from "./Controller.svelte"

    const { data, width, height, xScale } = getContext('LayerCake')
    export let options = [];
    export let blockDimensions;
    export let lineData;
    export let id;

    let key;
    let keyCode;
    let controllerContainer;
    let exploreSwatches = false;
    let found;

    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    let tableData;
    let tableHeaders = ['brand', 'product', 'name', 'hex', 'lightness']
    $: if (options.includes('table')){
        tableData = $data.map(d => ([d.brand, d.product, d.name, d.hex, roundNumber(d.lightness)]))
    }

    // for keyboard/sr controller 
    $: groupedData = groups($data, d => d.binStart)
    $: totalGroups = groupedData.length
    let currentGroup = 0
    let ind = 0

    function handleKeyDown(event){
        const key = event.key;
        const keyCode = event.keyCode
        const arrows = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']

        // if (arrows.includes(key)) controllerContainer.blur();
        if (key === 'Escape' || key === 'Tab') controllerContainer.focus();

        if (key === 'ArrowRight') {
            let newGroup = currentGroup < totalGroups - 1 ? currentGroup + 1 :  0;
            currentGroup = newGroup
        }
        if (key === 'ArrowLeft') {
            let newGroup = currentGroup === 0 ? totalGroups - 1 : currentGroup - 1 
            currentGroup = newGroup
        }
        if (key === 'Shift' && key === 'Tab' || key === 'Escape') {
            exploreSwatches = false;
            controllerContainer.focus();
        }
        if (key === 'ArrowUp' || key === 'ArrowDown'){
            exploreSwatches = true;
            const swatches = groupedData[currentGroup][1]
            const total = swatches.length - 1
            if (key === 'ArrowUp'){
                // if index is greater than total, start at the total
                // if the index is equal to the total, go back to 0 otherwise, add one
                // otherwise, add one
                let newIndex;
                if (ind > total) newIndex = total;
                else if (ind === total) newIndex = 0;
                else newIndex = ind + 1
                ind = newIndex 
                found = swatches[newIndex]
            } else {
                // if index is greater than total, start at the total
                // if it's equal to 0, go to the total
                // otherwise, subtract one
                let newIndex;
                if (ind > total || ind === 0) newIndex = total
                else newIndex = ind - 1
                ind = newIndex
                found = swatches[newIndex]
            }
        }
        else exploreSwatches = false
    }

</script>

<!-- aria hidden because custom aria controller will be introduced -->
<div aria-hidden="true">
    {#if (options.includes('shuffled') || options.includes('histogram') || options.includes('natural'))}
        {#key $data.length} 
            <Canvas>
                <SwatchHistogram {blockDimensions} {options}/>
            </Canvas> 
        {/key}
    {/if}
    {#if (options.includes('wordwall'))}
        <Canvas>
            <Wordwall {blockDimensions} {id}/>
        </Canvas>
    {/if}


    {#if options.includes('gradient')}
        <Canvas>
            <Gradient /> 
        </Canvas>
    {/if}

    <Svg zIndex={3}>
        {#if options.includes('majority')}
            <GradientAnnotation  />    
        {/if}

        {#if lineData.length > 0}
            <Line {options} {lineData} {blockDimensions} />
        {/if}
    </Svg>  
</div>



<Html zIndex={5}>
    <!-- add to tab order in page order -->
    <div class='controller' tabindex=0 on:keydown|preventDefault={handleKeyDown} bind:this={controllerContainer}>
        {#if controllerContainer}
            <Controller {blockDimensions} {options} {currentGroup} {groupedData} {controllerContainer} {found} {exploreSwatches}/>
        {/if}
    </div>

    {#if options.includes('tooltip')}
        <Tooltip {blockDimensions}/>
    {/if}

    {#if options.includes('table')}
        <Table headers={tableHeaders} rows={tableData} perPage={10} />
    {/if}
</Html>


<style>
    .controller{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;

    }
    .controller:focus{
        outline: 4px solid var(--accent-color)
    }
</style>
