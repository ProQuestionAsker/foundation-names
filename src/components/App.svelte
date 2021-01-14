<script>
  import Meta from "./Meta.svelte";
  import Intro from "./Intro.svelte";
  import Demo from "./demo/Demo.svelte";
  import Header from "./pudding/Header.svelte";
  import Footer from "./pudding/Footer.svelte";
  import Graphs from "./Graphs.svelte";
  import copy from "../data/copy.json";

</script>

<Meta />

<Header />

<article>
<Intro />
  {#each copy.story as section, i}
  <section id="section-{i}">
    <Graphs prose="{section.prose}" />
  </section>
{/each}
</article>


<Footer />

<style>
  section {
    padding: 0 1rem;
  }
</style>
