<script>
    import TooltipDisplay from "./TooltipDisplay.svelte"
    import { getContext, onMount } from 'svelte';


    export let blockDimensions;
    export let options;
    export let currentGroup;
    export let groupedData;
    export let controllerContainer;
    export let groupActive = false;
    export let flatData;
    export let wordIndex;

    let groupSelOutline;
    export let found;
    export let exploreSwatches = false;
    let ind = 0
    let groupCount = groupedData.length
    let groupLabel = 'Group of swatches'
    let srValue;
    $: selGroupData = groupedData[currentGroup]

    $: console.log({groupedData, currentGroup})


    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake')

    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    function moveFocus(el){
        el.focus();
    }
    

    function updateGroupLabel(currentGroup, found){
        if (groupActive) {
            ind = 0;
            if (found !== '') groupLabel = `Name: ${found.name}. Brand: ${found.brand}. Product: ${found.product}.`
            else if (currentGroup === 0) groupLabel = `Darkest shades. Group 1 of ${groupCount}. ${selGroupData[1].length} Swatches. Lightness ${roundNumber(groupedData[0][0])} - ${roundNumber(groupedData[1][0])}`
            else if (currentGroup === groupCount - 1)  groupLabel = `Lightest shades. Group ${groupCount} of ${groupCount}. ${selGroupData[1].length} Swatches. Lightness ${roundNumber(selGroupData[0])} - 0.99`
            else groupLabel = `Group ${currentGroup + 1} of ${groupCount}. ${selGroupData[1].length} Swatches. Lightness ${roundNumber(selGroupData[0])} - ${roundNumber(groupedData[currentGroup + 1][0])}`
            console.log({groupLabel})
        }
    }

    $: updateGroupLabel(currentGroup, found)

</script>

{#if options.includes('histogram')}
        <div aria-hidden=true
            class={groupActive ? 'group-select active' : 'group-select'}
            style="width:{blockWidth + (blockPadding * 2)}px; height:{selGroupData[1].length * (blockHeight + blockPadding) + blockPadding}px; left:{$xScale(selGroupData[0])}px"
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

{#if options.includes('wordwall') && wordIndex}
        <ol class='sr-only' aria-label={`List of ${flatData.length} shade names, ordered darkest to lightest`}>
            {#key wordIndex}
                <li role="listitem" aria-label={`${flatData[wordIndex].name}. Shade ${wordIndex} of ${flatData.length}`} tabindex="-1" use:moveFocus>{`${flatData[wordIndex].name}. Shade ${wordIndex} of ${flatData.length}`}</li>
            {/key}
        </ol>
{/if}



<style>
    .group-select{
        bottom: 0;
        position: absolute;       
        outline: none;
        box-shadow: none;
    }

    .group-select.active {
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

