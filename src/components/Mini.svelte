<script>
    // Import the getContext function from svelte
    import { getContext } from 'svelte';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, xGet, xScale } = getContext('LayerCake');
</script>   

<div class='histogram__container'>
    {#each $data as d, i}
    <div class='mini'>
        {#each d as e, i}
        <div class='container'>
            <p class='category'>{e.category}</p>
            <div class='bar' style="width:{$xGet(e)}px; background-color:{e.hex}"></div> 
            <p class='percent'>{e.percent}%</p>
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
        margin: 2em 1em;
        border: 1px solid #000;
        padding: 1rem;
        width: 40%;
    }

    .container {
        display: flex; 
        flex-direction: row;
        align-items: center;
    }

    .bar {
        height: 1.5em;
        margin: 0 0.4em;
    }

    p {
        margin: 0.5em 0;
    }

    .category {
        width: 100px;
        text-align: right;
    }
</style>