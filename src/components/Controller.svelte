<script>
    import TooltipDisplay from "./TooltipDisplay.svelte"
    import { getContext, onMount } from 'svelte';


    export let blockDimensions;
    export let options;
    export let currentGroup;
    export let groupedData;
    export let controllerContainer;

    let groupSelOutline;
    let mount = false

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
        console.log({shift: event.shiftKey, tab: event.key === 'Tab'})
        if (event.key === 'Shift' && event.key === 'Tab' || event.key === 'Escape') controllerContainer.focus();
    }


</script>

{#if options.includes('histogram')}
<div bind:this={groupSelOutline}
    on:keydown|preventDefault={handleKeyPress}
    tabindex=-1
    class='group-select'    
    style="width:{blockWidth + (blockPadding * 2)}px; height:{groupedData[currentGroup][1].length * (blockHeight + blockPadding) + blockPadding}px; left:{$xScale(groupedData[currentGroup][0])}px"
></div>
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

