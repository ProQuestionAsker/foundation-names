<script>
    // Import the getContext function from svelte
    import { getContext } from 'svelte';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, x, xGet, xScale } = getContext('LayerCake');
</script>   


        <div class='container'>
            <p class='category'>{$data.category}</p>
            {#each $data.values as d}
            <div class='bar-container'>
                
                    <div class='bar' style="width:{$xGet(d)}px; background-color:{d.hex}"></div> 
                    <p class='percent'>{d.percent}%</p>
                
            </div>
{/each}

        </div> 
    
 


<style>

    .container {
        display: flex;
        flex-direction: column;
    }


    .bar-container {
        display: flex; 
        flex-direction: row;
        align-items: center;
        position: relative;
    }

    .bar {
        height: 1em;
        margin: 0 0.4em;
    }

    p {
        margin: 0;
    }

    .category {
        width: 30%;
        min-width: 30%;
        text-align: left;
        text-transform: uppercase;
        margin: 0.2em 0.4em;
    }

    .percent {
        font-size: small;
        color: gray;
    }
</style>