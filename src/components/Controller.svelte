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
    export let found;
    export let exploreSwatches = false;
    let ind = 0
    let groupCount = groupedData.length
    let groupLabel = 'Group of swatches'
    let srValue;


    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake')

    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    function moveFocus(el){
        el.focus();
    }
    
    //$: groupedData = groups($data, d => d.binStart)
    function writeLabel(groupData){

    }

    function moveFocusGroup(currentGroup, found){
        if (groupSelOutline) {
            groupSelOutline.focus();
            ind = 0;
            if (found !== '') groupLabel = `Name: ${found.name}. Brand: ${found.brand}. Product: ${found.product}.`
            else if (currentGroup === 0) groupLabel = `Darkest shades. Group 1 of ${groupCount}. ${groupedData[currentGroup][1].length} Swatches. Lightness ${roundNumber(groupedData[0][0])} - ${roundNumber(groupedData[1][0])}`
            else if (currentGroup === groupCount - 1)  groupLabel = `Lightest shades. Group ${groupCount} of ${groupCount}. ${groupedData[currentGroup][1].length} Swatches. Lightness ${roundNumber(groupedData[currentGroup][0])} - 0.99`
            else groupLabel = `Group ${currentGroup + 1} of ${groupCount}. ${groupedData[currentGroup][1].length} Swatches. Lightness ${roundNumber(groupedData[currentGroup][0])} - ${roundNumber(groupedData[currentGroup + 1][0])}`
            console.log({groupLabel})
        }
    }

    $: moveFocusGroup(currentGroup, found)

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
            console.log({swatches, total})
            if (key === 'ArrowUp'){
                const newIndex = ind === total ? 0 : ind + 1
                ind = newIndex 
                found = swatches[newIndex]
            } else {
                const newIndex = ind === 0 ? total : ind - 1
                ind = newIndex

                found = swatches[newIndex]
            }
        }
        else exploreSwatches = false
    }


</script>

{#if options.includes('histogram')}
        <div aria-hidden=true bind:this={groupSelOutline}
            class='group-select'    
            style="width:{blockWidth + (blockPadding * 2)}px; height:{groupedData[currentGroup][1].length * (blockHeight + blockPadding) + blockPadding}px; left:{$xScale(groupedData[currentGroup][0])}px"
        >
    </div>
    {#key groupLabel}
    <figure>
        <div class='sr-only' role='img' tabindex="-1"  bind:this={srValue} use:moveFocus aria-label={groupLabel}>
            {groupLabel}
        </div>
    </figure>
    {/key}
    {#if exploreSwatches === true}
        <TooltipDisplay selected={found} width={$width} {blockDimensions} height={$height} xScale={$xScale} />
    {/if}
{/if}


<style>
    .group-select{
        bottom: 0;
        position: absolute;       
        outline: 3px solid var(--accent-color);
        box-shadow: 0 0px 8px var(--accent-color);
    }

    .sr-only {
        position: absolute;
        clip: rect(1px, 1px, 1px, 1px);
        padding: 0;
        border: 0;
        height: 1px;
        width: 1px;
        overflow: hidden;
    }

</style>

