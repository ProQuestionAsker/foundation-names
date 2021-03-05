<script>
    import Checkbox from "./Checkbox.svelte"
    import Radio from "./Radio.svelte"

    export let UIOptions = [];
    export let id;

    export let brandSel;
    export let categorySel;
    export let radioValue = 'swatches';
    export let checkValue;
    export let allBrands;
    export let allCategories;



</script>

<div class='ui-elements'>


    <form >
        {#if UIOptions.includes('dropdown')}
            <fieldset class='select-group'>
                <div>
                    <label for="brandSelect">Filter by brand</label>
                    <select id="brandSelect" 
                        bind:value={brandSel}>
                        {#each allBrands as brand}
                            <option>{brand}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <label for="categorySelect">Filter by category</label>
                    <select id="categorySelect" bind:value={categorySel}>
                        {#each allCategories as category}
                            <option>{category}</option>
                        {/each}
                    </select>
                </div>
            </fieldset>
        {/if}    
 

        {#if UIOptions.includes('radio')}
                <Radio bind:value={radioValue}
                    options={[
                    {name: 'swatches', label: 'swatches'},
                    {name: 'names', label: 'names'},
                    {name: 'table', label: 'table'}
                    ]}
                legend="Show Me" {id} />
        {/if}        
        {#if radioValue === 'swatches'}
            <Checkbox bind:value={checkValue} {id} checks = {[{name: 'all', label: 'Compare to all shades', selected: 'false'}]} />
        {/if}
    </form>
           

</div>


<style>
    .ui-elements {
        pointer-events: all;
    }

    .select-group {
        display: flex;
    }

    .select-group div {
        flex: 1 1 0;
        width: 50%;
    }

    .select-group div select {
        width: 90%;
    }

    .select-group label {
        text-transform: uppercase;
        color: var(--gray);
    }

    fieldset {
        border: none;
    }
</style>