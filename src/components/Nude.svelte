<script>
    import copy from "../data/copy.json";
    import NudeElement from "./NudeElement.svelte";

    export let state = "on";
    let activeStep = "all";

    function updateStep(){

    }

</script>

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

<style>
    .scroll, .standard-group {
        display: flex;
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
</style>