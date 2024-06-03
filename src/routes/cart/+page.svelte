<script>
  import { onMount } from "svelte";
  import ProductsCart from "$lib/cart/ProductsCart.svelte";
  import { Button } from "flowbite-svelte";

  let sumPrice = 0;
  let configurations = [];

  function updateSumPrice() {
    sumPrice = configurations.reduce(
      (total, item) => (item.order ? total + item.price * item.amount : total),
      0,
    );
  }

  function handleCheckboxChange(index) {
    updateSumPrice();
    localStorage.setItem("specification", JSON.stringify(configurations));
  }

  function removeConfiguration(index) {
    configurations.splice(index, 1);
    updateSumPrice();
    localStorage.setItem("specification", JSON.stringify(configurations));
    window.location.reload();
  }

  function handleProductChange(event, index) {
        configurations[index].amount = event.detail.amount;
        localStorage.setItem("specification", JSON.stringify(configurations));
        updateSumPrice();
    }

  onMount(() => {
    const savedConfigurations = localStorage.getItem("specification");
    if (savedConfigurations) {
      configurations = JSON.parse(savedConfigurations);
      updateSumPrice();
      console.log("Odczytano konfiguracje:", configurations);
    }
  });
  
</script>

<div class="container">
  <div class="info-container">
    {#each configurations as configuration, index}
      <div class="configuration-container">
        <input
          type="checkbox"
          id="checkbox-{index}"
          class="custom-checkbox"
          bind:checked={configuration.order}
          on:change={() => handleCheckboxChange(index)}
        />
        <label for="checkbox-{index}" class="checkbox-label"></label>
        <ProductsCart
         value={configuration} 
         on:change={(event) => handleProductChange(event, index)}
         />

        
       
        <button type="button" class="btn btn-outline-danger" on:click={() => removeConfiguration(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
            ></path>
            <path
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
            ></path>
          </svg>
          
        </button>
      </div>
    {/each}
  </div>

  <div class="to-checkout text-center">
    <h1 class="text-xl">Podsumowanie produktów</h1>
    <div class="sum-of">
      <h1>Cena: {sumPrice} zł</h1>
    </div>
    <Button
      href="/checkout"
      class="click-checkout mt-5 w-full "
      style="background:#73AD21;"
    >
      Do kasy
    </Button>
  </div>
</div>

<style>
  .custom-checkbox {
    display: none;
  }
  .click-checkout {
    margin-top: 10px;
    padding: 5px;

    width: 100%;
  }

  .to-checkout {
    min-height: 500px;
    flex: 1;
  }
  .checkbox-label {
    position: relative;
    cursor: pointer;
    padding-left: 25px;
    line-height: 30px;
  }

  .checkbox-label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: white;
    border: 2px solid #73ad21;
    border-radius: 4px;
  }

  .custom-checkbox:checked + .checkbox-label:before {
    background-color: #73ad21;
  }

  .custom-checkbox:checked + .checkbox-label:after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
  .sum-of {
    min-height: 400px;
    margin-down: 10px;
    border: 6px solid #73ad21;
    border-radius: 25px;
  }
  .info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 2; /* 2/3 szerokości */
    gap: 10px;
  }
  .container {
    padding: 50px;
    margin: auto;
    margin-bottom: 30px;
    border-radius: 25px;
    border: 6px solid #73ad21;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 20px;
    /* min-height: 700px;
    max-width: 1600px; */
    width: 100%;
    box-sizing: border-box;
  }

  .configuration-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .checkbox-label {
    white-space: nowrap;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 20px;
  }

  @media (max-width: 1199px) {
    .container {
      flex-direction: column;
    }
    .info-container,
    .to-checkout {
      width: 100%;
      flex: none;
    }
    .form-container {
      width: auto;
    }
  }

  @media (max-width: 749px) {
    .checkbox-label {
      position: relative;
  }
  }

</style>
