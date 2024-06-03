<!-- <script>
    import { Card, Button, Rating, Badge } from 'flowbite-svelte';
    let name = "Front Prosty";
    let productNumber = "SW32313_13242";
    let state = "Do montażu";
    let completionTime = "Od 15 do 20 dni roboczych";
    let price = 420;
    // import url from "/SW32313_13242.png";
  </script> -->
  
  <script>
        import { Card, Button, Rating, Badge } from 'flowbite-svelte';

    export let product;
  </script>

  <Card padding="none" style=" border-radius: 25px; border: 4px solid #73AD21; margin: 10px  ">
    
    <img src="/SW32313_13242.png" class="p-8 rounded-t-lg  aspect-[3/4]" style="cursor: pointer" max-width=385 alt="" />

    <div class="px-5 pb-5">
      <a href="/">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
      </a>
      <!-- <Rating rating="4" size="24" class="mt-2.5 mb-5">
        <Badge slot="text" class="ms-3">4</Badge>
      </Rating> -->
      <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
        <Button href='/product/{product.id}' style="background:#73AD21;">
          Sprawdź
      </Button>
      </div>
      
    </div>


  </Card>

  <style>

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* width: 285px;
  height: 450px; */
}

.center-btn{
  display: block;
  margin-left: auto;
  margin-right: auto;

}

</style>

