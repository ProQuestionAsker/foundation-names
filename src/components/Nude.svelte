<script>
    export let state = "on";

</script>

{#if state === "on"}
<p>we're on</p>
{:else}
<p>we're off</p>
{/if}