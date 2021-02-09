<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle, descending, ascending } from 'd3-array'
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
    // export let canvasHeight;


    $: flattenedData = $data.sort((a, b) => ascending(+a.lightness, b.lightness))
    
    // $: {
    // //     let flatBins = []

    // //     binnedData.forEach((bin, i) => {
    // //     const sorted = bin.sort((a, b) => descending(+a.lightness, +b.lightness))

    // //     const swatches =  sorted.map((d, ind) => ({
    // //         ...d,
    // //         x: $xScale(bin.x0),
    // //         index: ind
    // //     }))
        

    // //     flatBins.push(swatches)
    // // })
    // //     const semiFlat = flatten(flatBins)
    // //     const intFlat = flatten(semiFlat).map((d, i) => ({
    // //         ...d,
    // //         id: i
    // //     }))
    // //     flattenedData = intFlat

    // }


    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }


    $: {
        if ($ctx) {
            $ctx.clearRect(0, 0, $width, $height);
            $ctx.font = '12px sans-serif'
            const flatWords = flattenedData.map(d => ({
                ...d,
                textWidth: $ctx.measureText(d.name).width
            }))

            let row = 0;
            let currentRowWidth = 0;

            const theseWords = flatWords.map((d, i) => {
                let thisRow;
                let thisX;
                if (currentRowWidth + d.textWidth + blockPadding > $width){
                    row += 1
                    currentRowWidth = d.textWidth;
                    thisRow = row;
                    thisX = 0
                } else {
                    thisRow = row;
                    thisX = i === 0 ? currentRowWidth : currentRowWidth + blockPadding;
                    currentRowWidth += d.textWidth + blockPadding
                }


                if (i === flatWords.length - 1){
                    const newHeight = (row + blockPadding) * 12 
                    // $ctx.canvas.height = `${newHeight}`;
                    // $ctx.canvas.width = `${$width}`
                }

                return ({
                    ...d,
                    wordRow: thisRow,
                    wordX: thisX
                })

    
            })

            console.log({theseWords})

            // const allFlat = shuffled.map((d, i) => {
            //     const row = ~~ (i / colNum)
            //     const binNum = i - (colNum * row)
            //     const x0 = binnedData[binNum].x0
            //     return {
            //         ...d, 
            //         x: $xScale(x0),
            //         index: row,
            //     }
            // })


            theseWords.forEach((swatch, i) => {
                const y = swatch.wordRow * wordHeight + blockPadding
       
                $ctx.strokeStyle = "#FFFFFF"
                $ctx.fillStyle = swatch.hex;
               
                
                //$ctx.fillRect(swatch.wordX - (blockPadding / 2), y, swatch.textWidth + (blockPadding), 12)
                
                // $ctx.globalCompositeOperation = "difference";
                //$ctx.fillStyle = swatch.lightness <= 0.5 ? '#fff': '#000'
                // $ctx.textAlign = 'start'
                $ctx.textBaseline = 'hanging'
                // // $ctx.strokeText(name, x, y + blockHeight + blockPadding) 
                $ctx.fillText(swatch.name, swatch.wordX, y)
            })



            // flattenedData.forEach((swatch, i) => {
            //    const x = swatch.x
            //    const y = $height - margins.bottom - ((swatch.index + 1) * (wordHeight + blockPadding))
    
            //     $ctx.strokeStyle = "#FFFFFF"
            //     $ctx.fillStyle = swatch.hex;
            //     // $ctx.fillStyle = "#000000"
            //     $ctx.font = '12px sans-serif'
            //     $ctx.textAlign = 'start'
            //     $ctx.textBaseline = 'middle'
            //     // $ctx.strokeText(name, x, y + blockHeight + blockPadding) 
            //     $ctx.fillText(swatch.name, x, y + wordHeight + blockPadding)
            // })
        }
    }
</script>