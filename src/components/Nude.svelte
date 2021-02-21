<script>
    import copy from "../data/copy.json";
    import NudeElement from "./NudeElement.svelte";
    import Switch from "./Switch.svelte"
    import 'intersection-observer'
    import scrollama from 'scrollama'
    import SectionHed from "./SectionHed.svelte"


    export let state = "on";
    let activeStep = "all";
    let steps;

    let scroller = scrollama();


    $: if (steps && state === 'on'){
        scroller
            .setup({
                step: ".step"
            })
            .onStepEnter((response) => {
                const { element } = response
                activeStep = element.dataset.step
            })
        
    }


</script>

<section>
        <SectionHed text={'Nude and Natural'} />


        {#each copy.nude as {type, value}}
            <p class='prose'>{value}</p>
        {/each}

        <div class='warning'>
            <p class='warning-prose'>The next graphics in this story will utilize scroll-driven animations. Use this toggle to disable this and view static graphics instead.</p>
            <Switch label="Animations are " design="inner" bind:value={state} />
        </div>



{#if state === "on"}
    <div class='scroll'>
        <div class='element element-scroll'>
            <NudeElement step = {activeStep} />
        </div>
            <div class='step-container' bind:this={steps}>
            {#each copy.steps as step, i (step)}
                <div class='step' data-step={step.step}>
                    <p class='prose'>{step.text}</p>
                </div>
            {/each}
        </div>


    </div>

{:else}
    <div class='standard'>
        {#each copy.steps as step, i (step)}
        <div class='standard-group'>
            <p class='prose'>{step.text}</p>
            <div class='element element-standard'>
                <NudeElement step = {step.step} />
            </div>
        </div>
    {/each}
    </div>

{/if}


{#each copy.postNude as {type, value}}
    <p class='prose'>{value}</p>
{/each}

</section>

<style>
    .scroll, .standard-group {
        display: flex;
        flex-direction: row-reverse;
    }

    .scroll {
        position: relative;
        margin-top: 6rem;
    }

    .standard-group {
        flex-direction: column;
        margin-top: 5rem;
    }


    .step-container {
        width: 50vw;
    }

    .step {
        height: 95vh;
        max-width: 300px;
        margin: 0 auto;
    }

    .step p {
        background-color: transparent;
        border: 1px solid var(--off-black);
        padding: 1rem 1.5rem;
        box-shadow: 12px -12px 0 -1px var(--white), 12px -12px 0 0 #000;
    }

    .element-scroll {
        width: 50%;
        min-width: 50%;
        margin-left: 4rem;        
        position: sticky;
        height: 70vh;
        top: 25vh;
    }

    @media screen and (max-width: 500px) {
        .scroll {
            display: block;
            position: relative;
            padding: 1rem;
        }
        .step-container {
            width: 95%;
            margin: 0 auto;
            position: relative;
        }
        .step p {
            background-color: var(--bg);
        }
        .element-scroll {
            width: 100%;
            position: -webkit-sticky;
            position: sticky;
            left: 0;
            margin: 0;
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            z-index: 0;
        }
    }

    .standard {
        max-width: 50rem;
        margin: 0 auto;
    }

    .warning {
        max-width: 40rem;
        padding: 1rem;
        background-color: #F1F0FF;
        margin: 2rem auto;
        border: 1px solid var(--accent-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
        flex-wrap: wrap;
    }

    .warning-prose{
        margin: 0;
        max-width: 400px;
    }
</style>