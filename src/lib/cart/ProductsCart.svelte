<script>
    import { Button } from "flowbite-svelte";

    import { createEventDispatcher } from "svelte";

    export let value;
    const dispatch = createEventDispatcher();

    function decreaseAmount() {
        if (value.amount > 0) {
            value.amount -= 1;
            dispatch("change", { amount: value.amount });
        }
    }

    function increaseAmount() {
        if (value.amount < 999) {
            value.amount += 1;
            dispatch("change", { amount: value.amount });
        }
    }

    function handleInput(event) {
    let amount = parseInt(event.target.value, 10);
    if (isNaN(amount) || amount < 0) {
        amount = 0;
    } else if (amount > 999) {
        amount = 999;
    }
    value.amount = amount;
    dispatch('change', { amount: value.amount });
}


</script>

<div class={"p-5 shadow-lg border rounded-md flex-1 order"}>
    <div class={"flex items-center"}>
        <div class={"w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]"}>
            <img
                class={"w-auto h-full object-cover object-top items-center"}
                src="/SW32313_13242.png"
                alt={""}
            />
        </div>
        <!-- {/* dac info o produkcie */} -->
        <div class={"ml-5 space-y-1"}>
            <p class={"font-semibold"}>Product id : {value.idProduct}</p>

            <!-- <p class={'opacity-70'}>JAKIES DETALE</p> -->
            <p class={"opacity-70"}>Wysokość: {value.specification.height}</p>
            <p class={"opacity-70"}>Szerokość: {value.specification.width}</p>
            <p class={"opacity-70"}>Grubość: {value.specification.thickness}</p>
            <!-- <p class={'opacity-70 mt-2'}> Costam</p> -->

            <p class={"opacity-70 "}>Dac details clienta</p>

            <div class={"flex space-x-5 items-center text-gray-900 pt-10"}>
                <p class={"font-semibold"}>Cena: {value.price*value.amount} zł</p>
                <!-- <p class={'opacity-50 line-through'}> Opcja promocji</p> -->
            </div>

            <div></div>
        </div>
    </div>
    <!-- {/* PRZYCISK OD ILOSCI */} -->
    <div
        class="lg:flex item-center lg:space-x-10 pt-4"
        style="position: relative;"
    >
        <div class="content" >
            <Button on:click={decreaseAmount} style="background:#73AD21;">
                Odejmnij
            </Button>

            <input
                type="number"
                min="0"
                max="999"
                value={value.amount}
                on:input={handleInput}
                class="py-1 px-2 border rounded-md"
                style="width: 80px;"
            />
            <Button on:click={increaseAmount} style="background:#73AD21;">
                Dadaj
            </Button>
        </div>
    </div>
</div>

<style>
      @media (min-width: 545px) {

    .content{
        position: absolute;
         bottom: 0;
          right: 0;
    }
      }
    .order {
        width: 100%;
        margin: 20px;
        border-radius: 25px;
        border: 6px solid #73ad21;
    }
</style>
