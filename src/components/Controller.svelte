<script>
    import TooltipDisplay from "./TooltipDisplay.svelte"
    import { getContext, onMount } from 'svelte';
import Explore from "./Explore.svelte";


    export let blockDimensions;
    export let options;
    export let currentGroup;
    export let groupedData;
    export let controllerContainer;

    let groupSelOutline;
    let currentIndex;
    let mount = false
    let found;
    let exploreSwatches = false;
    let ind = 0

    // onMount(() => {
    //     console.log({groupSelOutline})
    //     controllerContainer.blur();
    //     groupSelOutline.focus();
    // })

    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake')
    
    //$: groupedData = groups($data, d => d.binStart)

    function moveFocusGroup(currentGroup){
        if (groupSelOutline) {
            groupSelOutline.focus();
            console.log({groupSelOutline})
        }
    }

    $: moveFocusGroup(currentGroup)

    function handleKeyPress(event){
        const key = event.key
        console.log({key})
        if (key === 'Shift' && key === 'Tab' || key === 'Escape') {
            exploreSwatches = false;
            controllerContainer.focus();
        }
        if (key === 'ArrowUp' || key === 'ArrowDown'){
            exploreSwatches = true;
            const swatches = groupedData[currentGroup][1]
            const total = swatches.length - 1
            ind = ind > total ? total : ind
            console.log({swatches, total})
            if (key === 'ArrowUp'){
                const newIndex = ind === total ? 0 : ind + 1
                ind = newIndex 
                console.log({ind, newIndex})
                found = swatches[newIndex]
            } else {
                const newIndex = ind === 0 ? total : ind - 1
                ind = newIndex
                console.log({ind, newIndex})
                found = swatches[newIndex]
            }
        }
        else exploreSwatches = false
    }


</script>

{#if options.includes('histogram')}
    <div bind:this={groupSelOutline}
        on:keydown|preventDefault={handleKeyPress}
        tabindex=-1
        class='group-select'    
        style="width:{blockWidth + (blockPadding * 2)}px; height:{groupedData[currentGroup][1].length * (blockHeight + blockPadding) + blockPadding}px; left:{$xScale(groupedData[currentGroup][0])}px"
    ></div>
    {#if exploreSwatches === true}
        <TooltipDisplay selected={found} width={$width} {blockDimensions} height={$height} xScale={$xScale} />
    {/if}
{/if}


<style>
    .group-select{
        bottom: 0;
        position: absolute;
    }
    .group-select:focus{
        outline: 3px solid var(--accent-color);
        position: absolute;
        box-shadow: 0 0px 8px var(--accent-color);
    }
</style>

