<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle, ascending } from 'd3-array'
    import { scaleLinear } from 'd3-scale';
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, width, height, xScale } = getContext('LayerCake');
    const { ctx } = getContext('canvas');

    export let wordWidth;
    export let wordHeight;
    export let wordColNum;
    export let binnedData;
    export let blockPadding;


    let flattenedData;
    
    $: {
        let flatBins = []

        binnedData.forEach((bin, i) => {
        const swatches =  bin.map((d, ind) => ({
            ...d,
            x: $xScale(bin.x0),
            index: ind
        }))

        flatBins.push(swatches)
    })
        const semiFlat = flatten(flatBins)
        const intFlat = flatten(semiFlat).map((d, i) => ({
            ...d,
            id: i
        }))
        flattenedData = intFlat
    }


    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }


    $: console.log({flattenedData})

    $: {
        if ($ctx) {
            $ctx.clearRect(0, 0, $width, $height);

            flattenedData.forEach((swatch, i) => {
               const x = swatch.x
               const y = $height - margins.bottom - ((swatch.index + 1) * (wordHeight + blockPadding))

                $ctx.strokeStyle = "#FFFFFF"
                $ctx.fillStyle = swatch.hex;
                // $ctx.fillStyle = "#000000"
                $ctx.font = '14px sans-serif'
                $ctx.textAlign = 'center'
                $ctx.textBaseline = 'middle'
                // $ctx.strokeText(name, x, y + blockHeight + blockPadding) 
                $ctx.fillText(swatch.name, x, y + wordHeight + blockPadding)
            })
        }
    }
</script>