<script>
    import copy from "../data/copy.json";
    </script>
    
    <section class='methods'>
        <div class='container'>
            <h2 class='methods'>Methods</h2>
            {#each copy.methods as {type, value}}
                <p class='prose'>{@html value}</p>
            {/each}
        </div>

    
    </section>
    
    <style>
    section {
        background-color: var(--fg);
        color: var(--bg);
        padding: 1rem 2rem;
    }
    .container {
        max-width: 50rem;
        margin: 0 auto;
    }

    .methods > :global(a) {
        color: var(--bg);
    }

    p {
        color: var(--bg);
        font-size: 14px;
        font-family: 'National 2 Web'
    }
    
    </style>