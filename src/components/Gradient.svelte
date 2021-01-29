<script>
    import { flatten, scaleCanvas } from 'layercake';
    import { scaleLinear } from 'd3-scale';

    // Import the getContext function from svelte
    import { getContext } from 'svelte';
    import { hsl } from 'd3-color';
    import { quantile, ascending } from 'd3-array';
    import {interpolate, interpolateHslLong} from 'd3-interpolate'

    const margins = {
        top: 10,
        left: 20,
        right: 20, 
        bottom: 20
    }



    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, xGet, yGet, width, height } = getContext('LayerCake');
    const { ctx } = getContext('canvas');
    const startColor = hsl(19.5, 0.46, 0.15)
    const endColor = hsl(30, 0.5, 0.99)
    const colors = interpolateHslLong(startColor, endColor)

    const n = 512;

    export let block = 'off'
    export let filterProp;
    export let filterValue;
    export let step; 

        // if data needs to be filtered, filter it
        let filteredData = $data;
    $: if (filterProp && filterValue) {
        filteredData = $data.filter(d => d[filterProp] === filterValue)
    }

    $: flatLight = filteredData.map(d => +d.lightness).sort((a, b) => ascending(a, b))


    $: firstQuant = quantile(flatLight, 0.1)
    $: lastQuant = quantile(flatLight, 0.9)
    $: lightnessScale = scaleLinear().range([margins.left, $width - margins.right]).domain([0.15, 0.99])

    $: {
        if ($ctx) {
            scaleCanvas($ctx, n, 1);
            $ctx.clearRect(0, 0, $width, $height)

            if (step !== 'all') {
                $ctx.canvas.style.width = `calc(100% - ${margins.right + margins.left}px)`;
                $ctx.canvas.style.marginLeft = `${margins.left}px`;
                $ctx.canvas.style.marginTop = `${margins.top}px`;
                $ctx.canvas.style.height = "20px";
                $ctx.canvas.style.imageRendering = "pixelated";

                // draw rectangle
                // $ctx.beginPath();
                // $ctx.rect(margins.top, margins.left, $width - margins.left - margins.right, 50);
                // $ctx.stroke();

                for (let i = 0; i < n; ++i) {
                    $ctx.fillStyle = colors(i / (n - 1));
                    $ctx.fillRect(i, 0, 1, 1);
                }

            }

            


            // for (let i = 0; i < n; ++i) {
            //     $ctx.fillStyle = colors(i / (n - 1));
            //     $ctx.fillRect(i, 0, 1, 1);
            // }

            if (block === 'on'){
                console.log({check: lightnessScale(firstQuant), check2: lightnessScale(lastQuant)})
                // draw 80% rectangle
                //$ctx.beginPath();
                $ctx.lineWidth = 1;
                $ctx.strokeRect(lightnessScale(firstQuant), 0 , lightnessScale(lastQuant - firstQuant), 20);
                // $ctx.stroke();
            }


            
        }
    }

</script>


