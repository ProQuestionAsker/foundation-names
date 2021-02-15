<script>
    import { quadtree } from 'd3-quadtree';
    import { getContext } from 'svelte';

    const { data, xGet, yGet, width, xScale, height} = getContext('LayerCake');

    export let positions;
    export let blockHeight;
    export let blockPadding;
    export let blockWidth;

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
</style>