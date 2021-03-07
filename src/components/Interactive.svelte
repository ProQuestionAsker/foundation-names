<script>
    import { Canvas, Svg, Html } from "layercake";
    import { getContext } from "svelte";
    import { groups, least, greatest } from 'd3-array';
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import Line from "./Line.svelte"
    import Tooltip from "./Tooltip.svelte"
    import Table from "./Table.svelte"
    import Wordwall from "./WordWall.svelte"
    import ControllerWrapper from "./ControllerWrapper.svelte"
    import Annotations from "./Annotations.svelte"
    import Arrows from "./Arrows.svelte"

    const { data, width, height, xScale } = getContext('LayerCake')
    export let options = [];
    export let blockDimensions;
    export let lineData;
    export let id;
    export let title;
    export let parentWidth;
    let widthCheck;

    let key;
    let keyCode;
    let controllerContainer;
    let annotations = [];

    $: biggestUnder = greatest(lineData, d => d.difference)
    $: biggestOver = least(lineData, d => d.difference)


    function roundNumber(num){
        return Math.round(num * 100) / 100
    }

    function findCoordinates(name, offset){
        return $data
            .filter(d => d.name === name)
            .map(d => ({
                x: $xScale(d.binStart) - blockDimensions.blockWidth, 
                y: $height - ((d.index + 1) * (blockDimensions.blockHeight + blockDimensions.blockPadding))
            }))
    }

    $: console.log($width)

    function findLineCoordinates(bin, dimension){
        return [{
            x: $xScale(bin.x0) - blockDimensions.blockWidth,
            y: $height - ((bin[dimension] + 1) * (blockDimensions.blockHeight + blockDimensions.blockPadding))
        }]
        // return bin.map(d => ({
        //     x: $xScale(d.binStart) - blockDimensions.blockWidth, 
        //     y: $height - ((d[dimension] + 1) * (blockDimensions.blockHeight + blockDimensions.blockPadding))
        // }))
    }

    let tableData;
    let tableHeaders = ['brand', 'product', 'name', 'hex', 'lightness']
    $: if (options.includes('table')){
        tableData = $data.map(d => ([d.brand, d.product, d.name, d.hex, roundNumber(d.lightness)]))
    }

    $: {
        // force a recalculation on width change
        let _ = $width;
        if (options.includes('highlight')){
            annotations = [{
                text: 'Nude Mocha',
                coordinates: findCoordinates('nude mocha'),
                dy: 40,
                textDx: 20,
                mobile: 'left',
                arrowOffset: 15,
                arrow:[{
                    clockwise: false,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 40
                    }
                }]
            }, {
                text: 'Nude Vanilla',
                coordinates: findCoordinates('nude vanilla'),
                dy: 60,
                dx: blockDimensions.blockWidth + (blockDimensions.blockPadding * 2) + 25,
                textDx: 50,
                arrowOffset: 15,
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 40
                    }
                }]
            }, {
                text: 'Nude Bisque',
                coordinates: findCoordinates('nude bisque'),
                dy: 70,
                arrowOffset: 15,
                arrow:[{
                    clockwise: false,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 60
                    }
                }]
            }]
        } else if (options.includes('natural')){
            annotations = [{
                text: 'Natural Toffee',
                coordinates: findCoordinates('natural toffee'),
                dy: 60,
                arrowOffset: 15,
                arrow:[{
                    clockwise: false,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 40
                    }
                }]
            }]
        } else if (options.includes('allLine') && !options.includes('explore')){
            annotations = [{
                text: 'When the <span class=anno-all>all shades</span> line is higher, there are fewer shades named “nude” than we’d expect',
                coordinates: findLineCoordinates(biggestUnder, 'allCount'),
                dy: $height * 0.2,
                mobile: 'left',
                arrowOffset: 70,
                arrow:[{
                    clockwise: false,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 100
                    }
                }]
            }, {
                text: 'When the <span class=anno-nude>“nude” shades</span> line is higher, there are more shades in this color range than we expect',
                coordinates: findLineCoordinates(biggestOver, 'count'),
                dy: $height * 0.2,
                dx: blockDimensions.blockWidth,
                arrowOffset: 75,
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 150
                    }
                }]
            }]
        } else if (options.includes('explore')){
            annotations = [{
                text: '<span class=anno-all>Expected Distribution</span>',
                coordinates: findLineCoordinates(biggestUnder, 'allCount'),
                dy: 60,
                arrowOffset: 15,
                arrow:[{
                    clockwise: false,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 150
                    }
                }]
            }, {
                text: '<span class=anno-nude>Actual Distribution</span>',
                coordinates: findLineCoordinates(biggestOver, 'count'),
                dy: 60,
                dx: blockDimensions.blockWidth,
                arrowOffset: 15,
                arrow:[{
                    clockwise: true,
                    source: {
                        anchor: 'left-bottom',
                        dx: -2,
                        dy: 150
                    }
                }]
            }]
        }
    }



</script>

<!-- aria hidden because custom aria controller will be introduced -->
<div aria-hidden="true" >
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
    <ControllerWrapper {blockDimensions} {options} {lineData} {title}/>
    {#if options.includes('tooltip') && parentWidth > 500}
    <!-- tooltips only when necessary and not on mobile -->
        <Tooltip {blockDimensions}/>
    {/if}

    {#if options.includes('table')}
        <Table headers={tableHeaders} rows={tableData} perPage={10} />
    {/if}

    {#if options.includes('annotations')}
        <Annotations {annotations} /> 
    {/if}
</Html>

<Svg zIndex={4}>
    {#if options.includes('annotations')}
        <Arrows {annotations} {blockDimensions} />
    {/if}
</Svg>



<style>
    div {
        position: relative;
        height: 100%;
    }
</style>