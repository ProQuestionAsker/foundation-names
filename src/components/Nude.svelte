<script>
    import copy from "../data/copy.json";
    import NudeElement from "./NudeElement.svelte";
    import Switch from "./Switch.svelte"

    export let state = "on";
    let activeStep = "all";

    function updateStep(){

    }

</script>

<section>
 
        <div class='divider-text'>
            <h3 class='section-hed'>Nude and Natural</h3>
        </div>

        {#each copy.nude as {type, value}}
            <p class='prose'>{value}</p>
        {/each}

        <div class='warning'>
            <p class='warning-prose'>The next graphics in this story will utilize scroll-driven animations. Use this toggle to disable this and view static graphics instead.</p>
            <Switch label="Animations are " design="inner" bind:value={state} />
        </div>



{#if state === "on"}
    <div class='scroll'>
            <div class='step-container'>
            {#each copy.steps as step, i}
                <div class='step' data-step={step.step}>
                    <p>{step.text}</p>
                    <button on:click="{() => activeStep = step.step}">Update Step</button>
                </div>
            {/each}
        </div>
        <div class='element element-scroll'>
            <NudeElement step = {activeStep} />
        </div>

    </div>

{:else}
    <div class='standard'>
        {#each copy.steps as step, i}
        <div class='standard-group'>
            <p>{step.text}</p>
            <div class='element element-standard'>
                <NudeElement step = {step.step} />
            </div>
        </div>
    {/each}
    </div>

{/if}


</section>

<style>
    .scroll, .standard-group {
        display: flex;
    }

    .scroll {
        position: relative;
    }

    .standard-group {
        flex-direction: column;
    }

    .element-scroll {
        width: 50%;
        min-width: 50%;
        margin-left: 3rem;
    }

    .standard {
        max-width: 50rem;
        margin: 0 auto;
    }

    .element-scroll {
        position: sticky;
        height: 50vh;
        top: 25vh;
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