<script>
    import {ascending} from 'd3-array'
    export let data;

    $: values = data[1].sort((a, b) => ascending(+a.numbers, +b.numbers))
    $: labelValues = [0, Math.ceil((values.length - 1) / 2), values.length - 1]
    $: brand = values[0].brand
    $: product = values[0].product
    $: lightToDark = values[0].lightToDark === 'TRUE' ? 'lightest to darkest' : 'darkest to lightest' 
</script>

<figure >
    <div class='container'>
        <p class='brand' aria-hidden="true">{brand}</p>
        <p class='sub' aria-hidden="true">{product}</p>
        <div class='swatch-container' role = 'img' aria-label="Colored stripes of {brand}'s {product} sequentially numbered foundation where {values.length} shades go from {lightToDark}">
            {#each values as swatch, i}
            <div class='single-swatch'>
                <div class='swatch' style="background-color:{swatch.hex}"></div>
                {#if labelValues.includes(+i)}
                    <div class='line-label'></div>
                    <p class='swatch-label'>{swatch.specific}</p>
                {/if}
            </div>
            {/each}
        </div>

    </div>
    
</figure>

<style>
    figure {
        flex: 1 1 0;
    }

    .brand {
        font-weight: bold;
        margin-bottom: 0.25rem;
    }
    .sub {
        color: var(--gray);
        margin-top: 0;
        font-size: 14px;
    }
    .container {
        margin-bottom: 3rem;
        flex: 1 1 0px;
    }
    .swatch-container {
        display: flex;
        position: relative;
    }
    .single-swatch{
        margin-right: 3px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .swatch {
        width: 5px;
        min-width: 5px;
        height: 20px;
        border-radius: 4px;
    }
    .swatch-label {
        position: absolute;
        text-align: center;
        font-size: 12px;
        color: var(--gray);
        margin: 0;
        top: 25px;
    }
    .line-label {
        width: 1px;
        height: 5px;
        margin-top: 2px;
        background-color: var(--gray);
        align-self: center;
    }
</style>