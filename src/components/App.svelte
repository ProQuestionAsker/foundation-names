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
  import data from "../data/shades_export.csv"


</script>
<Meta {copy}/>



<Header />
<article>
  <GridHed />


  <Numbers />
  <Nude />
  <Food {data} />
  <Explore {data} />
  <Conclusion />
  <Methods />


</article>





<Footer />

<style>




</style>
