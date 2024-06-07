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

<div class="box">  <!-- przypisana klasa box, która nie istnieje -->
  <section> <!-- niepotrzebny element, proszę usunąć -->
    <div class="container"> <!-- ten div jest w section, które go tylko wrapuje i nic więcej -->
      <div class="product-image"> 
        <img src="/SW32313_13242.png" alt="" /> <!-- nigdy w życiu nie wpisuj tak ścieżki do zdjęcia, w pliku co Ci wysłałem masz wyjaśnione jak to robić -->
      </div>
      <div class="form">
        <h2 class="">Sample Headline</h2> <!-- tutaj masz atrybut class pusty po co? Usunąć, nie robić śmieci -->
        <div class=""> <!-- tutaj też masz atrybut class pusty po co? Usunąć, nie robić śmieci -->
          <form on:submit|preventDefault={saveConfigurations} name="form">
            <div class="form-d"> <!-- tutaj masz klasę, która nie istnieje, znowu śmietnik w kodzie -->
              {#each Object.entries(detailsCategory) as [key, value]}
                <div class="form-mod"> <!-- to samo co wyżej -->
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
                    /> <!-- tutaj masz klasę, która nie istnieje, znowu śmietnik w kodzie -->
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
                    > <!-- tutaj masz klasę, która nie istnieje, znowu śmietnik w kodzie -->
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
            <!-- raz używasz komponentu Button a później bazowego inputa z html,
                zainstalowałeś te komponenty żeby ich używać to dlaczego nie użyjesz 
                komponentu input z Flowbite? -->
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
  .container { 
    border-radius: 25px;
    border: 6px solid #73ad21;
    margin: 0 auto;
    padding: 3vh;
    display: flex;
    flex-wrap: wrap;
  }

  .product-image {
    flex: 2;
    min-width: 150px; /* tutaj zadeklaruj stałą szerokość i też wysokość */
  }

  .product-image img {
    margin: 0 auto;
    width: 60vh; /* nigdy nie zmieniaj zdjęciu ani szerokości ani wysokości,
                    ponieważ przeskalowujesz zdjęcie i nie każde zdjęcie będzie tych samych rozmiarów.
                    Dla małych zdjęć powiększysz je i będzie wyglądać tragiocznie.
                    zrób tutaj max-width: 60vh; przez co zdjęcie mniejsze będą wyświetlane w swoim rozmiarze, a duże zdjęcia jak przekroczą 60vh to będą przeskalowane na szerokość 60vh.
                    I deklarowanie rozmiaru 60vh to zły pomysł. 60vh to 60% wysokości okna przeglądarki. 
                    Dla monitora 3440x1024 to będzie 512px szerokości a dla monitora 2550x1600 będzie to 900px szerokości. Lepiej zadklaruj stałą szerokości i zobacz dla innych urządzeń o różnej wielkości jak to wygląda i po prostu w media query zadklaruj np. max-width: 12rem;
                    */
                    /* dodałbym też tutaj max-height: 10rem; jaki to rozmiar to już sobie sam zobaczysz */
  }

  .form {
    margin: 0 auto; /* to auto niepotrzebne, zamiast tego użyj flexboksowej propertki do wyśrodkowania */
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .form input,
  .form select {
    width: 100%;
    margin: 1vh 0;
  }

  @media (max-width: 991px) {
    .container {
      flex-direction: column;
    }

    .product-image,
    .form {
      min-width: 100%;
    }
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .modal > div {
    padding: 20px; /* tutaj używasz pikseli, a niżej rem */
    background: white;
    border: 1px solid #ccc;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  } 

  .btn {
    color: white;
    padding: 0.5rem 0;
    margin-top: 0.5rem; /* tutaj używasz remow, co jest dobre, wyjaśnienie dostaniesz w pliku */
    display: inline-block;
    width: 100%;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .submit {
    background: linear-gradient(to bottom, #50b01c 5%, #73ad21 100%);
    background-color: #50b01c;
  }

  .update-form {
    border: 6px solid #73ad21;
    border-radius: 10px;
    flex: 60%;
    margin: 4%;
    justify-content: center; /* używasz flexbox'owych propertek a ten element nie jest flex */
    align-items: center; /* używasz flexbox'owych propertek a ten element nie jest flex */
  }
</style>
