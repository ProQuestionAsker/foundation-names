<script>
    import { scaleCanvas } from 'layercake';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { getContext } from 'svelte';

    const { data, xScale, width, height } = getContext('LayerCake'); 
    const { ctx } = getContext('canvas')

    const gradientHeight = 0
    export let blockDimensions;
    export let options;
    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);

    $: onlyPositions = $data.map(d => ({
        x: $xScale(d.binStart) + (blockPadding),
        y: $height - gradientHeight - ((d.index + 1) * (blockHeight + blockPadding))
    }))
 
    $: blockPositions = tweened(null, {
                duration: 500,
                easing: cubicOut
    })

    $: blockPositions.set(onlyPositions)

    // $: {
    //     if (options.includes('natural')) naturalPositions.set(onlyPositions) 
    //     else  blockPositions.set(onlyPositions)
    // }

    // build histogram in canvas
    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height);

 
                $blockPositions.forEach((swatch, i) => {
                    const x = swatch.x
                    const y = swatch.y

                    if ($data[i]){
                        const hex = $data[i].hex;


                        if (options.includes('nudestix')){
                                // if nudestix step then full opacity for nudestix and half for everything else
                                $ctx.globalAlpha = $data[i].brand === 'NUDESTIX' ? 1 : 0.5

                                if ($data[i].brand === 'NUDESTIX'){
                                    $ctx.lineWidth = 2
                                    $ctx.strokeRect(x, y, blockWidth, blockHeight)
                                }
                        }

                        if (options.includes('highlight')){
                                const name = $data[i].name 
                                const highlightedNames = ['nude mocha', 'nude vanilla', 'nude bisque'];
                                const match = highlightedNames.includes(name)

                                $ctx.globalAlpha = match ? 1 : 0.5

                                if (match){
                                    $ctx.strokeStyle = "#000000"
                                    $ctx.lineWidth = 2
                                    $ctx.strokeRect(x, y, blockWidth, blockHeight)                      
                                }
                            }

                        // generally, create a filled rectangle
                        $ctx.fillStyle = hex;
                        $ctx.fillRect(x, y, blockWidth, blockHeight)

                        // if too light, add border
                        if ( +$data[i].lightness > 0.95){
                            $ctx.strokeStyle = '#F7D5B7'
                            $ctx.strokeRect(x, y, blockWidth, blockHeight)
                        }

                    }
                })
            
        
      
            

        }
    }

</script>
