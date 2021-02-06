<script>
    import Icon from "./helpers/Icon.svelte"

    export let headers;
    export let rows;
    export let perPage;

    $: totalRows = rows.length
    $: currentPage = 0
    $: start =  currentPage * perPage + 1
    $: end = start + perPage - 1;
    $: totalPages = Math.ceil(totalRows / perPage)

    $: trimmedRows = rows.slice(start, end)

    $: totalRows, currentPage = 0
    $: currentPage, start, end


</script>

<div>
    <table>
    <tbody>
        <tr>
            {#each headers as header}
                <th>{header}</th>
            {/each}
        </tr>

        {#each trimmedRows as row (row)}
            <tr>
                {#each row as column}
                    <td>{column}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
    {#if totalRows > perPage}
        <div class='pagination'>
            <button on:click={() => currentPage -= 1} 
                disabled={currentPage === 0 ? true : false} 
                aria-label="left arrow icon" 
                aria-describedby="prev">
                    <Icon name = 'chevron-left' />
            </button>
            <span id='prev' class='sr-only'>Load previous {perPage} rows</span>
            <p>{start} - {end} of {totalRows}</p>
            <button on:click={() => currentPage += 1} 
                disabled={currentPage === totalPages ? true : false} 
                aria-label="right arrow icon" 
                aria-describedby="next">
                <Icon name = 'chevron-right' />
            </button>
            <span id='next' class='sr-only'>Load next {perPage} rows</span>
        </div>
    {/if}
</div>


<style>
    .sr-only {
      position: absolute;
      clip: rect(1px, 1px, 1px, 1px);
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
    }
    
    .pagination {
        display: flex;
        align-items: center;
    }

    .pagination p {
        margin: 0 1rem;
    }

    td {
        white-space: nowrap;
        overflow: hidden;
    }

</style>