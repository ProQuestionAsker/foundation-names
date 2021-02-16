<script>
    import data from "../data/nude_export.csv"
    import allData from "../data/shades_export.csv"
    import InteractiveParent from "./InteractiveParent.svelte"

    export let step;

    $: filterValue = step === 'natural' ? 'natural' : 'nude'
    $: filteredData = data.filter(d => d.namingScheme === filterValue)

    let options;

    $: {
        if (step === 'all') options = ['shuffled'];
        if (step === 'sort') options = ['histogram', 'gradient']
        if (step === 'majority') options = ['histogram', 'gradient', 'majority']
        if (step === 'distribution') options = ['gradient', 'majority', 'line']
        if (step === 'compare') options = ['gradient', 'majority', 'line', 'allLine']
        if (step === 'nudestix') options = ['histogram', 'gradient', 'majority', 'nudestix']
        if (step === 'highlight') options = ['histogram', 'gradient', 'majority', 'highlight']  
        if (step === 'natural') options = ['histogram', 'gradient', 'majority', 'natural']
    }

</script>

<div class='container'>
    <p class='chart-title'>{filteredData.length} Shades with "{filterValue}" in the name</p>

    <InteractiveParent {filteredData} data = {allData} {options}/>
</div>


<style>
    .chart-title {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }
</style>