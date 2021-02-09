<script>
    export let data;

    $: values = data[1]
    $: labelValues = [0, Math.ceil((values.length - 1) / 2), values.length - 1]
    $: console.log({test: labelValues.includes(34)})
</script>

<figure>
    <div class='container'>
        <h3>{values[0].brand}</h3>
        <h4>{values[0].product}</h4>
        <div class='swatch-container'>
            {#each values as swatch, i}
            <div class='single-swatch'>
                <div class='swatch' style="background-color:{swatch.hex}"></div>
                {#if labelValues.includes(+i)}
                    <p class='swatch-label'>{swatch.specific}</p>
                {/if}
            </div>
            {/each}
        </div>

    </div>
    
</figure>

<style>
    h3 {
        font-weight: bold;
        margin-bottom: 0.25rem;
    }
    h4 {
        color: var(--gray);
        margin-top: 0;
    }
    .container {
        width: 400px;
        margin-bottom: 3rem;
    }
    .swatch-container {
        display: flex;
 
    }
    .single-swatch{
        margin-right: 2px;
        overflow: auto;
    }
    .swatch {
        width: 7px;
        height: 20px;
    }
    .swatch-label {
        position: absolute;
        text-align: center;
        font-size: 12px;
        color: var(--gray);
        margin: 0;
    }
</style>