<script>
    import { flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, groups, ascending, rollups } from 'd3-array'

    // Import the getContext function from svelte
    import { getContext } from 'svelte';
    import { hsl } from 'd3-color';
    import {interpolate, interpolateHslLong} from 'd3-interpolate'


    export let margins;
    export let lightnessScale;
    export let filter;

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, xGet, yGet, width, height } = getContext('LayerCake');
    const { ctx } = getContext('canvas');
    $: graphWidth = $width - margins.left - margins.right;

    const blockWidth = 10;
    $: blockHeight = blockWidth / 2
    const blockPadding = 2;
    $: colNum = Math.round(graphWidth / (blockPadding + blockWidth))

    $: varietyData = null
    $: if (filter === 'TRUE') varietyData = $data.filter(d => d.namingScheme === 'variety')
    else varietyData = $data
    
    

    $: lightBin = bin()
        .thresholds(($varietyData, min, max) =>
            range(colNum).map(t => min + (t / colNum) * (max - min)))
        .domain([0, 1]).value(d => d.lightness)

    $: gradientBins = lightBin(varietyData)

    $: {
        if ($ctx) {

        scaleCanvas($ctx, $width, $height);
        $ctx.clearRect(0, 0, $width, $height);

        gradientBins.forEach(bin => {
            const x = lightnessScale(bin.x0)
            
            bin.forEach((swatch, i) => {
                $ctx.fillStyle = swatch.hex;
                $ctx.fillRect(x, (blockHeight + blockPadding) * i, blockWidth, blockHeight);
                $ctx.fill();

                
                // $ctx.stroke();
                //$ctx.stroke();
            })
        })
    }
    }
</script>
