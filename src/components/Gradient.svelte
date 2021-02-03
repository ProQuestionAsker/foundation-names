<script>
    import { scaleCanvas } from 'layercake';

    // Import the getContext function from svelte
    import { getContext } from 'svelte';
    import { hsl } from 'd3-color';
    import { interpolateHslLong} from 'd3-interpolate'
    
    const marginTop = 5;

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { width, height } = getContext('LayerCake');
    const { ctx } = getContext('canvas');
    const startColor = hsl(19.5, 0.46, 0.15)
    const endColor = hsl(30, 0.5, 0.99)
    const colors = interpolateHslLong(startColor, endColor)

    const n = 512;

    export let step; 

    $: {
        if ($ctx) {
            scaleCanvas($ctx, n, 1);
            $ctx.clearRect(0, 0, $width, $height)

            if (step !== 'all') {
                $ctx.canvas.style.width = `${$width}px`;
                $ctx.canvas.style.marginTop = `${marginTop}px`;
                $ctx.canvas.style.height = "20px";
                $ctx.canvas.style.imageRendering = "pixelated";
                $ctx.canvas.style.transform = `translate(0, ${$height - marginTop}px)`

                // draw rectangle
                for (let i = 0; i < n; ++i) {
                    $ctx.fillStyle = colors(i / (n - 1));
                    $ctx.fillRect(i, 0, 1, 1);
                }

            }

        }
    }

</script>


