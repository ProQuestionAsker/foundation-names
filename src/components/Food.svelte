<script>
    import data from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import Line from "./Line.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import Switch from "./Switch.svelte"
    import Interactive from "./Interactive.svelte"
    import copy from "../data/copy.json";



    const xKey = 'lightness'
    const blockWidth = 20;
    $: blockHeight = blockWidth / 4;

    //$: filteredData = data.filter(d => d.category === 'food').filter(d => switchValue === 'varied' ? d.namingScheme === 'variety' : d.namingScheme === 'NA' )

    const sections = ['drink', 'food']

    function filterData(sectionName){
        const cat = data.filter(d => d.category === sectionName)
 
        return cat
    }

    


   
</script>

<section>
<div class='divider-text'>
    <h3 class='section-hed'>Food and Drink</h3>
</div>

{#each copy.foodIntro as {type, value}}
    <p class='prose'>{value}</p>
{/each}

{#each sections as sectionLabel (sectionLabel)}
    <div class='container'>
        <h4>Shades with {sectionLabel} Items in the name</h4>
        <div class='chart-container container-hist'>
            <LayerCake data={filterData(sectionLabel)} x = {d => d.lightness}
                padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
                xDomain = {[0.15, 0.99]}>
                        
                <Interactive step = {'majority'} allData = {data} {blockWidth} {blockHeight}/>
            </LayerCake>
            <!-- <LayerCake data={filterData(sectionLabel)} x = {d => d.lightness}
                padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
                xDomain = {[0.15, 0.99]}>
                <Canvas>
                    <Gradient /> 
                </Canvas>
                <Canvas class="hist">
                    <SwatchHistogram blockWidth={20} />
                </Canvas>
                <Svg zIndex={3}>            
                     <Line allData = {data} blockWidth = {20} step="compare"/> 
                </Svg>
            </LayerCake> -->
        </div>

    </div>

    {#each copy[sectionLabel] as {type, value}}
    <p class='prose'>{value}</p>
    {/each}
{/each}


</section>




<style>
    .chart-container{
        height: 600px;
        max-width: 50rem;
        margin: 0 auto 5rem auto;
    }

    h4 {
        font-size: 24px;
        font-weight: bold;
        text-align: center;
    }
</style>