<script>
  import { logout } from '../../lib/auth/auth';

  const handleLogout = () => {
    logout();
  };
</script>

<h1>Admin Panel</h1>
<button on:click={handleLogout}>Logout</button>
