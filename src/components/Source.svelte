<script>
    import DataDownload from './DataDownload.svelte'
    import { onMount } from 'svelte'

    export let data;
    export let title;

    let mounted = false;

    onMount(() => {mounted = true})


</script>

<div class='container'>
    <div>
        <p><strong>Source: The Pudding</strong></p>
    </div>
    {#if mounted}
        <DataDownload {data} {title} />  
    {/if}
</div>

<style>
    .container {
        display: flex;
        color: var(--gray-text);
        font-size: 0.8em;
        font-family: 'National 2 Narrow Web';
        align-items: baseline;
    }

    p {
        margin: 0.5em 1em 0 0;
    }

    a {
        color: var(--gray-text);
        font-weight: 400;
    }
</style>