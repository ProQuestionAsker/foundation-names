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
  import Numbers from "./Numbers.svelte"
  import Conclusion from "./Conclusion.svelte"
  import Methods from "./Methods.svelte"
  import GridHed from "./GridHed.svelte"

  import {onMount} from 'svelte'

  let mounted = false;
  onMount(() => mounted = true)


</script>
<Meta {copy}/>



  <Header />

  {#if mounted}
<article>
  <GridHed />
<!-- <Intro /> -->

<Numbers />
<Nude />
<Food />
<Explore />
<Conclusion />
<Methods />

</article>
{/if}






<Footer />

<style>




</style>
