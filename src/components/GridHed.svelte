<script>
    // color rotation
    import { cubicInOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte'
    import { scaleLinear } from 'd3-scale'

    // const startColor = hsl(19.5, 0.46, 0.15)
    // const endColor = hsl(30, 0.5, 0.99)
    let mounted = false;

    onMount(() => mounted = true)

    const hScale = scaleLinear()
        .range([19.5, 30])
        .domain([0, 1])


    const sScale = scaleLinear()
        .range([46, 50])
        .domain([0, 1])


    const lScale = scaleLinear()
        .range([99, 15])
        .domain([0, 1])


    function randomIntFromInterval(min, max) { // min and max included 
        return Math.round(10 * (Math.random() * (max - min) + min)) / 10
    }

    function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = cubicInOut(t);

				return `
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}

    function rotateColors(node, {duration}){
        return {
            duration, 
            css: t => {
                const eased = cubicInOut(t);


                return `
                    color: hsl(
                        ${hScale(t)},
                        ${sScale(t)}%, 
                        ${lScale(t)}%
                    )
                `
            }
        }
    }
</script>

{#if mounted}
<div class='grid-container'>
    <div class='the'>The</div>

        <div in:rotateColors="{{duration: 5000}}" class='n1 large'>N</div>
        <div in:rotateColors="{{duration: 5000}}" class='a2 large'>A</div>
        <div in:rotateColors="{{duration: 5000}}" class='k3 large'>K</div>
        <div in:rotateColors="{{duration: 5000}}" class='e4 large'>E</div>
        <div in:rotateColors="{{duration: 5000}}" class='d5 large'>D</div>


        <div in:rotateColors="{{duration: 5000}}" class='t6 large'>T</div>
        <div in:rotateColors="{{duration: 5000}}" class='r7 large'>R</div>
        <div in:rotateColors="{{duration: 5000}}" class='u8 large'>U</div>
        <div in:rotateColors="{{duration: 5000}}" class='t9 large'>T</div>
        <div in:rotateColors="{{duration: 5000}}" class='h10 large'>H</div>

    <div class='meta'>
        <div class='meta-by'>
            <!-- byline information -->
            <time>March 2021</time>
        </div>
        <div class='dek'></div>
    </div>

    <div class="border1"></div>
    <div class="border2"></div>
</div>

{/if}
<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 10% 1fr 1fr 1fr;
  gap: 0px 0px;
}
.the {
     grid-area: 1 / 1 / 2 / 2; 
     text-transform: uppercase;
    text-align: center;
    font-size: 6em;
}
.dek { grid-area: 4 / 4 / 5 / 5; }
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
.meta { grid-area: 4 / 2 / 5 / 3; }
.border1 { 
    grid-area: 1 / 2 / 5 / 3; 
    border-left: 1px solid var(--gray);
    border-right: 1px solid var(--gray);
    }
.border2 { grid-area: 1 / 4 / 5 / 5; 
    border-left: 1px solid var(--gray);
    border-right: 1px solid var(--gray);
    }
    
  .large {
      font-size: 12em;
      text-align: center;
  }

</style>
