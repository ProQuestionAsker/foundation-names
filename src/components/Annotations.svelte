<script>
  import { setContext, onMount, getContext } from 'svelte';

    const vals = ['top', 'right', 'bottom', 'left'];

    export let container = undefined;
    export let annotations = [];
    let mounted = false;

    $: if (mounted) setContext('annotation-els', Array.from(container.querySelectorAll('.layercake-annotation')));

    onMount(() => {
        mounted = true;
    });

</script>

<div class='layercake-annotations' bind:this={container}>
    {#each annotations as d, i}
        <div class='annotation annotation-bg'
        style="top:{d.coordinates[0].y - 50}px; left:{d.coordinates[0].x}px">{d.text}</div>
        <div class='annotation layercake-annotation'
        style="top:{d.coordinates[0].y - 50}px; left:{d.coordinates[0].x}px">{d.text}</div>
    {/each}
</div>

<!-- {#each annotations as annotation}
<div style="left: {annotation.x - 175}px; top: {annotation.y}px" >
    <p>{@html annotation.text}</p>
</div>
{/each} -->

<style>
    .layercake-annotations {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .annotation {
        text-align: center;
        font-size: 14px;
        position: absolute;
    }

    .annotation-bg{
        font-weight: bold;
        color: var(--bg)
    }
</style>