<script>
    import {flatten, LayerCake} from 'layercake'
    import Mini from './Mini.svelte'
    import MiniCat from './MiniCat.svelte'

    export let data;
    export let type;

    $: flatterData = flatten(data);
    $: flatData = flatten(flatterData)

</script>

     <LayerCake {data}
        x = {d => +d.percent} 
        xDomain = {type === 'byShade' ? [0, 100]: [0, 60]}
        {flatData}>
        {#if type === 'byShade'}
            <Mini />
        {:else}
            <MiniCat />
        {/if}

    </LayerCake> 