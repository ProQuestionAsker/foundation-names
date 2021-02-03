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

    export let blockWidth = 10;
    export let step;
    export let binnedData;

    $: blockHeight = blockWidth / 2;
    let blockPadding = 2;

    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;
    $: colNum = Math.round( graphWidth / ((blockPadding * 2) + blockWidth))

    $: lightBin = bin()
            .thresholds(($data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
            .domain([0.15, 0.99])
            .value(d => d.lightness)


        // // set up tweening function
    $: blockPositions = tweened($data.map(d => ({x: 0, index: 0})), {
            duration: 500,
            easing: cubicOut
        })
      
    let flattenedData;


   $: {
        // bin the data
        binnedData = lightBin($data)

        // flatten the data with binning information
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

        let onlyPositions;

        flattenedData = intFlat

        const shuffled = shuffle(intFlat.slice())

        if (step === 'all'){
            const allFlat = shuffled.map((d, i) => {
                const row = ~~ (i / colNum)
                const binNum = i - (colNum * row)
                const x0 = binnedData[binNum].x0
                return {
                    ...d, 
                    x: $xScale(x0),
                    index: row,
                }
            })
            const sorted = allFlat.sort((a, b) => ascending(a.id, b.id))

            onlyPositions = sorted.map(d => ({x: d.x, index: d.index}))

        }
        else {
            const semiFlat = flatten(flatBins)
            const intFlat = flatten(semiFlat)
            const totallyFlat = intFlat

             onlyPositions = totallyFlat.map(d => ({x: d.x, index: d.index}))
            //  blockPositions.set(totallyFlat)
    
        }

        blockPositions.set(onlyPositions);

  
    }


    // build histogram in canvas
    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height);

           $blockPositions.forEach((swatch, i) => {
               const x = swatch.x
               const y = swatch.index * (blockHeight + blockPadding)
               //const hex = flattenedData[i].hex

               if (flattenedData[i]){
                   const hex = flattenedData[i].hex
 
                    if (step === 'nudestix'){
                        // if nudestix step then full opacity for nudestix and half for everything else
                        $ctx.globalAlpha = flattenedData[i].brand === 'NUDESTIX' ? 1 : 0.5

                        if (flattenedData[i].brand === 'NUDESTIX'){
                            $ctx.lineWidth = 1
                            $ctx.strokeRect(x, y + margins.top, blockWidth, blockHeight)
                        }
                    }

                    if (step === 'highlight'){
                        const name = flattenedData[i].name 
                        const highlightedNames = ['nude mocha', 'nude vanilla', 'nude bisque'];
                        const match = highlightedNames.includes(name)

                        $ctx.globalAlpha = match ? 1 : 0.5

                        if (match){
                            $ctx.strokeStyle = "#000000"
                            $ctx.lineWidth = 2
                            $ctx.strokeRect(x, y + margins.top, blockWidth, blockHeight)                      
                        }
                    }

                    $ctx.fillStyle = hex;
                    $ctx.fillRect(x, y + margins.top , blockWidth, blockHeight)

                    if (step === 'highlight'){
                        const name = flattenedData[i].name 
                        const highlightedNames = ['nude mocha', 'nude vanilla', 'nude bisque'];
                        const match = highlightedNames.includes(name)

                        if (match){
                            $ctx.strokeStyle = "#FFFFFF"
                            $ctx.fillStyle = "#000000"
                            $ctx.font = 'bold 14px sans-serif'
                            $ctx.textAlign = name === 'nude mocha' ?  'start' : 'center'
                            $ctx.textBaseline = 'hanging'
                            $ctx.strokeText(name, x, y + margins.top + blockHeight + blockPadding) 
                            $ctx.fillText(name, x, y + margins.top + blockHeight + blockPadding)
                        }

 
                    }
                 
               }

               
           })
           

        }
    }
    


</script>