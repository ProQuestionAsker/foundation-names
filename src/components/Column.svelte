<script>
    export let group;

</script>

<div class='histogram__column'>
    {#each group as d, i}
        <p class='shade' style="color:{d.hex}; outline:#000">{d.name}</p>
    {/each}
</div>

<style>
    .histogram__column {
        width: 10em;
        margin-right: 0.5em;
    }


</style>