<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from "$app/forms";
  
  export let data: PageData;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input type="text" name="username" id="username"/>
  <br />  
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  <br>

	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
  
	<input type="submit" />
</form>
