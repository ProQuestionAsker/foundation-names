<script>
    // Import the getContext function from svelte
    import { getContext } from 'svelte';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, xGet, xScale } = getContext('LayerCake');
</script>   


        {#each $data as d, i}
        <div class='container'>
            <p class='category'>{d.category}</p>
            <div class='bar' style="width:{$xGet(d)}px; background-color:{d.hex}"></div> 
            <p class='percent'>{d.percent}%</p>
        </div>
        
        {/each}


<style>
 
    .container {
        display: flex; 
        flex-direction: row;
        align-items: center;
        position: relative;
    }

    .bar {
        height: 1.5em;
        margin: 0 0.4em;
    }

    p {
        margin: 0.5em 0;
    }

    .category {
        width: 30%;
        min-width: 30%;
        text-align: right;
    }
</style>