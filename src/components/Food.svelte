<script>
    import data from "../data/shades_export.csv"
    import SwatchHistogram from "./SwatchHistogram.svelte"
    import Gradient from "./Gradient.svelte"
    import GradientAnnotation from "./GradientAnnotation.svelte"
    import { LayerCake, Canvas, Svg } from "layercake";
    import Switch from "./Switch.svelte"

    let switchValue = {food: 'varied', drink: 'varied'}

    const xKey = 'lightness'

    //$: filteredData = data.filter(d => d.category === 'food').filter(d => switchValue === 'varied' ? d.namingScheme === 'variety' : d.namingScheme === 'NA' )

    const sections = ['drink', 'food']

    function filterData(sectionName){
        const cat = data.filter(d => d.category === sectionName)
        const scheme = cat.filter(d => switchValue[sectionName] === 'varied' ? 
            d.namingScheme === 'variety' : d.namingScheme === 'NA') 
            console.log({cat, scheme, switchValue, sectionName})
        return cat
    }

 $: switchValue.food, filterData('food')
 $: switchValue.drink, filterData('drink')
   
</script>

<h2>Food and Drink</h2>
{#each sections as sectionLabel}
    <div class='container'>
        <h3>Shades with {sectionLabel} Items in the name</h3>
        <div class='chart-container container-hist'>
            <!-- <Switch bind:value={switchValue[sectionLabel]} label="Choose a naming scheme" design="multi" options={['consistent', 'varied']}  /> -->
            <LayerCake data={filterData(sectionLabel)} x = {d => d.lightness}
                padding={ { top: 20, right: 20, bottom: 20, left: 20 } }
                xDomain = {[0.15, 0.99]}>
                <Canvas>
                    <Gradient /> 
                </Canvas>
                <Canvas class="hist">
                    <SwatchHistogram blockWidth={20}/>
                </Canvas>
            </LayerCake>
        </div>

    </div>
{/each}



<style>
    .chart-container{
        height: 1000px;
    }
</style>