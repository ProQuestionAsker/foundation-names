<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"

    const { data, width, height, xScale } = getContext('LayerCake')
    export let options = [];
    export let blockDimensions;
    export let lineData;

</script>

{#if options.includes('shuffled') || options.includes('histogram')}
    <Canvas>
        <SwatchHistogram {blockDimensions} {options}/>
    </Canvas>
{/if}

{#if options.includes('gradient')}
    <Canvas>
        <Gradient /> 
    </Canvas>
{/if}

<Svg zIndex={3}>
    {#if options.includes('majority')}
        <GradientAnnotation  />    
    {/if}

    {#if options.includes('line')}
        <Line {options} {lineData} {blockDimensions} />
    {/if}
</Svg>  


