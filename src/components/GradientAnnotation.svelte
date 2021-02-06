<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle, ascending, quantile } from 'd3-array'
    import { scaleLinear } from 'd3-scale';


    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height, x, xScale } = getContext('LayerCake');

    const margins = {
        top: 40,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;

    $: flatLight = $data.map(d => +d.lightness).sort((a, b) => ascending(a, b))
    
    $: firstQuant = quantile(flatLight, 0.1)
    $: lastQuant = quantile(flatLight, 0.9)

    $: halfWay = ((lastQuant - firstQuant) / 2) + firstQuant

</script>

<text
    x = {$xScale(halfWay)}
    y = {$height + 25}
    text-anchor = "middle"
    alignment-baseline = "hanging"
    font-size = "12px"
    fill = var(--gray)
>80% of shades fall in this range</text>

<rect x = {$xScale(firstQuant)}
    y = {$height}
    width = {$xScale(lastQuant) - $xScale(firstQuant)}
    height = 20
    fill = "none"
    stroke = "black"
    stroke-width = 3
></rect>

<style>

</style>

