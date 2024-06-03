<script>
    import "../app.css";
    import Footer from "$lib/layout/Footer.svelte";
    import Navigation from "$lib/layout/Navigation.svelte";
    
    
    import { adminToken } from '../lib/auth/auth';
  import { page } from '$app/stores';

  let isLoggedIn = false;

  adminToken.subscribe(value => {
    isLoggedIn = !!value;
  });

  $: {
    if ($page.url.pathname.startsWith('/adminpanel') && !isLoggedIn) {
      window.location.href = '/admin';
    }
  }

  </script>
  
  
  <Navigation/>


  <slot />

<Footer/>
