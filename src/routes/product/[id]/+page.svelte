<script>

    import Front from "$lib/products/Front.svelte";
    export let data;



</script>

<div class="justify-center m-10">


    <Front product={data.data}/>

    <!-- <Front product={data.data}/> -->
 

</div>



