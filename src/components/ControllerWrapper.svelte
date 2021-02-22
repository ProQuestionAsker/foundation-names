<script>
    import { getContext } from 'svelte';
    import { groups } from 'd3-array';
    import Controller from './Controller.svelte'
import Explore from './Explore.svelte';
    
    const { data, width, height, xScale } = getContext('LayerCake')
    export let blockDimensions;
    export let options;

    let controllerContainer;
    let exploreSwatches = false;
    let found = ''
    let groupActive = false;
    let takeoverKeys = true;
    $: groupedData = groups($data, d => d.binStart)
    $: totalGroups = groupedData.length
    let currentGroup = 0
    let ind = 0
    let wordIndex = 0;

    function handleKeyDown(event){
        const key = event.key;

        // key bindings for histograms
        if (options.includes('histogram') || options.includes('natural')){
            if (key === 'ArrowRight') {
                let newGroup = currentGroup < totalGroups - 1 ? currentGroup + 1 :  0;
                currentGroup = newGroup
                found = ''
                groupActive = true;
                takeoverKeys = true;
            }
            if (key === 'ArrowLeft') {
                let newGroup = currentGroup === 0 ? totalGroups - 1 : currentGroup - 1 
                currentGroup = newGroup
                found = ''
                groupActive = true;
                takeoverKeys = true;
            }
            if (key === 'Shift' && key === 'Tab' || key === 'Escape' || key === 'Tab') {
                exploreSwatches = false;
                controllerContainer.focus();
                groupActive = false;
                takeoverKeys = false;
            }
            if (key === 'ArrowUp' || key === 'ArrowDown'){
                exploreSwatches = true;
                const swatches = groupedData[currentGroup][1]
                const total = swatches.length - 1
                groupActive = false;
                takeoverKeys = true;
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
            else {
                exploreSwatches = false
                takeoverKeys = false
            }       
        }

        // key bindings for word wall
        else if (options.includes('wordwall')){
            const totalWords = $data.length - 1
            // right and down arrows
            if (key === 'ArrowRight' || key === 'ArrowDown'){
                const newWordIndex = wordIndex === totalWords ? 0 : wordIndex + 1
                wordIndex = newWordIndex
            }
            // left and up arrows
            if (key === 'ArrowLeft' || key === 'ArrowUp'){
                const newWordIndex = wordIndex === 0 ? totalWords : wordIndex - 1
                wordIndex = newWordIndex
            }
        }
        if (takeoverKeys === true) event.preventDefault();
    }

    function clearKeyboard(){
        takeoverKeys = false;
        groupActive = false;
        exploreSwatches = false;
    }

</script>

<svelte:window on:mousemove={clearKeyboard} on:click={clearKeyboard} />

<div class='controller' tabindex=0 on:keydown={handleKeyDown} bind:this={controllerContainer}>
    {#if controllerContainer}
        <Controller {blockDimensions} {options} {currentGroup} {groupedData} {controllerContainer} {found} {exploreSwatches} {groupActive} flatData={$data} {wordIndex}/>
    {/if}
</div>

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