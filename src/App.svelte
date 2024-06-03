<script>
    import { wrap } from 'svelte-spa-router/wrap';
    import { adminToken } from './lib/auth/auth';
    import Home from './routes/Home.svelte';
    import AdminLogin from './lib/components/AdminLogin.svelte';
    import AdminPanel from './routes/adminpanel/AdminPanel.svelte';
    import { Router } from 'svelte-spa-router';
  
    let isLoggedIn = false;
    adminToken.subscribe(value => {
      isLoggedIn = !!value;
    });
  
    const routes = {
      '/': Home,
      '/admin': AdminLogin,
      '/adminpanel': wrap({
        component: AdminPanel,
        conditions: [
          () => {
            if (!isLoggedIn) {
              window.location.href = '/admin';
              return false;
            }
            return true;
          }
        ]
      })
    };
  </script>
  
  <main>
    <Router {routes} />
  </main>
  
  <style>
    main {
      padding: 1em;
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
  