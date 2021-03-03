<script>
    import { flatten, LayerCake } from "layercake";
    import { onMount } from "svelte";
    import Interactive from "./Interactive.svelte";
    import { bin, shuffle, range, ascending, least, greatest } from 'd3-array'

    export let data;
    export let filteredData;
    export let width;
    export let id;
    $: blockWidth = filteredData.length < 1000 ? 20 : 10;
    $: blockHeight = Math.ceil(blockWidth / 3);
    $: blockPadding = filteredData.length < 1000 ? 2 : 1;
    let totalHeight;
    let mounted = false;
    export let options = [];
    onMount(() => mounted = true)

    $: blockDimensions = {blockWidth, blockHeight, blockPadding}
    // dimensions 
    const margins = {
        top: 50,
        left: 20,
        right: 20, 
        bottom: 10
    }

    function findDifferences(binnedFiltered, binnedAll){
        const leastMissing = least(comboData, (a, b) => ascending(a.difference, b.difference) )
        const greatestMissing = greatest(comboData, (a, b) => ascending(a.difference, b.difference) )

        return {leastMissing, greatestMissing}
    }

    function flattenBins(binnedData, colNum){
        let flatBins = []
        let onlyPositions;

        binnedData.forEach((bin, i) => {
            const swatches = bin.map((d, ind) => ({
                ...d,
                binStart: bin.x0,
                index: ind
            }))

            flatBins.push(swatches)
        })

        const semiFlat = flatten(flatBins);
        const intFlat = flatten(semiFlat).map((d, i) => ({
            ...d,
            id: i
        }))

        const flattenedData = intFlat;

        let exportFlat = flattenedData

        if (options.includes('shuffled')){
            const shuffled = shuffle(intFlat.slice())

            const shuffledFlat = shuffled.map((d, i) => {
                const row = ~~ (i / colNum)
                const binNum = i - (colNum * row)
                const newX0 = binnedData[binNum].x0
                return {
                    ...d,
                    index: row,
                    binStart: newX0
                }
            })

            exportFlat = shuffledFlat.sort((a, b) => ascending(a.id, b.id))

        } 

        return exportFlat;

    }

    function generateLineData(binnedFiltered, binnedAll){
        const filterLimited = binnedFiltered.map(d => ({
            ...d,
            x0: d.x0,
            count: d.length,
            percent: d.length / filteredData.length
        }))

        const allLimited = binnedAll.map(d => ({
            x0: d.x0,
            count: d.length,
            percent: d.length / data.length
        }))

        return filterLimited.map((d, i) => ({
            ...d, 
            allCount: Math.round(allLimited[i].percent * (filteredData.length)),
            difference: Math.round(allLimited[i].percent * (filteredData.length)) - d.count
        }))
    }

    let flattenedData;
    let lineData;
    $: colNum = Math.round((width - margins.right - margins.left) / ((blockPadding * 2) + blockWidth))

    $: if (colNum) {
        // trigger update when options updates
        let _ = options;

        // bin filtered data
        let lightBin = bin()
            .thresholds((filteredData, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
            .domain([0.15, 0.99])
            .value(d => +d.lightness)

        let binnedFiltered = lightBin(filteredData);
        let binnedAll = lightBin(data);

        // flatten data
        flattenedData = flattenBins(binnedFiltered, colNum)

        const largestBin = greatest(binnedFiltered.map(d => (d.length)))
        const newHeight = (width / largestBin) - blockPadding
        const testHeight = (totalHeight/largestBin) - blockPadding
        const preferredHeight = blockWidth / 3

        blockHeight = Math.floor(Math.max(2, Math.min(testHeight, preferredHeight)))

        lineData = options.includes('line') ? generateLineData(binnedFiltered, binnedAll) : [];
    }
   
    
    
</script>    
{#if flattenedData && mounted}
<div class='lc-container' bind:clientHeight={totalHeight}>

        <LayerCake data={flattenedData} x={d => d.lightness}
            xDomain={[0.15, 0.99]}> 

            <Interactive {options} {blockDimensions} {lineData} {id}/>
        </LayerCake>


</div>
    {/if}
<style>
    .lc-container{
        position: relative;
        height: 90%;
        min-height: 200px;
    }


</style>