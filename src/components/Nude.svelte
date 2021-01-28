<script>
    import copy from "../data/copy.json";
    import NudeElement from "./NudeElement.svelte";

    export let state = "on";
    let activeStep = "all";

    function updateStep(){

    }

</script>

{#if state === "on"}
    <div class='step-container'>
        {#each copy.steps as step, i}
            <div class='step' data-step={step.step}>
                <p>{step.text}</p>
                <button on:click="{() => activeStep = step.step}">Update Step</button>
            </div>
        {/each}
    </div>
    <NudeElement step = {activeStep} />
{:else}
    {#each copy.steps as step, i}
        <p>{step.text}</p>
        <NudeElement step = {step.step} />
        <svg></svg>
    {/each}
{/if}