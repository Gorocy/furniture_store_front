<script>
  import { Button } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import ColorPicker from "./ColorPicker.svelte";

  const dispatch = createEventDispatcher();

  export let product = undefined;
  let detailsCategory = JSON.parse(product.category.detailsCategory);

  let productColor = { r: 128, g: 128, b: 128 };
  let userColor = { r: 128, g: 128, b: 128 };

  function onColorSelected(event) {
    productColor = event.detail;
  }

  const details = {};

  for (const [key, value] of Object.entries(detailsCategory)) {
    if (value.form === "input") {
      details[key] = detailsCategory[key][`min`];
    } else if (value.form === "select") {
      details[key] = detailsCategory[key]["options"][0];
    }
  }

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

  function saveConfigurations(event) {
    event.preventDefault();

    for (const [key, value] of Object.entries(detailsCategory)) {
      if (value.form === "input") {
        const minKey = `min`;
        const maxKey = `max`;

        if (
          details[key] >= detailsCategory[key]["max"] ||
          details[key] <= detailsCategory[key]["min"]
        ) {
          error = {
            msg: `${value.name} musi mieścić się w przedziale ${detailsCategory[key]["max"]} - ${detailsCategory[key]["max"]}`,
          };
          break;
        }
      } else if (value.form === "select") {
        if (!detailsCategory[key].includes(details[key])) {
          error = {
            msg: `Zła wartość dla ${value.name}`,
          };
          break;
        }
      }
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

  function closeModal() {
    error = undefined;
  }

  function closeColorFind() {
    colorFind = undefined;
    console.log(productColor);
  }

  $: if (product.price) {
    price = product.price;
  }

  $: if (isNaN(amount)) {
    amount = 0;
  }
  $: if (amount > 999) {
    amount = 999;
  }
  $: if (amount < 1) {
    amount = 1;
    dispatch("change", { amount });
  }
</script>

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
              {#each Object.entries(detailsCategory) as [key, value]}
                <div class="form-mod">
                  {#if value.form === "input"}
                    <!-- Input -->
                    <label for={value.name}
                      >{value.name.charAt(0).toUpperCase() +
                        value.name.slice(1)}:</label
                    >
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
                    <label for={value.name}
                      >{value.name.charAt(0).toUpperCase() +
                        value.name.slice(1)}:</label
                    >
                    <select
                      name={value.name}
                      class="u-input u-input-rectangle"
                      bind:value={details[value.name]}
                    >
                      {#each value.options as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  {/if}
                </div>
              {/each}
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
              <Button
                on:click={decreaseAmount}
                class="amount-button"
                style="background:#73AD21;"
              >
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

              <Button
                on:click={increaseAmount}
                class="amount-button"
                style="background:#73AD21;"
              >
                +
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  {#if error}
    <div class="modal">
      <div class="update-form">
        <p>{error.msg}</p>
        <button class="btn submit" on:click={closeModal}>OK</button>
      </div>
    </div>
  {/if}

  {#if colorFind}
    <div class="modal">
      <div class="update-form">
        <ColorPicker
          inputColor={productColor}
          {userColor}
          onSelectColor={productColor}
        />
        <button class="btn submit" on:click={closeColorFind}>OK</button>
        <p>{error.msg}</p>
        <button class="btn submit" on:click={closeColorFind}>OK</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .form-d select,
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

  .input-container input,
  select {
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
