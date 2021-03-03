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

    function findLeft(d){
        const dx = d.textDx ? d.textDx : 0
        return d.coordinates[0].x + dx
    }

</script>

<div class='layercake-annotations' bind:this={container}>
    {#each annotations as d, i}
        <div class='annotation annotation-bg'
        style="top:{d.coordinates[0].y - d.dy}px; left:{findLeft(d)}px; text-align:{d.mobile ? d.mobile : 'center'}">{@html d.text}</div>
        <div class='annotation layercake-annotation'
        style="top:{d.coordinates[0].y - d.dy}px; left:{findLeft(d)}px; text-align:{d.mobile ? d.mobile : 'center'}">{@html d.text}</div>
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
        padding: 0.25rem;
    }
    .annotation {
        font-size: 14px;
        position: absolute;
        max-width: 200px;
        transform: translate(-50%, -5px)
    }

    @media screen and (max-width: 500px) {
        .annotation {
            font-size: 12px;
            max-width: 150px;
        }
    }

    .annotation-bg{
        font-weight: bold;
        color: var(--bg)
    }

    :global(.anno-all){
        font-weight: bold;
        color: var(--gray);
    }

    :global(.anno-nude){
        font-weight: bold;
        color: var(--accent-color)
    }
    :global(.annotation-bg span) {
        color: var(--bg)
    }
</style>