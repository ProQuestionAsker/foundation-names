<script>
import copy from "../data/copy.json";
</script>

<section class='intro'>
    <div class='header'>
        <h1 class='hed'>{copy.title}</h1>
        <h2 class='dek'>{copy.dek}</h2>
    </div>

    <div class='meta'>
        <div class='byline-container'>
            <p class='byline'>{@html copy.storyBy}</p>
            <p class='byline'>{@html copy.codeBy}</p>
        </div>

        <time>{copy.date}</time>
    </div>


    {#each copy.intro as {type, value}}
        <p class='prose'>{@html value}</p>
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
    margin-top: 2rem;
    margin-bottom: 0;
}
.dek {
    font-size: 28px;
    text-transform: uppercase;
    color: var(--gray);
    font-family: 'National 2 Narrow Web';
    font-weight: 200;
    text-align: center;
    margin: 0.25em auto 0;
    max-width: 22rem;
    line-height: 1;
}


.meta {
    margin: 0 auto 3rem;
    color: var(--gray-dark);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 30rem;
    font-family: 'National 2 Narrow Web'
}


.byline-container {
    color: var(--gray-dark);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 2rem;
}

.byline {
    margin: 0.1rem;
    color: var(--gray);
}

time {
    text-align: center;
    margin: 0.75rem auto 0;
    color: var(--gray);
}
</style>