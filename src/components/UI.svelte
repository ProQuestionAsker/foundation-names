<script>
    import Checkbox from "./Checkbox.svelte"
    import Radio from "./Radio.svelte"

    export let UIOptions = [];
    export let id;
    $: console.log({UIOptions, id})

    let brandSel;
    let categorySel;
    export let radioValue = 'swatches';

</script>

<div class='ui-elements'>
    <!-- {#if UIOptions.includes('dropdown')}
        <div class='select-group'>
            <div>
                <label for="brandSelect">Filter data by brand</label>
                <select id="brandSelect" 
                    bind:value={brandSel} on:blur="{() => filterData()}">
                    {#each allBrands as brand}
                        <option>{brand}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="categorySelect">Filter by name category</label>
                <select id="categorySelect" bind:value={categorySel} on:blur="{() => filterData()}">
                    {#each allCategories as category}
                        <option>{category}</option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}     -->
           
        {#if radioValue === 'swatches'}
            <Checkbox checks = {[{name: 'all', label: 'Compare to all shades', selected: 'false'}]} />
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
</div>


<style>
    .ui-elements {
        pointer-events: all;
    }
</style>