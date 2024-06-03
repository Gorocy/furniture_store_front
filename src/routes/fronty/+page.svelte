<script>
	import { onMount } from 'svelte';
    import ProductCard from '$lib/productCard/ProductCard.svelte';
  
	let products = [];
  
	onMount(async () => {
	  const response = await fetch('http://localhost:8080/product/all');
	  products = await response.json();
	});
  </script>
  
 
  
  <div class="p-9 flex flex-wrap justify-center ">
	{#each products as product}
		<ProductCard {product}/> 
	
	{/each}
  </div>



  