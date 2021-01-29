<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle } from 'd3-array'
    import { scaleLinear } from 'd3-scale';
    import { tweened } from 'svelte/motion'

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height } = getContext('LayerCake');

    const { ctx } = getContext('canvas');

    export let blockWidth = 10;
    export let filterProp;
    export let filterValue;
    export let step;

    $: blockHeight = blockWidth / 2;
    let blockPadding = 2;

    const margins = {
        top: 40,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;

    $: colNum = Math.round( graphWidth / ((blockPadding * 2) + blockWidth))

    $: lightBin = bin()
            // .thresholds([0.15, 0.99])
            .thresholds(($data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
            .domain([0.15, 0.99])
            .value(d => d.lightness)

    $: lightnessScale = scaleLinear()
        .range([margins.left, $width - margins.right])
        .domain([0.15, 0.99])

    // if data needs to be filtered, filter it
    let filteredData = $data;
    $: if (filterProp && filterValue) {
        filteredData = $data.filter(d => d[filterProp] === filterValue)
    }

    // shuffle order
    $: shuffle(filteredData)

    // update the binned data if data or column number changes
    $: binnedData = lightBin(filteredData)

    let totallyFlat;

    function flattenBins(){
        let flatBins = []
        binnedData.forEach((bin, i) => {
        const swatches =  bin.map((d, ind) => ({
            ...d,
            x: lightnessScale(bin.x0),
            index: ind
        }))

        flatBins.push(swatches)
    })

        const semiFlat = flatten(flatBins)
        totallyFlat =  flatten(semiFlat)
    }

    $: binnedData, flattenBins()
    
    $: tweenedData = tweened(totallyFlat, 500)


    $: {
        if (step === 'all') {
            // set bin number to sequential and random
            const allFlat = totallyFlat.map((d, i) => {
                const row = ~~ (i / colNum)
                const binNum = i - (colNum * row)
                const x0 = binnedData[binNum].x0
                return {
                    ...d, 
                    x: lightnessScale(x0),
                    index: row,
                }
            })

            tweenedData.set(allFlat)
        } 
        else {
            const histFlat = totallyFlat;
            tweenedData.set(histFlat)
        }
    }

    // build histogram in canvas
    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height);

           $tweenedData.forEach((swatch, i) => {
               const x = swatch.x
               const y = swatch.index * (blockHeight + blockPadding)

               $ctx.fillStyle = swatch.hex;
               $ctx.fillRect(x, y + margins.top, blockWidth, blockHeight)
           })


            // totallyFlat.forEach((swatch, i) => {
            //     const x = lightnessScale(binnedData[swatch.bin].x0)
            //     const y = swatch.index * (blockHeight + blockPadding)

            //     $ctx.fillStyle = swatch.hex;
            //     $ctx.fillRect(margins.left + x, y + margins.top, blockWidth, blockHeight)
            // })

        //     if (step === 'all'){
        //         filteredData.forEach((swatch, i) => {
        //             const rowNumber = (~~ (i / colNum))
        //             const x = (i - (colNum * rowNumber)) * (blockWidth + blockPadding)
        //             const y = rowNumber * (blockHeight + blockPadding)

        //             $ctx.fillStyle = swatch.hex;
        //             $ctx.fillRect(margins.left + x, y + margins.top, blockWidth, blockHeight);
        //             $ctx.fill();
        //         })
        //     }
        //     else {
        //         // arrange by bins
        //         totallyFlat.forEach((swatch, i) => {
        //             console.log({swatch})

        //         })

        //         binnedData.forEach(bin => {
        //         const x = lightnessScale(bin.x0) - (blockWidth / 2)

        //         bin.forEach((swatch, i) => {
        //             $ctx.fillStyle = swatch.hex;
        //             $ctx.fillRect(x, (blockHeight + blockPadding) * i + margins.top, blockWidth, blockHeight);
        //             $ctx.fill();
        //         })
        //     })
        // }
            }
            
    }


</script>