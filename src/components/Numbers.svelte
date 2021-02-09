<script>
    import NumberDistribution from "./NumberDistribution.svelte"
    import data from "../data/numbers_export.csv"
    import { groups } from 'd3-array'

    const baselineIDs = [94, 13]

    $: baseline = groups(data.filter(d => baselineIDs.includes(+d.id)), d => d.id)
    $: darkToLight = groups(data.filter(d => d.lightToDark === 'FALSE'), d => d.id)

    $: console.log({baseline, darkToLight})
</script>

<section>
    {#each baseline as product}
        <NumberDistribution data={product} />
    {/each}

    <p>TK text here separating the sections</p>

    {#each darkToLight as product}
        <NumberDistribution data={product} />
    {/each}
</section>

<style>
    section {
        max-width: 50rem;  
        margin: 0 auto;
    }

</style>