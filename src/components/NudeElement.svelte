<script>
    import data from "../data/nude_export.csv"
    import allData from "../data/shades_export.csv"
    import InteractiveWrapper from "./InteractiveWrapper.svelte"
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
        if (step === 'natural') options = ['gradient', 'majority', 'natural']
    }

    $: title = `${filteredData.length} shades with "${filterValue}" in the name`

</script>

<InteractiveWrapper {title} {filteredData} {allData} {options} />

