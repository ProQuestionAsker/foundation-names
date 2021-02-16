<script>
    import {quadtree} from 'd3-quadtree';
    import { getContext } from 'svelte';
    import TooltipDisplay from './TooltipDisplay.svelte'


    export let blockDimensions;
    let visible;
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


    function resetFound(){
        found = {};
    }

    $: finder = quadtree()
        .extent([[-1, -1], [$width + 1, $height + 1]])
        .x(d => d.x)
        .y(d => d.y)
        // .x(d => ($xScale(d.binStart) + blockDimensions.blockWidth))
        // .y(d =>  $height - ((d.index + 1) * (blockDimensions.blockHeight + blockDimensions.blockPadding)))
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


<!-- <script>
    import { quadtree } from 'd3-quadtree';
    import { getContext } from 'svelte';

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake');


    export let blockDimensions;


    let visible = false;
    let found;

    $: console.log({found, positions})
    $: console.log({test: $xGet(positions[0])})

    const w = 150;
    $: h = w/2;
    const tooltipOffset = 20;
    const marginBottom = 10;


    function findItem(pos){
        found = finder.find(pos.x, pos.y)
        visible = true;
    }

    $: finder = quadtree()
        .extent([[-1, -1], [$width + 1, $height + 1]])
        .x(d => ($xGet(d)))
        .y(d => d.index )
        // .y($yGet)
        .addAll(positions)

</script>

<div class='bg' on:mousemove="{findItem}"
    on:mouseout="{visible = false}"
></div>
{#if found}
    <div class='tooltip'
        style="width:{w}px; display: {visible ? 'block' : 'none'};
        top: {found.index * (blockHeight * blockPadding)}px;
        left: {Math.min(Math.max(h, found.x), $width - h)}px"
    >

        <p>{found.brand}</p>
        <p>{found.product}</p>
        <p>{found.name}</p>
    </div>

    <div class='highlight' style="width:{blockWidth + 4}px; height: {blockHeight + 4}px; left:{$xGet(found)}px; top: {$height - marginBottom * 2 - (found.index * (blockHeight + blockPadding)) - 2}px">

    </div>
{/if}


<style>
    .bg {
        height: 100%;
    }

    .tooltip {
        background-color: cornflowerblue;
        position: absolute;
        transform: translate(-50%, -100%);
        padding: 5px;
        z-index: 15;
        pointer-events: none;
    }

    .highlight {
        border: 2px solid black;
        position: absolute;
    }
</style> -->