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

    onMount(() => {
        console.log({groupSelOutline})
        groupSelOutline.focus()
    })

    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake')
    
    //$: groupedData = groups($data, d => d.binStart)

    // function moveFocusGroup(currentGroup){
    //     if (groupSelOutline) {
    //         groupSelOutline.focus();
    //     }
    // }

    // $: moveFocusGroup(currentGroup)


</script>

<div bind:this={groupSelOutline} 
    class='group-select'    
    style="width:{blockWidth + (blockPadding * 2)}px; height:{groupedData[currentGroup][1].length * (blockHeight + blockPadding) + blockPadding}px; left:{$xScale(groupedData[currentGroup][0])}px"
></div>


<style>
    .group-select{
        bottom: 0;
        position: absolute;
        border: 1px solid red;
    }
    .group-select:focus{
        border: 5px solid var(--accent-color)
    }
</style>

