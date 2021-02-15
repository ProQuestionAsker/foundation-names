<script>
    import { flatten, LayerCake } from "layercake";
    import { onMount } from "svelte";
    import Interactive from "./Interactive.svelte";
    import { bin, shuffle, range, ascending } from 'd3-array'

    export let data;
    export let filteredData;
    let blockWidth = 20;
    $: blockHeight = Math.ceil(blockWidth / 3);
    let blockPadding = 2;
    let totalWidth;
    export let options = [];

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
        console.log({binnedData})

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
        console.log({options})

        return exportFlat;

    }

    let flattenedData;
    $: colNum = Math.round((totalWidth - margins.right - margins.left) / ((blockPadding * 2) + blockWidth))

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

        console.log({colNum, filteredData, binnedFiltered})
        // data for annotations
        let annData = options.includes('annotations') ? findDifferences(binnedFiltered, binnedAll) : [];


        // flatten data
        flattenedData = flattenBins(binnedFiltered, colNum)
    }
   
    
    
</script>

<div class='lc-container' bind:clientWidth={totalWidth}>
    {#if flattenedData}
        <LayerCake data={flattenedData} x={d => d.lightness}
            xDomain={[0.15, 0.99]}> 

            <Interactive {options} {blockDimensions}/>
        </LayerCake>
    {/if}

</div>

<style>
    .lc-container{
        height: 40vh;
    }
</style>