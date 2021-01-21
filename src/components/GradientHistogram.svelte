<script>
import { scaleCanvas } from 'layercake';

// Import the getContext function from svelte
import { getContext } from 'svelte';
import { hsl } from 'd3-color';
import {interpolate, interpolateHslLong} from 'd3-interpolate'




    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, xGet, yGet, width, height } = getContext('LayerCake');
    const { ctx } = getContext('canvas');
    const startColor = hsl(19.5, 0.46, 0.15)
    const endColor = hsl(30, 0.5, 0.99)
    const colors = interpolateHslLong(startColor, endColor)
    const margins = {
        top: 20,
        left: 20,
        right: 20, 
        bottom: 20
    }
    const n = $width - margins.left - margins.right

    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height)

            // draw rectangle
            $ctx.beginPath();
            $ctx.rect(margins.top, margins.left, $width - margins.left - margins.right, 100);
           

            for (let i = 20; i < n; ++i) {
                $ctx.fillStyle = colors(i / (n - 1));
                $ctx.fillRect(i, 20, $width - margins.left - margins.right, 100);
            }
            $ctx.stroke();
        }
    }

</script>

<style>

</style>