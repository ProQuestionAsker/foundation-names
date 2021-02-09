<script>
    import NumberDistribution from "./NumberDistribution.svelte"
    import data from "../data/numbers_export.csv"
    import copy from "../data/copy.json";
    import { groups } from 'd3-array'

    const baselineIDs = [94, 13]

    $: baseline = groups(data.filter(d => baselineIDs.includes(+d.id)), d => d.id)
    $: darkToLight = groups(data.filter(d => d.lightToDark === 'FALSE'), d => d.id)

    $: console.log({copy})
</script>

<section>   
     <div class='container'>
        {#each baseline as product}
            <NumberDistribution data={product} />
        {/each}
    </div>

    <p class='prose'>{copy.darkToLight[0].value}</p>

    <div class='container'>
        {#each darkToLight as product}
            <NumberDistribution data={product} />
        {/each}
    </div>

</section>

<style>
    section {
        max-width: 50rem;  
        margin: 0 auto;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
    }

</style>