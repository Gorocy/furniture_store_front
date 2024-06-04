<script>
  import { createEventDispatcher } from 'svelte';

  export let inputColor;
  export let userColor;
  
  const dispatch = createEventDispatcher();

  

  let previewColor = { ...userColor }; 
  let colors = [
    { name: 'Red', rgb: { r: 255, g: 0, b: 0 } },
    { name: 'Green', rgb: { r: 0, g: 255, b: 0 } },
    { name: 'Blue', rgb: { r: 0, g: 0, b: 255 } },
    { name: 'Yellow', rgb: { r: 255, g: 255, b: 0 } },
    { name: 'Orange', rgb: { r: 255, g: 165, b: 0 } },
    { name: 'Purple', rgb: { r: 128, g: 0, b: 128 } },
  ];

  function findClosestColors() {
    return colors.map(color => ({
      ...color,
      distance: Math.sqrt(
        Math.pow(previewColor.r - color.rgb.r, 2) +
        Math.pow(previewColor.g - color.rgb.g, 2) +
        Math.pow(previewColor.b - color.rgb.b, 2)
      )
    })).sort((a, b) => a.distance - b.distance).slice(0, 5);
  }

  function handleColorSelect(color) {
    dispatch('colorSelected', color);
  }

  $: closestColors = findClosestColors();
  $: previewColor = { ...userColor };
  $: if(userColor.r > 255) userColor.r = 255;
  $: if(userColor.r < 0) userColor.r = 0;
  $: if(userColor.g > 255) userColor.g = 255;
  $: if(userColor.g < 0) userColor.g = 0;
  $: if(userColor.b > 255) userColor.b = 255;
  $: if(userColor.b < 0) userColor.b = 0;
</script>

<div class="color-picker m-5  flex-1">
  <div class="sliders">
    R: {previewColor.r}
    <input class="color-input" type="number" min="0" max="255" bind:value={userColor.r} />
    G: {previewColor.g}
    <input class="color-input" type="number" min="0" max="255" bind:value={userColor.g} />
    B: {previewColor.b}
    <input class="color-input" type="number" min="0" max="255" bind:value={userColor.b} />
  </div>
  <div class="color-display" style="background-color: rgb({userColor.r}, {userColor.g}, {userColor.b});"></div>
  <ul class="closest-colors">
    {#each closestColors as { rgb, name }}
      <div class="">
      <li on:click={() => handleColorSelect(rgb)} style="background-color: rgb({rgb.r}, {rgb.g}, {rgb.b}); cursor: pointer;">
        {name} {rgb.r}, {rgb.g}, {rgb.b}
      </li>
      </div>
    {/each}
  </ul>
</div>

<style>
  .color-input{
    align-items: center;
    display: flex;

  }

  .color-picker {
    flex: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sliders input {
    margin: 5px;
  }
  .color-display {
    width: 100px;
    height: 100px;
    margin: 10px;
  }
  .closest-colors li {
    list-style-type: none;
    padding: 5px;
    margin: 2px;
    cursor: pointer;
  }





</style>
