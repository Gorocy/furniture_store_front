<script>
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import ColorPicker from "../colorpicker/ColorPicker.svelte";

  const dispatch = createEventDispatcher();

  export let product = undefined;

  let productColor = { r: 128, g: 128, b: 128 };
  let userColor = { r: 128, g: 128, b: 128 };

  function onColorSelected(event) {
    productColor = event.detail;
  }
  const toConfigure = {
    heightMin: 50,
    heightMax: 2750,
    widthMin: 50,
    widthMax: 2000,
    thickness: [18, 19, 22],
    color: ["Czerwony", "Zielony", "Niebieski", "Czarny"],
    price: 1,
  };

  const details = {
    height: toConfigure.heightMin,
    width: toConfigure.widthMin,
    thickness: toConfigure.thickness[0],
    color: toConfigure.color[0],
  };

  let price = 0;
  let amount = 1;
  details.price = product.price;

  let error = undefined;
  let colorFind = undefined;

  function colorFindFn() {
    colorFind = true;
  }

  function decreaseAmount() {
    if (amount > 1) {
      amount -= 1;
      dispatch("change", { amount });
    }
  }

  function increaseAmount() {
    if (amount < 999) {
      amount += 1;
      dispatch("change", { amount });
    }
  }

  function handleInput(event) {
    amount = event.target.value;
    if (isNaN(amount)) {
      amount = 0;
    }
    if (amount > 999) {
      amount = 999;
    }
    if (amount < 1) {
      amount = 1;
      dispatch("change", { amount });
    }

    dispatch("change", { amount });
  }

  function saveConfigurations(event) {
    event.preventDefault();

    if (
      details.height > toConfigure.heightMax ||
      details.height < toConfigure.heightMin
    ) {
      error = {
        msg:
          "Wysokość musi mieścić się w przedziale " +
          toConfigure.heightMax +
          " > x > " +
          toConfigure.heightMin,
      };
      return;
    }

    if (
      details.width > toConfigure.widthMax ||
      details.width < toConfigure.widthMin
    ) {
      error = {
        msg:
          "Szerokość musi mieścić się w przedziale " +
          toConfigure.widthMax +
          " > x > " +
          toConfigure.widthMin,
      };
      return;
    }

    if (toConfigure.thickness.indexOf(details.thickness)) {
      error = {
        msg: "Zła grubość",
      };
      return;
    }

    const newConfiguration = {
      idProduct: product.id,
      specification: details,
      price: price,
      order: true,
      amount: amount,
    };

    try {
      const savedConfigurations = localStorage.getItem("specification");
      const configurations = savedConfigurations
        ? JSON.parse(savedConfigurations)
        : [];
      configurations.push(newConfiguration);
      localStorage.setItem("specification", JSON.stringify(configurations));
      console.log("Zapisano nową konfigurację:", newConfiguration);
    } catch (error) {
      console.error("Błąd podczas zapisu konfiguracji:", error);
    }
  }

  $: if (product.price) {
    price = product.price;
  }

  function closeModal() {
    error = undefined;
  }

  function closeColorFind() {
    colorFind = undefined;
    console.log(productColor);
  }
</script>

{product.category.detailsCategory}

<div class="u-body u-xl-mode" data-lang="pl">

  <section>
    <div class="container u-sheet u-sheet-1">
      <div class="image">
        <img src="/SW32313_13242.png" alt="" />
      </div>
      <div class="form">

      <h2 class="u-text u-text-default u-text-1">Sample Headline</h2>
      <div
        class="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-form u-form-1"
      >
        <form
          on:submit|preventDefault={saveConfigurations}
          class=" u-form-spacing-10 u-form-vertical u-inner-form"
          name="form"
          style="padding: 10px;"
        >
          <div class="form-d">
            {#each Object.entries(product.category.detailsCategory) as [key, value]}
            {#if value.form === "input"}
              <!-- Input -->
              <label for={value.name}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input 
              class="u-input u-input-rectangle"
             
            
               type="number" 
              

                name={value.name} 
                min={value.min} 
                max={value.max} 
                bind:value={details[value.name]}
              />
            {:else if value.form === "select"}
              <!-- Select -->
              <label for={value.name}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <select name={value.name}
              
              class="u-input u-input-rectangle"
              
              bind:value={details[value.name]}
              >
                {#each value.options as option}
                  <option value={option}>{option}</option>
                {/each}
              </select>
            {/if}
          {/each}



            <!-- <label for="wysokosc" class="u-label">Wysokość [mm]:</label>

            <input
              class="u-input u-input-rectangle"
              type="number"
              id="wysokosc"
              bind:value={details.height}
              min={toConfigure.heightMin}
              max={toConfigure.heightMax}
            />
          </div>

          <div class="form-d">
            <label for="szerokosc" class="u-label">Szerokość [mm]:</label>

            <input
              class="object-right"
              type="number"
              id="szerokosc"
              bind:value={details.width}
              min={toConfigure.widthMin}
              max={toConfigure.widthMax}
            />
          </div>

          <div class="form-d">
            <label for="grubosc" class="u-label">Grubość [mm]:</label>

            <select
              class="u-input u-input-rectangle"
              id="grubosc"
              bind:value={details.thickness}
            >
              {#each toConfigure.thickness as g}
                <option value={g}>{g}</option>
              {/each}
            </select> -->
          </div>

          <div class="u-align-right u-form-group u-form-submit">
            <Button on:click={colorFindFn} style="background:#73AD21;">
              Wybierz kolor
            </Button>

            <Button
              type="button"
              class=""
              style="background:#73AD21; s"
              on:click={saveConfigurations}>Zapisz Konfigurację</Button
            >
          </div>
          
          <div>
            <Button on:click={decreaseAmount} class="amount-button" style="background:#73AD21;">
            -
           </Button>

           <input
           class=""
           type="number"
           id="amount"
           bind:value={amount}
           min={1}
           max={999}
         />

            <Button on:click={increaseAmount} class="amount-button" style="background:#73AD21;">
            +
            </Button>

          </div>

        </form>


      </div>
      </div>
    </div>
  </section>
  <!-- u-image u-image-default u-image-1 -->
  {#if error}
  <div class="modal">
    <div class="update-form">
      <p>{error.msg}</p>
      <button class="btn submit" on:click={closeModal}>OK</button>
    </div>
  </div>
{/if}

{#if  colorFind}
<div class="modal">
  <div class="update-form">
    <ColorPicker inputColor={productColor}  userColor={userColor} onSelectColor={productColor}/>
      <button class="btn submit" on:click={closeColorFind} >OK</button>
    <!-- <p>{error.msg}</p>
    <button class="btn submit" on:click={closeColorFind}>OK</button> -->
  </div>
</div>
{/if}

</div>



<style>
.form-d   select,
  input {
    display: inline-block;
    margin-top: 10px;
    border: 3px solid #73ad21;
    border-radius: 15px;
    text-align: right;
    align-items: right;
    justify-content: right;

    /* width: full; */
  
}

@media (max-width: 768px) {
    .amount-button {
        display: none;
    }
}

.input-container {
  display: flex;
  align-items: center;
}

.input-container label {

  flex: 1;
  text-align: left;
  margin-right: 10px; 
}

.input-container input, select {
  flex: 1;
}


  .amount-container {
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1; 
  }
  .update-form {
    border: 6px solid #73ad21;
    border-radius: 10px;
    flex: 60%;
    margin: 4%;
    justify-content: center;
    align-items: center;
  }

  .modal {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    z-index: 100;
  }

  .modal > div {
    padding: 20px;
    background: white;
    border: 1px solid #ccc;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .btn {
    color: white;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    display: inline-block;
    width: 100%;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .submit {
    background: linear-gradient(to bottom, #50b01c 5%, #73ad21 100%);
    background-color: #50b01c;
  }

  .container {
    padding: 50px;
    margin: auto;
    border-radius: 25px;
    border: 6px solid #73ad21;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
  }

  .image-container {
    flex: 1;
  }

  .product-image {
    width: 100%;
    height: auto;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    flex: 2;
    gap: 20px;
  }

  .form-container {
    border: 6px solid #73ad21;
    padding: 20px;
    border-radius: 25px;
    display: block;
  }

  label {
    margin-top: 10px;
  }

  button {
    display: block;
    margin-top: 10px;
  }



  @media (max-width: 640px) {
    .container {
      flex-direction: column;
    }

    .info-container,
    .image-container {
      width: 100%;
    }

    .form-container {
      width: auto;
    }

    .decrease-button,
    .increase-button {
        display: none;
    }
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .image {
    flex: 1;
    margin: auto;
    justify-content: center;
    align-items: center;
  }

  .image img {
    width: 80%;
    height: auto;
    margin: auto;
    justify-content: center;
    align-items: center;
  }

  .form {
    flex: 1;
    }

  @media (max-width: 991px) {
    .container {
      flex-direction: column;
    }
  }
</style>
