<script>
    // color rotation
    import { cubicInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte'
    import { scaleLinear } from 'd3-scale'
    import {interpolate, piecewise} from 'd3-interpolate'
    import copy from "../data/copy.json";


    const curatedColors = ["#5B3D33", "#66524C", "#A6634D", "#C38654", "#C99263", "#E59E71", "#E9B6A6", "#F4C591", "#FEEDDB", "#FFE3B5", "#412619", "#4B2C27", "#8C4529", "#8F452E", "#A47063", "#D89C6A", "#E5CDB8", "#EBC4AA", "#F5DCBA", "#FDDEC9"]

function gerateRandomColor(){
        const rand = Math.floor(Math.random() * colors.length) + 1  
        return colors[rand]
    }

const title = [...'NakedTruth']

    // const startColor = hsl(19.5, 0.46, 0.15)
    // const endColor = hsl(30, 0.5, 0.99)
    let mounted = false;

    onMount(() => mounted = true)

    function displayRandomHex(node, {duration, index}){
        const first = curatedColors[index]
        const second = curatedColors[index + 10]
        const interpolateColors = piecewise(interpolate, [first, second, '#282828'])
       console.log({first, second})
        return {
            duration,
            css: t => {
                return `color: ${interpolateColors(t)}`
            }
        }
    }

    function findGridArea(index){
        const numCount = index + 1
        const rowIndex = ~~(numCount / 6)
        const remainder = rowIndex === 0 ? numCount % 6 : (numCount % 6) + 1
        return `${rowIndex + 2} / ${remainder} / ${rowIndex + 3} / ${remainder + 1}` 
    }

</script>


<div class='grid-container'>
    <h1 class='sr-only'>{copy.title}</h1>
    <p class='sr-only'>{copy.dek}</p>

        <div aria-hidden="true" class='the'>The</div>

        {#each title as letter, i}
            <div aria-hidden="true" 
                in:displayRandomHex="{{duration: 5000, index: i}}" 
                class='large'
                style="grid-area:{findGridArea(i)}"
                >{letter}</div>
        {/each}

    <div class='meta'>
        <div class='meta-by'>
            <div class='author'>
                <p class='label'>Story by</p>
                <p class='byline'>{@html copy.storyBy}</p>  
            </div>

            <div class='author'>
                <p class='label'>Data & Code by</p>
                <p class='byline'>{@html copy.codeBy}</p>  
            </div>
            <time>March 2021</time>
        </div>
    </div>
    <div class='dek'>
        <p aria-hidden="true">{copy.dek}</p>
    </div>

    <div class="border1"></div>
    <div class="border2"></div>
</div>

<style>

.sr-only {
        position: absolute;
        clip: rect(1px, 1px, 1px, 1px);
        padding: 0;
        border: 0;
        height: 1px;
        width: 1px;
        overflow: hidden;
    }

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.2fr 0.8fr 0.8fr 1fr;
  gap: 0px 0px;
  line-height: 1.1;
  max-width: 1600px;
  margin: 0 auto 4rem;
  font-size: 16px;
}

.the {
    padding-top: 1rem;
     grid-area: 1 / 1 / 2 / 2; 
     text-transform: uppercase;
    text-align: center;
    font-size: 4.5em;
    font-family: 'Canela Web';
    font-weight: 300;
    color: var(--gray-dark);
}
.dek { 
    grid-area: 4 / 4 / 5 / 5; 
    font-family: 'National 2 Narrow Web';
    font-weight: 300;
    color: var(--gray-dark);
    text-transform: uppercase;
    font-size: 2.5em;
    text-align: center;
    padding: 0 0.5em; 
}

.dek > p {
    margin: 0;
    padding: 0;
}

.meta { 
    grid-area: 4 / 2 / 5 / 3; 
    font-family: 'National 2 Narrow Web';
    padding: 0 1em;
}

.author {
    margin-bottom: 1rem;
}
.author > .label {
    font-weight: bold;
}

.author > p {
    margin: 0;
    font-size: 1em;
}

time {
    font-weight: bold;
}
.border1 { 
    grid-area: 1 / 2 / 5 / 3; 
    border-width: 1px;
    border-style: solid;
    border-image: 
    linear-gradient(
      to bottom, 
      var(--gray-light), 
      rgba(0, 0, 0, 0)
    ) 1 100%;
    }
.border2 { grid-area: 1 / 4 / 5 / 5; 
    border-width: 1px;
    border-style: solid;
    border-image: 
    linear-gradient(
      to bottom, 
      var(--gray-light), 
      rgba(0, 0, 0, 0)
    ) 1 100%;
    }
    
  .large {
      font-size: 12em;
      text-align: center;
      font-family: 'Canela Web';
      font-weight: 300;
  }

  @media screen and (max-width: 1000px) {
    .grid-container{
        font-size: 12px;
    }

    .author > p {
        font-size: 1.25em;
    }

    time {
        font-size: 1.25em;
    }
  }

  @media screen and (max-width: 500px){
      .grid-container{
          font-size: 8px;
      }

      .dek {
        grid-area: 4 / 3 / 5 / 5;
      }

      .author > p {
        font-size: 1.5em;
    }

    time {
        font-size: 1.25em;
    }

    .border1, .border2 {
        border-image: 
    linear-gradient(
      to bottom, 
      var(--gray-lighter), 
      rgba(0, 0, 0, 0)
    ) 1 100%;
    }
  }

</style>
