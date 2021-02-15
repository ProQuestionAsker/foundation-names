<script>
    import { scaleCanvas } from 'layercake';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import { getContext } from 'svelte';

    const { data, xScale, width, height } = getContext('LayerCake'); 
    const { ctx } = getContext('canvas')

    const gradientHeight = 30
    export let blockDimensions;
    $: ({blockWidth, blockHeight, blockPadding} = blockDimensions);
    

    $: onlyPositions = $data.map(d => ({
        x: $xScale(d.binStart),
        y: $height - gradientHeight - ((d.index + 1) * (blockHeight + blockPadding))
    }))



    $: blockPositions = tweened(null, {
            duration: 500,
            easing: cubicOut
        })

    $: blockPositions.set(onlyPositions)

    $: console.log({blockWidth, blockHeight})

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
                    $ctx.fillStyle = hex;
                    $ctx.fillRect(x, y, blockWidth, blockHeight)
                }
            })

        }
    }

</script>
