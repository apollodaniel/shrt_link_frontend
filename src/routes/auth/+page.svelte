<!--Login page-->

<script lang="ts">
	import { isErrorEntry, REGEX_VALIDATORS } from '$lib';
	import {
		Button,
		Card,
		Icon,
		Input,
		InputGroup,
		InputGroupText
	} from '@sveltestrap/sveltestrap';
	import { AuthHelper } from './helper';
	import type { ErrorEntry } from '$lib/types';

	let obscurePassword = $state(true);

	let emailErrorMessage: string | undefined = $state(undefined);
	let passwordErrorMessage: string | undefined = $state(undefined);

	let email = $state('');
	let password = $state('');

	async function loginUser() {
		const response = await AuthHelper.loginUser({
			email,
			password
		});

		if (response.ok) {
			window.open('/', '_self');
		} else if (isErrorEntry(response.body)) {
			const typedResponse: ErrorEntry = response.body;
			console.log(typedResponse);

			switch (typedResponse.field) {
				case 'email':
					emailErrorMessage = typedResponse.message;
					break;
				case 'password':
					passwordErrorMessage = typedResponse.message;
					break;
			}
		}
	}
</script>

<Card class="p-5 gap-4">
	<h1 class="mb-4">Start sharing your dreams</h1>

	<div class="d-flex flex-column gap-1">
		<Input
			disabled={false}
			invalid={((email.match(REGEX_VALIDATORS.email.regex) || []).length === 0 &&
				email.length > 0) ||
				typeof emailErrorMessage == 'string'}
			placeholder="Email"
			plaintext={false}
			reverse={false}
			type="email"
			valid={false}
			bind:value={email}
			on:keydown={() => (emailErrorMessage = undefined)}
		/>
		{#if ((email.match(REGEX_VALIDATORS.email.regex) || []).length === 0 && email.length > 0) || emailErrorMessage}
			<div class="invalid-feedback">
				{emailErrorMessage ? emailErrorMessage : REGEX_VALIDATORS.email.errorMessage}
			</div>
		{/if}
		<InputGroup>
			<Input
				disabled={false}
				placeholder="Password"
				plaintext={false}
				reverse={false}
				type={obscurePassword ? 'password' : 'text'}
				bind:value={password}
				invalid={typeof passwordErrorMessage == 'string'}
				on:keydown={() => (passwordErrorMessage = undefined)}
			/>
			<InputGroupText class="p-0">
				<Button
					color="primary"
					class="w-100 h-100 m-0 rounded-2 rounded-start-0"
					on:click={() => (obscurePassword = !obscurePassword)}
					><Icon name={obscurePassword ? 'eye-fill' : 'eye-slash-fill'} /></Button
				>
			</InputGroupText>
			{#if typeof passwordErrorMessage == 'string'}
				<div class="invalid-feedback">
					{passwordErrorMessage}
				</div>
			{/if}
		</InputGroup>
	</div>
	<Button class="mt-2" color="primary" on:click={loginUser}
		>Login <Icon hidden name="box-arrow-in-right" /></Button
	>
	<span>Don't have an account? <a href="/auth/register"> Sign up</a></span>
</Card>

<style>
	span {
		text-align: center;
	}
</style>
