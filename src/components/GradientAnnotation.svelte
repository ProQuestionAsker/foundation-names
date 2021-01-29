<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle, ascending } from 'd3-array'
    import { scaleLinear } from 'd3-scale';


    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height } = getContext('LayerCake');

    const margins = {
        top: 40,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;

    // // if data needs to be filtered, filter it
    // let filteredData = $data;
    // $: if (filterProp && filterValue) {
    //     filteredData = $data.filter(d => d[filterProp] === filterValue)
    // }

    // $: flatLight = filteredData.map(d => +d.lightness).sort((a, b) => ascending(a, b))


    // $: firstQuant = quantile(flatLight, 0.1)
    // $: lastQuant = quantile(flatLight, 0.9)
    // $: lightnessScale = scaleLinear().range([margins.left, $width - margins.right]).domain([0.15, 0.99])

</script>

<rect ></rect>