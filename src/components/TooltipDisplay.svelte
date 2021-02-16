<script>
    export let selected;

    export let blockDimensions;
    export let width;
    export let height;
    export let xScale;
    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);
    let w = 250;
    $: h = w * 2 ;

    // if too far right, flip to other side
    $: startXPos = xScale(selected.binStart) + blockWidth + (blockPadding * 2)
    $: left = width - startXPos < w ? startXPos - blockWidth - w - (blockPadding * 2) : startXPos

    $: startYPos = height - ((selected.index + 1) * (blockHeight + blockPadding)) - (blockPadding)
    $: top = height - startYPos < w ? startYPos - 100: startYPos




</script>

<div class='tooltip' style="width:{w}px;
    top: {top}px;
    left: {left}px
">  <p class='name'>"{selected.name}"</p>
    <p class='brand'>{selected.brand}</p>
    <p class='product'>{selected.product}</p>

</div>

<div class='highlight' style="width:{blockWidth + (blockPadding * 2)}px; 
    height: {blockHeight + (blockPadding * 2)}px; 
    top:{height - ((selected.index + 1) * (blockHeight + blockPadding)) - (blockPadding)}px;
    left: {xScale(selected.binStart)}px">

</div>

<style>
    .tooltip {
        position: absolute;
        background-color: var(--white);
        padding: 0.5rem 1rem;
        border: 1px solid var(--gray);
        pointer-events: none;
    }

    .tooltip p {
        margin: 0.5rem 0;
    }

    .brand, .product{
        font-size: 14px;
    }

    .name {
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .highlight {
        border: 3px solid var(--accent-color);
        position: absolute;
        box-shadow: 0 0px 8px var(--accent-color);
    }
</style>
