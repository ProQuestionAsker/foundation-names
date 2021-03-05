<script>
    import copy from "../data/copy.json";
    </script>
    
    <section class='conclusion'>
        <div class='container'>
            {#each copy.conclusion as {type, value}}
                <p class='prose'>{@html value}</p>
            {/each}
        </div>

    
    </section>

    <style>
        section {
            margin-bottom: 3rem;
        }
    </style>