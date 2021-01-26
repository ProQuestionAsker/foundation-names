<script>
    import Histogram from "./Histogram.svelte"
    import GradientHistogram from "./GradientHistogram.svelte"
    import { LayerCake, Canvas } from "layercake";
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { extent, range, bin, groups, ascending, rollups, descending } from 'd3-array'
    import data from "../data/shades_export.csv"

    export let prose;
    let maxCol = 10;


    // figure out which bin each shade goes in
    $: lightBin = bin().thresholds(maxCol).domain([0, 1]).value(d => d.lightness)

    $: filteredData = data.filter(d => d.base !== ("NA")).filter(d => d.base !== "")


    $: allBinData = lightBin(filteredData)

    $: top = []
    $: allBinData.forEach(bin => {
       const groups = rollups(bin, v => v.length, d => d.name).sort((a, b) => descending(a[1], b[1])).slice(0,5)
        top.push(groups)
    })


    function filterData(cut){
        let binnedData = null;
        if (cut === 'numbers') binnedData = lightBin(data.filter(d => d.category === 'NA'))
        else if (cut === 'rock') binnedData = lightBin(data.filter(d => d.category === 'rock' || d.category === 'gem'))
        else if (cut === 'wood') binnedData = lightBin(data.filter(d => d.category === 'wood' || d.category === 'plant'))
        else binnedData = lightBin(data.filter(d => d.category === cut))

        // condense multiple instances of a single name into one
        let condensedData = []
        binnedData.forEach(bin => {
            if (bin.length > 0){
                const sorted = bin.sort((a,b) => ascending(a.name, b.name) )
                condensedData.push(groups(sorted, d => d.name)) 
            } else condensedData.push([])
        })

        return condensedData;
    }

    function filterFlat(cut){
        if (cut === 'numbers') return data.filter(d => d.category === 'NA')
        else return data.filter(d => d.category === cut)
    }
</script>



{#each prose as {sub, text}}
    <h3>{sub}</h3>
    <!-- <p class='prose'>{text}</p>
    <div class='chart-container'>
        <LayerCake data={filterData(sub)}>
            <Histogram />
        </LayerCake>
    </div> -->

    <div class='chart-container container-grad'>
        <LayerCake data={filterFlat(sub)}>
            <Canvas>
                <GradientHistogram />
            </Canvas>

        </LayerCake>
    </div>
    
{/each}

<style>
    h3 {
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
        margin-top: 3em;
    }

    p {
        text-align: center;
    }

    .container-grad {
        height: 300px;
    }
</style>