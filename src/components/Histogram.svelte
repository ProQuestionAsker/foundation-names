<script>
    // Import the getContext function from svelte
    import { getContext } from 'svelte';
    import Column from "./Column.svelte"

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data } = getContext('LayerCake');

</script>

<div class='histogram__container'>
    {#each $data as d, i}
        <Column group = {d} />
    {/each}
</div>

<style>
    .histogram__container{
        display: flex;
        flex-direction: row-reverse;
    }
</style>

