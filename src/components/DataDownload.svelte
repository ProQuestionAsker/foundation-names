<script>
    import {csvFormat} from 'd3-dsv'

    export let data;
    export let title;

    $: formatted = csvFormat(data)
    $: blob = new Blob([formatted], { type: 'text/csv;charset=utf-8;' });
    $: filename = title;
    $: url = URL.createObjectURL(blob);

    $: console.table({formatted})
</script>

<a href={url} download={filename}>Download the data</a>

<style>
    a {
        color: var(--gray-text);
        font-family: 'National 2 Narrow Web'
    }
</style>