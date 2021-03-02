<script>
import copy from "../data/copy.json";
</script>

<section class='intro'>
    <div class='header'>
        <h1 class='hed'>{copy.title}</h1>
        <h2 class='dek'>{copy.dek}</h2>
    </div>


    {#each copy.intro as {type, value}}
        <p class='prose'>{value}</p>
    {/each}

</section>

<style>
section {
    max-width: 50rem;
    margin: 0 auto;
}

/* .prose {
    max-width: 50rem;
    margin: 0 auto;
} */
.hed {
    font-family: 'Tiempos Headline Web';
    font-size: 100px;
    text-align: center;
    line-height: 1.2;
    margin-bottom: 0;
}
.dek {
    font-size: 32px;
    text-transform: uppercase;
    color: var(--gray);
    font-family: 'National 2 Narrow Web';
    font-weight: 200;
    text-align: center;
    margin-top: 0.25em;
}

.header {
    margin-bottom: 4rem;
}
</style>