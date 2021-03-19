<script>
    import DataDownload from './DataDownload.svelte'

    export let data;
    export let title;


</script>

<div class='container'>
    <div>
        <p><strong>Source: <a href=https://pudding.cool>The Pudding</a></strong></p>
    </div>
    <DataDownload {data} {title} />  
</div>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        color: var(--gray-text);
        font-size: 0.8em;
        font-family: 'National 2 Narrow Web';
        align-items: center;
    }

    a {
        color: var(--gray-text);
        font-weight: 400;
    }
</style>