<script>
    export let group;

</script>

<div class='histogram__column'>
    {#each group as d, i}
        <p class='shade' style="color:{d[1][0].hex}" >{d[0]}</p>
    {/each}
</div>

<style>
    .histogram__column {
        width: 10em;
        margin-right: 0.5em;
    }

    .shade {
        margin: 0.05em 0;
    }

</style>