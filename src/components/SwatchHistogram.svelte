<script>
    import { getContext } from 'svelte';
    import { flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, groups, ascending, rollups } from 'd3-array'
    import { scaleLinear } from 'd3-scale';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height } = getContext('LayerCake');

    const { ctx } = getContext('canvas');

    export let blockWidth = 10;
    export let filterProp;
    export let filterValue;

    $: blockHeight = blockWidth / 2;
    let blockPadding = 2;

    const margins = {
        top: 20,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;

    $: colNum = Math.round( graphWidth / (blockPadding + blockWidth))

    $: lightBin = bin().thresholds(($data, min, max) => range(colNum)
            .map(t => min + (t / colNum) * (max - min)))
            .domain([0, 1])
            .value(d => d.lightness)

    $: lightnessScale = scaleLinear().range([margins.left, $width - margins.right]).domain([0.15, 0.99])

    // if data needs to be filtered, filter it
    let filteredData = $data;
    $: if (filterProp && filterValue) {
        filteredData = $data.filter(d => d[filterProp] === filterValue)
    }

    // update the binned data if data or column number changes
    $: binnedData = lightBin(filteredData)

    $: console.log({binnedData})

    // build histogram in canvas
    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height);

            binnedData.forEach(bin => {
                const x = lightnessScale(bin.x0)

                bin.forEach((swatch, i) => {
                    $ctx.fillStyle = swatch.hex;
                    $ctx.fillRect(x, (blockHeight + blockPadding) * i, blockWidth, blockHeight);
                    $ctx.fill();
                })
            })
        }
    }


</script>