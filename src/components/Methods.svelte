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
        margin-top: 10rem;
        max-width: 75rem;
        padding: 0 1rem; 
    }
    .container {
        max-width: 45rem;
    }

    h2 {
        font-family: 'National 2 Narrow Web';
        font-weight: 200;
        font-size: 3em;
        text-transform: uppercase;
    }

 

    p {
        font-size: 14px;
        font-family: 'National 2 Web'
    }
    
    </style>