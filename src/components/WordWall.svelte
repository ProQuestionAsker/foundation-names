<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle, descending, ascending } from 'd3-array'
    import { scaleLinear } from 'd3-scale';
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing';
    import extendedHeight from './../stores/stores.js';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, width, height, xScale } = getContext('LayerCake');
    const { ctx } = getContext('canvas');

    export let wordHeight = 18;
    export let blockDimensions;
    export let id;
    let newHeight;

  
    $: if (id) $extendedHeight[id].height = newHeight;

    let blockPadding = 4

    let smallBlock = 12;

    //$: ({blockPadding, blockHeight, blockWidth} = blockDimensions)

    $: flattenedData = $data.sort((a, b) => ascending(+a.lightness, b.lightness))
    
    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }


    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height);
            $ctx.font = `${wordHeight - 4}px sans-serif`
            const flatWords = flattenedData.map(d => ({
                ...d,
                textWidth: $ctx.measureText(d.name).width
            }))

            let row = 0;
            let currentRowWidth = 0;

            const theseWords = flatWords.map((d, i) => {
                let thisRow;
                let thisX;
                if (currentRowWidth + d.textWidth + (blockPadding * 2) > $width){
                    row += 1
                    currentRowWidth = d.textWidth
                    thisRow = row;
                    thisX = 0
                } else {
                    thisRow = row;
                    thisX = row === 0 && i === 0 ? currentRowWidth : currentRowWidth + (blockPadding * 2);
                    currentRowWidth += d.textWidth + (blockPadding * 2)
                }


                if (i === flatWords.length - 1){
                    newHeight = (row + blockPadding) * 12 
                }

                return ({
                    ...d,
                    wordRow: thisRow,
                    wordX: thisX
                })

    
            })

            theseWords.forEach((swatch, i) => {
                const y = swatch.wordRow * wordHeight + (blockPadding  * 2)
       
                $ctx.strokeStyle = "#FFFFFF"
                $ctx.fillStyle = '#000000'
               
                
                //$ctx.fillRect(swatch.wordX - (blockPadding / 2), y, swatch.textWidth + (blockPadding), 12)
                
                // $ctx.globalCompositeOperation = "difference";
                //$ctx.fillStyle = swatch.lightness <= 0.5 ? '#fff': '#000'
                // $ctx.textAlign = 'start'
                $ctx.textBaseline = 'hanging'
                // // $ctx.strokeText(name, x, y + blockHeight + blockPadding) 
                $ctx.fillText(swatch.name, swatch.wordX + blockPadding, y)

                $ctx.strokeStyle = swatch.hex;
                $ctx.lineWidth = 3;
                $ctx.strokeRect(swatch.wordX, y - blockPadding, swatch.textWidth + (blockPadding * 2), wordHeight)

                // $ctx.beginPath()
                // $ctx.arc(swatch.wordX + smallBlock / 2, y + (smallBlock / 2) , smallBlock / 2, 0, 2 * Math.PI, false)               
                // $ctx.fillStyle = swatch.hex;
                // $ctx.fill()
                //$ctx.fillRect(swatch.wordX, y, smallBlock, smallBlock)
            })
        }
    }
</script>