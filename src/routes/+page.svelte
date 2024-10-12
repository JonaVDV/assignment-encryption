<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<main class="container">
	<section class="encrypt">
		<h2>Encrypt a message</h2>
		<form action="?/encrypt" method="post" use:enhance>
			<div class="form-group">
				<label for="message">Message</label>
				<textarea name="message" id="message" rows="2" class="form-control"></textarea>
			</div>
			<button type="submit"> Encrypt </button>
		</form>
		{#if form?.encrypted}
			<div class="result">
				<h3>Result</h3>
				<p>Encrypted message: {form.encrypted}</p>
			</div>
		{/if}
	</section>

	<section>
		<h2>Decrypt the message</h2>
		<form action="?/decrypt" method="post" use:enhance>
			<div class="form-group">
				<label for="encrypted">Encrypted message</label>
				<textarea name="encrypted" id="encrypted" rows="2" class="form-control"></textarea>
			</div>
			<button type="submit">Decrypt</button>
		</form>

		{#if form?.decrypted}
			<div class="result">
				<h3>Result</h3>
				<p>Decrypted message: {form.decrypted}</p>
			</div>
		{/if}
	</section>
</main>
