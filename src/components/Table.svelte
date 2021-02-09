<script>
    import Icon from "./helpers/Icon.svelte"
    import { ascending, descending } from 'd3-array'

    export let headers;
    export let rows;
    export let perPage;

    $: totalRows = rows.length
    $: currentPage = 0
    $: start =  currentPage * perPage + 1
    $: end = start + perPage - 1;
    $: totalPages = Math.ceil(totalRows / perPage)

    $: sortStatus = [];
    $: sortDirection = 'ascending'

    function updateSortStatus(column, index){
        // reset all to "none"
        headers.forEach(d => {
            sortStatus[d] = "none"
        })

        sortDirection === 'ascending' ? sortDirection = 'descending' : sortDirection = 'ascending'
        sortStatus[column] = sortDirection
    }

    $: sortIcons = {'none' : {
        direction: 'e',
        icon: 'code'
    }, 'ascending' : {
        direction: 'n',
        icon: 'chevron-up'
    }, 'descending' : {
        direction: 'n',
        icon: 'chevron-down'
    }}

    $: headers.forEach(d => {
        sortStatus[d] = "none"
    })

    $: sortBy = 'none'

    $: sortedRows = rows

    $: if (sortBy !== 'none' && sortBy !== 4){
        if (sortDirection === 'ascending') sortedRows = rows.sort((a, b) => ascending(a[sortBy].toLowerCase(), b[sortBy].toLowerCase())) 
        else sortedRows = rows.sort((a, b) => descending(a[sortBy].toLowerCase(), b[sortBy].toLowerCase()) ) 
    }

    $: if (sortBy === 4){
        if (sortDirection === 'ascending') sortedRows = rows.sort((a, b) => ascending(a[sortBy], b[sortBy])) 
        else sortedRows = rows.sort((a, b) => descending(a[sortBy], b[sortBy]) ) 
    }

    $: trimmedRows = sortedRows.slice(start, end)

    $: console.log({trimmedRows, sortedRows})

    $: totalRows, currentPage = 0
    $: currentPage, start, end



</script>

<div>
    <table>
    <tbody>
        <tr>
            {#each headers as header, i (header)}
                <th aria-sort={sortStatus[header]}>
                    {header}
                    <button class={i === sortBy ? 'sort selected' : 'sort'} 
                        on:click="{() => {
                            sortBy = i
                            updateSortStatus(header, i)
                        }}"
                    >
                        <Icon name={sortIcons[sortStatus[header]].icon} direction={sortIcons[sortStatus[header]].direction}
                            stroke = {i === sortBy ? 'white' : 'gray'} />
                    </button>
                </th>
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
        justify-content: center;
    }

    .pagination p {
        margin: 0 1rem;
    }

    td {
        white-space: nowrap;
        overflow: hidden;
    }

    .selected {
        background-color: var(--accent-color)
    }

</style>