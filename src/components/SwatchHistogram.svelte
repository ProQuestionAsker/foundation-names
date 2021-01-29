<script>
    import { getContext } from 'svelte';
    import { calcExtents, flatten, scaleCanvas } from 'layercake';
    import { extent, range, bin, shuffle } from 'd3-array'
    import { scaleLinear } from 'd3-scale';
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing';

    // Access the context using the 'LayerCake' keyword
    // Grab some helpful functions
    const { data, width, height } = getContext('LayerCake');

    const { ctx } = getContext('canvas');

    export let blockWidth = 10;
    export let filterProp;
    export let filterValue;
    export let step;

    $: blockHeight = blockWidth / 2;
    let blockPadding = 2;

    const margins = {
        top: 40,
        left: 20,
        right: 20, 
        bottom: 20
    }

    $: graphWidth = $width - margins.left - margins.right;
    $: colNum = Math.round( graphWidth / ((blockPadding * 2) + blockWidth))

    $: lightBin = bin()
            .thresholds(($data, min, max) => range(colNum).map(t => min + (t / colNum) * (max - min)))
            .domain([0.15, 0.99])
            .value(d => d.lightness)

    $: lightnessScale = scaleLinear()
        .range([margins.left, $width - margins.right])
        .domain([0.15, 0.99])


    // if data needs to be filtered, filter it
    let filteredData = $data;
    $: if (filterProp && filterValue) {
        filteredData = $data.filter(d => d[filterProp] === filterValue)
    }



  

    // set up tweening function
    let blockPositions = tweened(null, {
            duration: 500,
            easing: cubicOut
	    })

   $: {
        // bin the data
        const binnedData = lightBin(filteredData)

        // flatten the data with binning information
        let flatBins = []
        binnedData.forEach((bin, i) => {
        const swatches =  bin.map((d, ind) => ({
            ...d,
            x: lightnessScale(bin.x0),
            index: ind
        }))

        flatBins.push(swatches)
    })

        const semiFlat = flatten(flatBins)
        const intFlat = flatten(semiFlat)

        let totallyFlat;

        if (step === 'all'){
            console.log('all step')
            const allFlat = shuffle(intFlat.slice()).map((d, i) => {
                const row = ~~ (i / colNum)
                const binNum = i - (colNum * row)
                const x0 = binnedData[binNum].x0
                return {
                    ...d, 
                    x: lightnessScale(x0),
                    index: row,
                }
            })

             blockPositions.set(allFlat);
             console.log({tween: $blockPositions, allFlat})
        }
        else {
            const semiFlat = flatten(flatBins)
            const intFlat = flatten(semiFlat)
             totallyFlat = intFlat
             blockPositions.set(totallyFlat)
             console.log({tween: $blockPositions, totallyFlat})
        }
  
    }

    //$: binnedData, flattenBins()


    
    // $: tweenedData = tweened(totallyFlat, {
	// 	duration: 500,
	// 	easing: cubicOut
	// })

    //$: console.log({filteredData, totallyFlat})

    function updateTween(){
        // console.log({$tweenedData})
        // tweenedData.set(totallyFlat)
        
        // if (step === 'all') {
        //     // set bin number to sequential and random
        //     shuffle(totallyFlat); 
        //     const allFlat = totallyFlat.map((d, i) => {
        //         const row = ~~ (i / colNum)
        //         const binNum = i - (colNum * row)
        //         const x0 = binnedData[binNum].x0
        //         return {
        //             ...d, 
        //             x: lightnessScale(x0),
        //             index: row,
        //         }
        //     })


        //     tweenedData.set(allFlat)
        // } 
        // else {
        //     const histFlat = totallyFlat;
        //     tweenedData.set(histFlat)
        // }
    }



    //$: totallyFlat, step, updateTween()
 

    // build histogram in canvas
    $: {
        if ($ctx) {
            scaleCanvas($ctx, $width, $height);
            $ctx.clearRect(0, 0, $width, $height);

            console.log({$blockPositions})

           $blockPositions.forEach((swatch, i) => {
               const x = swatch.x
               const y = swatch.index * (blockHeight + blockPadding)

               $ctx.fillStyle = swatch.hex;
               $ctx.fillRect(x, y + margins.top, blockWidth, blockHeight)
           })

        }
    }
        
    //$: $width, step, organizeData()
   // $: tweenedData, console.log('tween updated'), drawHistogram()




</script>