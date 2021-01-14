<script>
    // Import the getContext function from svelte
    import { getContext } from 'svelte';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x } = getContext('LayerCake');

    console.log({x})
</script>   

<div class='histogram__container'>
    {#each $data as d, i}
    <div class='mini'>
        {#each d.groups as e, i}
        <div class='container'>
            <p class='category'>{e[0]}</p>
            <div class='bar' style="width:{x(e)}px"></div>
            <p class='percent'>{Math.round((e[1].length / d.length) * 100)}%</p>
        </div>
        
        {/each}
    </div>
    {/each}
</div>

<style>
    .histogram__container {
        display: flex;
        flex-wrap: wrap;
    }
    .mini {
        display: flex;
        flex-direction: column;
        margin-top: 2em;
        border: 1px solid #000;
        padding: 1rem;
        width: 40%;
    }

    .container {
        display: flex; 
        flex-direction: row;
    }

    p {
        margin: 0.5em 0;
    }
</style>