<script>
    import data from "../data/shades_export.csv"
    import { LayerCake, flatten } from "layercake";
    import Mini from './Mini.svelte'
    import { extent, range, bin, groups, ascending, rollups } from 'd3-array'
    import SmallMultContainer from "./SmallMultContainer.svelte"

    let maxCol = 10;

    $: console.log({data})


    // figure out which bin each shade goes in
    $: lightBin = bin().thresholds(maxCol).domain([0, 1]).value(d => d.lightness)

    function findPercent(group){
       return group[1].map(g => ({
           ...g,
           percent: g.length / group[0].length
       }))
    }

    let condensedData = []
    $: lightBin(data.filter(d => d.category !== 'NA')).forEach((bin, i) => {
            if (bin.length > 0){
                const sorted = bin.sort((a,b) => ascending(a.category, b.category))
                const roll = rollups(sorted, v => v.length, d => d.category).map(d => ({
                    category: d[0],
                    count: d[1],
                    percent: Math.round(d[1] / sorted.length * 100),
                    hex: sorted[0].hex, 
                    group: i
                }))
 
                condensedData.push(roll) 
            } else condensedData.push([])
        })


    $: flatterData = flatten(condensedData)
 
    $: flatData = flatten(flatterData)

    $: categories = groups(flatData, d => d.category)
    $: catData = [];


    $: categories.forEach(cat => {
            const filledIn = range(0, 10).map(i => {
                const val = cat[1]
                const matched = val.filter(d => d.group === i + 1)
                return matched.length === 0 ? { group: i + 1, percent: 0} : matched[0];
            })
            catData.push({category: cat[0], values: filledIn})
        })
            


</script>

<section>
    <p>I found approximately 9 naming categories used. The most common (not shown but used for 24% of shade names) is to just use a number or letter system. Of the naming systems that use words, these are the categories:</p>
<ul>
    <li><strong>Color</strong>: Using a word that is known to refer to a specific color (e.g., "brown", "beige", "yellow" etc.)</li>
    <li><strong>Descriptor</strong>: These are words used alone that typically act as adjectives (e.g., "light", "dark" etc.)</li>
    <li><strong>Drink</strong>: Colors that refer to beverages or other liquids (e.g., "espresso", "rum", "tea", "milk" etc.)</li>
    <li><strong>Food</strong>: Colors that refer to foods (e.g., "custard", "praline", "truffle" etc.)</li>
    <li><strong>Rock</strong>: Colors that refer to rocks, gemstones, or other geological or natural structures (e.g., "sand", "ivory", "amber", "alabaster" etc.)</li>
    <li><strong>Skin</strong>: These are words that are often used as synonyms for skin or nudity (e.g., "nude", "natural", "tan" etc.)</li>
    <li><strong>Wood</strong>: These are words that are most commonly used in reference to wood or other plants (e.g., "mahogany", "hazel", "oak" etc.)</li>
    <li><strong>Misc.</strong>: These are words that didn't seem to fall into any other category (e.g., "copper", "dusk", "unstoppable", "suede" etc.</li>
</ul>



<div class='chart-container'>
    <h2>Naming Category Distribution by Foundation Shade</h2>
    {#each condensedData as data}
        <div class='mini-container'>
            <SmallMultContainer {data} type = "byShade"/>
        </div>
    {/each}
</div>


    <h2>Percent of Total Shades in Each Lightness Range by Category</h2>
<div class='chart-container'>

    {#each catData as data}
        <div class='cat-container'>
            <SmallMultContainer {data} type = "byCat"/>
        </div>
    {/each}
</div>
</section>

<style>

    section {
        margin: 1rem;
    }

    .chart-container {
        display: flex;
        flex-wrap: wrap;
        
    }

    .mini-container {
        max-width: 40%;
        width: 40%;
        border: 1px solid #000;
        margin: 1em;
        padding: 0.5em;
    }

    .cat-container{
        max-width: 30%;
        width: 30%;
        border: 1px solid #000;
        margin: 1em;
        padding: 0.5em;
    }
</style>