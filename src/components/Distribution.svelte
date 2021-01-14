<script>
    import data from "../data/sephora_export.csv"
    import { LayerCake} from "layercake";
    import Mini from './Mini.svelte'
    import { extent, range, bin, groups, ascending } from 'd3-array'

    let maxCol = 10;


    // figure out which bin each shade goes in
    $: lightBin = bin().thresholds(maxCol).domain([0, 1]).value(d => d.lightness)

    let condensedData = []
    $: lightBin(data.filter(d => d.category !== 'NA')).forEach(bin => {
            if (bin.length > 0){
                const sorted = bin.sort((a,b) => ascending(a.category, b.category) )
                condensedData.push({length: sorted.length, groups: groups(sorted, d => d.category)}) 
            } else condensedData.push({groups: []})
        })

    $: console.log({condensedData})

</script>

<div class='chart-container'>
    <LayerCake data={condensedData}
    x = {d => Math.round((d[1].length / d.length) * 100)} 
    xDomain = {[0, 100]}>
        <Mini />
    </LayerCake>
</div>