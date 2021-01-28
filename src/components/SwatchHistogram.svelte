<script>
    import { getContext } from 'svelte';
    import { flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, groups, ascending, rollups } from 'd3-array'

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height } = getContext('LayerCake');

    const { ctx } = getContext('canvas');

    export let blockWidth = 10;
    export let filterProp;
    export let filterValue;

    $: console.log({filterProp, filterValue})
    $: blockHeight = blockWidth / 2;
    let blockPadding = 2;

    const margins = {
        top: 20,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;

    $: colNum = Math.round( graphWidth / (blockPadding + blockWidth))

    $: lightBin = bin().thresholds(($data, min, max) => range(colNum)
            .map(t => min + (t / colNum) * (max - min)))
            .domain([0, 1])
            .value(d => d.lightness)

    // if data needs to be filtered, filter it
    let filteredData = $data;
    $: if (filterProp && filterValue) {
        filteredData = $data.filter(d => d[filterProp] === filterValue)
    }

    $: console.log({filteredData})

    // update the binned data if data or column number changes
    $: binnedData = lightBin($data)

    $: console.log({binnedData, colNum, blockWidth})

</script>