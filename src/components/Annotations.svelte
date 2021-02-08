<script>
    export let annotations;
</script>

{#each annotations as annotation}
<div style="left: {annotation.x - 175}px; top: {annotation.y}px" >
    <p>{@html annotation.text}</p>
</div>
{/each}

<style>
    div {
        max-width: 175px;
        position: relative;
    }
    p {
        text-align: center;
        font-size: 12px;
        position: absolute
    }
</style>