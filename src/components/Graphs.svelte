<script>
    import Histogram from "./Histogram.svelte"
    import { LayerCake} from "layercake";
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { extent, range, bin, groups, ascending } from 'd3-array'
    import data from "../data/sephora_export.csv"

    export let prose;
    let maxCol = 10;


    // figure out which bin each shade goes in
    $: lightBin = bin().thresholds(maxCol).domain([0, 1]).value(d => d.lightness)


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
</script>



{#each prose as {sub, text}}
    <h3>{sub}</h3>
    <p class='prose'>{text}</p>
    <div class='chart-container'>
        <LayerCake data={filterData(sub)}>
            <Histogram />
        </LayerCake>
    </div>
    
{/each}

<style>
    h3 {
        text-transform: uppercase;
        text-align: center;
        font-weight: bold;
    }
</style>