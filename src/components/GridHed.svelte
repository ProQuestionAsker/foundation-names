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

    // const startColor = hsl(19.5, 0.46, 0.15)
    // const endColor = hsl(30, 0.5, 0.99)
    let mounted = false;

    onMount(() => mounted = true)

    function displayRandomHex(node, {duration}){
        // choose 2 random hexes to interpolate between
        const first = curatedColors[Math.floor(Math.random() * curatedColors.length) + 1]
        const second = curatedColors[Math.floor(Math.random() * curatedColors.length) + 1]
        const interpolateColors = piecewise(interpolate, [first, second, '#282828'])
       
        return {
            duration,
            css: t => {
                return `color: ${interpolateColors(t)}`
            }
        }
    }

</script>

{#if mounted}

<div class='grid-container'>
    <h1 class='sr-only'>{copy.title}</h1>
    <p class='sr-only'>{copy.dek}</p>

        <div aria-hidden="true" class='the'>The</div>

        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='n1 large topRow'>N</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='a2 large topRow'>A</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='k3 large topRow'>K</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='e4 large topRow'>E</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='d5 large topRow'>D</div>


        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='t6 large bottomRow'>T</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='r7 large bottomRow'>R</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='u8 large bottomRow'>U</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='t9 large bottomRow'>T</div>
        <div aria-hidden="true" in:displayRandomHex="{{duration: 5000}}" class='h10 large bottomRow'>H</div>
    
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

{/if}
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
.n1 { grid-area: 2 / 1 / 3 / 2; }
.a2 { grid-area: 2 / 2 / 3 / 3; }
.k3 { grid-area: 2 / 3 / 3 / 4; }
.e4 { grid-area: 2 / 4 / 3 / 5; }
.d5 { grid-area: 2 / 5 / 3 / 6; }
.t6 { grid-area: 3 / 1 / 4 / 2; }
.r7 { grid-area: 3 / 2 / 4 / 3; }
.u8 { grid-area: 3 / 3 / 4 / 4; }
.t9 { grid-area: 3 / 4 / 4 / 5; }
.h10 { grid-area: 3 / 5 / 4 / 6; }
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
