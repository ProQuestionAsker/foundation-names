<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import Tooltip from "./Tooltip.svelte"
    import Table from "./Table.svelte"

    const { data, width, height, xScale } = getContext('LayerCake')
    export let options = [];
    export let blockDimensions;
    export let lineData;

    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    let tableData;
    let tableHeaders = ['brand', 'product', 'name', 'hex', 'lightness']
    $: if (options.includes('table')){
        tableData = $data.map(d => ([d.brand, d.product, d.name, d.hex, roundNumber(d.lightness)]))
    }

</script>

{#if (options.includes('shuffled') || options.includes('histogram') || options.includes('natural'))}
    <Canvas>
        {#key $data.length}
            <SwatchHistogram {blockDimensions} {options}/>
        {/key}
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

    {#if lineData.length > 0}
        <Line {options} {lineData} {blockDimensions} />
    {/if}

</Svg>  


<Html zIndex={5}>
    {#if options.includes('tooltip')}
        <Tooltip {blockDimensions}/>
    {/if}

    {#if options.includes('table')}
        <Table headers={tableHeaders} rows={tableData} perPage={10} />
    {/if}
</Html>



