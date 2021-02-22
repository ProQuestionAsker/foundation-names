<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import { groups } from 'd3-array';
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import Tooltip from "./Tooltip.svelte"
    import Table from "./Table.svelte"
    import Wordwall from "./WordWall.svelte"
    import ControllerWrapper from "./ControllerWrapper.svelte"

    const { data, width, height, xScale } = getContext('LayerCake')
    export let options = [];
    export let blockDimensions;
    export let lineData;
    export let id;

    let key;
    let keyCode;
    let controllerContainer;


    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    let tableData;
    let tableHeaders = ['brand', 'product', 'name', 'hex', 'lightness']
    $: if (options.includes('table')){
        tableData = $data.map(d => ([d.brand, d.product, d.name, d.hex, roundNumber(d.lightness)]))
    }


</script>

<!-- aria hidden because custom aria controller will be introduced -->
<div aria-hidden="true">
    {#if (options.includes('shuffled') || options.includes('histogram') || options.includes('natural'))}
        {#key $data.length} 
            <Canvas>
                <SwatchHistogram {blockDimensions} {options}/>
            </Canvas> 
        {/key}
    {/if}
    {#if (options.includes('wordwall'))}
        <Canvas>
            <Wordwall {blockDimensions} {id}/>
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
</div>



<Html zIndex={5}>
    <ControllerWrapper {blockDimensions} {options} {lineData}/>

    {#if options.includes('tooltip')}
        <Tooltip {blockDimensions}/>
    {/if}

    {#if options.includes('table')}
        <Table headers={tableHeaders} rows={tableData} perPage={10} />
    {/if}
</Html>



