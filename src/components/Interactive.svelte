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
    import Annotations from "./Annotations.svelte"

    const { data, width, height, xScale } = getContext('LayerCake')
    export let options = [];
    export let blockDimensions;
    export let lineData;
    export let id;

    let key;
    let keyCode;
    let controllerContainer;
    let annotations = [];

    $: console.log({$data})


    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    function findCoordinates(name){
        return $data
            .filter(d => d.name === name)
            .map(d => ({
                x: $xScale(d.binStart) - blockDimensions.blockWidth, 
                y: $height - ((d.index + 1) * (blockDimensions.blockHeight + blockDimensions.blockPadding))
            }))
    }

    let tableData;
    let tableHeaders = ['brand', 'product', 'name', 'hex', 'lightness']
    $: if (options.includes('table')){
        tableData = $data.map(d => ([d.brand, d.product, d.name, d.hex, roundNumber(d.lightness)]))
    }

    $: {
        if (options.includes('highlight')){
            annotations = [{
                text: 'Nude Mocha',
                coordinates: findCoordinates('nude mocha'),
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: -7
                    }
                }]
            }, {
                text: 'Nude Vanilla',
                coordinates: findCoordinates('nude vanilla'),
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: -7
                    }
                }]
            }, {
                text: 'Nude Bisque',
                coordinates: findCoordinates('nude bisque'),
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: -7
                    }
                }]
            }]
        } else if (options.includes('natural')){
            annotations = [{
                text: 'Natural Toffee',
                coordinates: findCoordinates('natural toffee'),
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: -7
                    }
                }]
            }]
        } else if (options.includes('allLine')){
            annotations = [{
                text: 'Nude Mocha',
                coordinates: findCoordinates('nude mocha'),
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: -7
                    }
                }]
            }, {
                text: 'Nude Vanilla',
                coordinates: findCoordinates('nude vanilla'),
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: -7
                    }
                }]
            }]
        }
    }
    $: console.log({annotations})


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

    {#if options.includes('annotations')}
        <Annotations {annotations} /> 
    {/if}
</Html>



