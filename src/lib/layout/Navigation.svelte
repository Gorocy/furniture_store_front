<script>
    import { page } from '$app/stores';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
 
    $: activeUrl = $page.url.pathname;
    // let activeClass = 'text-white bg-ocean-700 md:bg-transparent md:text-green-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
    let nonActiveClass = 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
  </script>
  
  <Navbar class="bg-lime-700">
    <NavBrand href="/">
      <img src="/Logo WHITE_background.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
    </NavBrand>
    <NavHamburger />
    <!-- <NavUl {activeUrl} {activeClass} {nonActiveClass}>   -->
    <NavUl>
      <NavLi href="/">Home</NavLi>
      <NavLi href="/fronty">Fronty</NavLi>
      <NavLi href="/inspiracje">Inspiracje</NavLi>
      <NavLi href="/cart">Koszyk</NavLi>
      <NavLi href="/customer">Konto</NavLi>
    </NavUl>
  </Navbar>

  <div class="p-5 ">


  </div>
