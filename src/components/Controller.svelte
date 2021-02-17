<script>
    import TooltipDisplay from "./TooltipDisplay.svelte"
    import { getContext } from 'svelte';
    import { groups } from 'd3-array'


    export let blockDimensions;
    export let options;
    export let currentGroup;
    export let groupedData;

    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake')
    
    //$: groupedData = groups($data, d => d.binStart)
    $: console.log({currentGroup})


</script>

<div class='group-select' style="width:{blockWidth}px; height:{groupedData[currentGroup][1].length * (blockHeight + blockPadding) + blockPadding}px; left:{$xScale(groupedData[currentGroup][0])}px"></div>

<style>
    .group-select{
        border: 2px solid var(--accent-color);
        bottom: 0;
        position: absolute;
    }
</style>

