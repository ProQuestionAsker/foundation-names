<script>
    import { flatten, scaleCanvas } from 'layercake';

    // Import the getContext function from svelte
    import { getContext } from 'svelte';
    import { hsl } from 'd3-color';
    import { quantile, ascending } from 'd3-array';
    import {interpolate, interpolateHslLong} from 'd3-interpolate'

    export let margins;
    export let lightnessScale;

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, xGet, yGet, width, height } = getContext('LayerCake');
    const { ctx } = getContext('canvas');
    const startColor = hsl(19.5, 0.46, 0.15)
    const endColor = hsl(30, 0.5, 0.99)
    const colors = interpolateHslLong(startColor, endColor)

    const n = $width -  margins.right;

    $: flatLight = $data.map(d => +d.lightness).sort((a, b) => ascending(a, b))


    $: firstQuant = quantile(flatLight, 0.1)
    $: lastQuant = quantile(flatLight, 0.9)


    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
           // $ctx.clearRect(0, 0, $width, $height)

            // draw rectangle
            // $ctx.beginPath();
            $ctx.rect(margins.top, margins.left, $width - margins.left - margins.right, 50);
            $ctx.stroke();

            for (let i = 20; i < n; ++i) {
                $ctx.fillStyle = colors(i / (n - 1));
                $ctx.fillRect(i, 20, 1, 50);
            }

            // for (let i = 0; i < n; ++i) {
            //     $ctx.fillStyle = colors(i / (n - 1));
            //     $ctx.fillRect(i, 0, 1, 1);
            // }


            // draw 80% rectangle
            $ctx.beginPath();
            $ctx.lineWidth = 5;
            $ctx.rect(margins.left + lightnessScale(firstQuant), margins.top , lightnessScale(lastQuant - firstQuant), 50);
            $ctx.stroke();
            
        }
    }

</script>


