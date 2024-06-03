<script>
  import { writable } from 'svelte/store';
  import { adminLogin } from '../auth/auth';

  let username = '';
  let password = '';
  const token = writable(null);
  const errorMessage = writable('');

  const handleSubmit = async () => {
    const result = await adminLogin(username, password);
    if (result.success) {
      token.set(result.token);
      window.location.href = "/panel";
    } else {
      errorMessage.set("Invalid credentials");
    }
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Username:
    <input type="text" bind:value={username} />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} />
  </label>
  <button type="submit">Login</button>
  {#if $errorMessage}
    <p>{$errorMessage}</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
  }

  label {
    margin-bottom: 10px;
  }

  button {
    margin-top: 10px;
  }

  p {
    color: red;
  }
</style>
