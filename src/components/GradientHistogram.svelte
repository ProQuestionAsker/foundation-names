<script>
    import Gradient from './Gradient.svelte'
    import GradientBlocks from './GradientBlocks.svelte'
    import { scaleLinear } from 'd3-scale';

    // Import the getContext function from svelte
    import { getContext } from 'svelte';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { width } = getContext('LayerCake');
    const margins = {
        top: 20,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: lightnessScale = scaleLinear().range([margins.left, $width - margins.right]).domain([0.15, 0.99])


</script>

<!-- <Gradient {margins} {lightnessScale} /> -->
<GradientBlocks {margins} {lightnessScale} filter = "" /> 
<style>

</style>