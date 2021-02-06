<script>
  import Meta from "./Meta.svelte";
  import Intro from "./Intro.svelte";
  import Demo from "./demo/Demo.svelte";
  import Header from "./pudding/Header.svelte";
  import Footer from "./pudding/Footer.svelte";
  import Graphs from "./Graphs.svelte";
  import copy from "../data/copy.json";
  import Distribution from "./Distribution.svelte"
import GradientHistogram from "./GradientHistogram.svelte";
  import Nude from "./Nude.svelte"
  import Food from "./Food.svelte"
  import Explore from "./Explore.svelte"

let scrollytelling;
$: console.log({scrollytelling})
</script>
<Meta />



  <Header bind:state={scrollytelling}/>

<article>
<Intro />

<!-- <Distribution /> -->

<!-- 
<h2>Names of Shades by Category and arranged by lightness of color</h2>
  {#each copy.story as section, i}
  <section id="section-{i}">
    <Graphs prose="{section.prose}" />
  </section>
{/each} -->

<Nude state = {scrollytelling}/>
<!-- <Food /> -->
<Explore />


</article>







<Footer />

<style>




</style>
