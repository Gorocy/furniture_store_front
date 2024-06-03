<script>
    import InputField from "$lib/checkout/InputField.svelte";
    export let active_step;
    let showModal = false;

    let formData = {
        email: "",
        address: {
            name: "",
            surname: "",
            alley: "",
            city: "",
            postcode: "",
            deliveryOption: "",
        },

        paymentMethod: "",
        configurations: [],
    };

    let deliveryOptions = [
        { value: "", text: "Wybierz sposób dostawy" },
        { value: "UPS", text: "Koszt 20 zł" },
        { value: "DPD", text: "Koszt 25 zł" },
        { value: "DHL", text: "Koszt 30 zł" },
    ];

    let paymentMethod = [
        { value: "", text: "Wybierz sposób zapłaty" },
        { value: "PayPal", text: "paypal" },
        { value: "Przelewy24.pl", text: "przelewy24" },
    ];

    let error = undefined;

    const handleSubmit = () => {
        if (
            !formData.address.name ||
            !formData.address.surname ||
            !formData.email ||
            !formData.address.alley ||
            !formData.address.city ||
            !formData.address.postcode ||
            !formData.address.deliveryOption ||
            !formData.paymentMethod
        ) {
            error = {
                msg: "Prosze wypełnić wszyskie pola",
            };
            showModal = true;
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            error = {
                msg: "Niepoprawny email : " + formData.email,
            };

            showModal = true;
            return;
        }

        const postalCodeRegex = /^\d{2}-\d{3}$/;
        if (!postalCodeRegex.test(formData.address.postcode)) {
            error = {
                msg: "Niepoprawny kod pocztowy: " + formData.address.postcode,
            };
            showModal = true;
            return;
        }

        logOrderedItemsFromStorage();
    };

    function closeModal() {
        showModal = false;
    }

    function logOrderedItemsFromStorage() {
        const items = localStorage.getItem("specification");
        if (items) {
            const configurations = JSON.parse(items);
            const orderedConfigurations = configurations.filter(
                (config) => config.order,
            );
            // orderedConfigurations.forEach((config) => fetchProduct(config));
            fetchOrder(formData, orderedConfigurations);
            showModal = true;
            error = {
                msg: "Wysłano zamówienie",
            };
            showModal = true;
            orderedConfigurations.forEach((config) => console.log(config));
        } else {
            showModal = true;
            error = {
                msg: "Pusty koszyk",
            };
            showModal = true;
        }
    }

    function fetchOrder(data, orderedConfigurations) {
        console.log(orderedConfigurations);

        if (Array.isArray(orderedConfigurations)) {
            orderedConfigurations.forEach((config) => delete config.order);
        } else {
            delete orderedConfigurations.order;
        }
        console.log(orderedConfigurations);
        data.configurations = orderedConfigurations;

        fetch("http://localhost:8080/api/order/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error("Error:", error));
    }
</script>

<form class="form-container" on:submit|preventDefault={handleSubmit}>
    {#if active_step === "Podsumowanie"}
        <InputField label={"Imię"} bind:value={formData.address.name} />
        <InputField label={"Nazwisko"} bind:value={formData.address.surname} />
        <InputField label={"Email"} bind:value={formData.email} />
    {:else if active_step === "Dostawa"}
        <InputField
            label={"Ulica z numer budynku i mieszkania"}
            bind:value={formData.address.alley}
        />
        <InputField label={"Miasto"} bind:value={formData.address.city} />
        <InputField
            label={"Kod pocztowy"}
            bind:value={formData.address.postcode}
        />
    {:else if active_step === "Płatność"}
        <h1>Metoda dostawy</h1>
        <select bind:value={formData.address.deliveryOption}>
            {#each deliveryOptions as option}
                <option value={option.value}>{option.text}</option>
            {/each}
        </select>
        <h1>Metoda płatności</h1>
        <select bind:value={formData.paymentMethod}>
            {#each paymentMethod as option}
                <option value={option.value}>{option.text}</option>
            {/each}
        </select>
    {:else if active_step === "Potwierdzenie"}
        <div class="message">
            <h2>
                Dziękujemy za wybranie naszych usług, w razie problemów
                skontaktujemy się z Tobą
            </h2>
            <button class="btn submit"> Przejdź do płatności </button>
        </div>
    {/if}
</form>

{#if showModal}
    <div class="modal">
        <div class="update-form">
            <p>{error.msg}</p>
            <button class="btn submit" on:click={closeModal}>OK</button>
        </div>
    </div>
{/if}

<style>
    .update-form {
        border: 6px solid #73ad21;
        border-radius: 10px;
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
    }
    .modal > div {
        padding: 20px;
        background: white;
        border: 1px solid #ccc;
        z-index: 10;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .form-container {
        background-color: #fff;
        flex: auto;
        border: 6px solid #73ad21;
        border-radius: 10px;
        box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.1),
            0 6px 6px rgba(0, 0, 0, 0.1);
        padding: 50px 20px;
        text-align: center;
        max-width: 100%;
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
    .submit:hover {
        background: linear-gradient(to bottom, #73ad21 5%, #50b01c 100%);
        background-color: #73ad21;
    }
    .message {
        text-align: center;
    }
</style>
