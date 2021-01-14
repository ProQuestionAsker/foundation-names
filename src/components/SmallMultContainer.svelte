<script>
    import {flatten, LayerCake} from 'layercake'
    import Mini from './Mini.svelte'

    export let data;

    $: flatterData = flatten(data);
    $: flatData = flatten(flatterData)

</script>

     <LayerCake {data}
        x = {d => +d.percent} 
        xDomain = {[0, 100]}
        {flatData}>
        <Mini />
    </LayerCake> 