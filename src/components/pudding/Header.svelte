<script>
  import wordmark from "../../svg/pudding/wordmark.svg";
  import Switch from "../Switch.svelte"

  export let state;
</script>

<header>
  <Switch label="Scrollytelling" design="slider" bind:value={state} />
  <div class="wordmark">
    <a href="https://pudding.cool">{@html wordmark}</a>
  </div>
</header>

<style>
  .wordmark {
    max-width: 10em;
    margin: 1em auto;
  }

  .wordmark a {
    border: none;
    color: var(--fg);
  }

  .wordmark a:hover {
    background-color: transparent;
  }
</style>
