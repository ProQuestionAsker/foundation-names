<script>
    import Histogram from "./Histogram.svelte"
    import { LayerCake} from "layercake";
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { extent, range, bin } from 'd3-array'
    import data from "../data/sephora_export.csv"

    export let prose;
    let maxCol = 10;


    // figure out which bin each shade goes in
    $: lightBin = bin().thresholds(maxCol).domain([0, 1]).value(d => d.lightness)


    function filterData(cut){
        if (cut === 'numbers') return lightBin(data.filter(d => d.category === 'NA'))
        else if (cut === 'rock') return lightBin(data.filter(d => d.category === 'rock' || d.category === 'gem'))
        else return lightBin(data.filter(d => d.category === cut))
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

