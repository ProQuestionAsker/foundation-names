<script>
    import {quadtree} from 'd3-quadtree';
    import { getContext } from 'svelte';
    import TooltipDisplay from './TooltipDisplay.svelte'


    export let blockDimensions;
    let found = {};

    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake')

    $: formattedData = $data.map(d => ({
        ...d,
        x: $xScale(d.binStart) + blockWidth,
        y: $height - ((d.index + 1) * (blockHeight + blockPadding))
    }))


    function findItem(mousePos){
        found = finder.find(mousePos.x, mousePos.layerY)
    }


    $: finder = quadtree()
        .extent([[-1, -1], [$width + 1, $height + 1]])
        .x(d => d.x)
        .y(d => d.y)
        .addAll(formattedData)
</script>

<div class='bg' on:mousemove={findItem} on:mouseleave={() => found = {}}></div>

{#if Object.keys(found).length > 0}
    <TooltipDisplay selected={found} width={$width} {blockDimensions} height={$height} xScale={$xScale} />
{/if}

<style>
    .bg {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: all;
    }
</style>
