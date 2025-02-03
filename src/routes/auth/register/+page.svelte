<!--Login page-->

<script lang="ts">
	import { REGEX_VALIDATORS, isErrorEntry } from '$lib';
	import {
		Badge,
		Button,
		Card,
		Icon,
		Input,
		InputGroup,
		InputGroupText
	} from '@sveltestrap/sveltestrap';
	import { AuthHelper } from '../helper';
	import type { ErrorEntry } from '$lib/types';

	let passwordFieldFocused = $state(false);
	let obscurePassword = $state(true);

	let allPasswordErrorMessages: string[] = Object.values(REGEX_VALIDATORS.password).map(
		(a) => a.errorMessage
	);
	let passwordErrorMessages: string[] = $state(allPasswordErrorMessages);

	let firstName = $state('Apollo');
	let lastName = $state('Alves');
	let email = $state('apollo@gmail.com');
	let password = $state('Apollo2024$');
	let confirmPassword = $state('Apollo2024$');

	let emailErrorMessage: string | undefined = $state(undefined);
	let passwordErrorMessage: string | undefined = $state(undefined);

	function onChangePassword() {
		const value: string = password;
		passwordErrorMessages = [];
		if ((value.match(REGEX_VALIDATORS.password.hasEightDigits.regex) || []).length === 0) {
			// Eight digits required error
			passwordErrorMessages.push(REGEX_VALIDATORS.password.hasEightDigits.errorMessage);
		}

		if ((value.match(REGEX_VALIDATORS.password.hasSymbols.regex) || []).length === 0) {
			// Symbol required error
			passwordErrorMessages.push(REGEX_VALIDATORS.password.hasSymbols.errorMessage);
		}

		if ((value.match(REGEX_VALIDATORS.password.hasNumbers.regex) || []).length === 0) {
			// Number required error
			passwordErrorMessages.push(REGEX_VALIDATORS.password.hasNumbers.errorMessage);
		}

		if ((value.match(REGEX_VALIDATORS.password.hasLetters.regex) || []).length === 0) {
			// Letter required error
			passwordErrorMessages.push(REGEX_VALIDATORS.password.hasLetters.errorMessage);
		}

		if ((value.match(REGEX_VALIDATORS.password.startsCapitalized.regex) || []).length === 0) {
			// Start with a capital letter error
			passwordErrorMessages.push(REGEX_VALIDATORS.password.startsCapitalized.errorMessage);
		}
	}

	let isErrorFields = $state(true);

	$effect(() => {
		isErrorFields =
			(email.match(REGEX_VALIDATORS.email.regex) || []).length === 0 ||
			passwordErrorMessages.length > 0 ||
			password != confirmPassword;
	});

	async function registerUser() {
		const response = await AuthHelper.registerUser({
			firstName,
			lastName,
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
			invalid={(firstName.match(REGEX_VALIDATORS.firstName.regex) || []).length === 0 &&
				firstName.length > 0}
			placeholder="First name"
			plaintext={false}
			reverse={false}
			type="text"
			bind:value={firstName}
		/>
		{#if (firstName.match(REGEX_VALIDATORS.firstName.regex) || []).length === 0 && firstName.length > 0}
			<div class="invalid-feedback">{REGEX_VALIDATORS.firstName.errorMessage}</div>
		{/if}
		<Input
			disabled={false}
			invalid={(lastName.match(REGEX_VALIDATORS.lastName.regex) || []).length === 0 &&
				lastName.length > 0}
			placeholder="Last name"
			plaintext={false}
			reverse={false}
			type="text"
			bind:value={lastName}
		/>
		{#if (lastName.match(REGEX_VALIDATORS.lastName.regex) || []).length === 0 && lastName.length > 0}
			<div class="invalid-feedback">{REGEX_VALIDATORS.lastName.errorMessage}</div>
		{/if}
		<Input
			disabled={false}
			invalid={((email.match(REGEX_VALIDATORS.email.regex) || []).length === 0 &&
				email.length > 0) ||
				typeof emailErrorMessage == 'string'}
			placeholder="Email"
			plaintext={false}
			reverse={false}
			type="email"
			bind:value={email}
			on:keydown={() => {
				emailErrorMessage = undefined;
			}}
		/>
		{#if ((email.match(REGEX_VALIDATORS.email.regex) || []).length === 0 && email.length > 0) || emailErrorMessage}
			<div class="invalid-feedback">
				{emailErrorMessage ? emailErrorMessage : REGEX_VALIDATORS.email.errorMessage}
			</div>
		{/if}
		<InputGroup>
			<Input
				disabled={false}
				invalid={(passwordErrorMessages.length > 0 && password.length > 0) ||
					passwordErrorMessage}
				placeholder="Password"
				plaintext={false}
				reverse={false}
				type={obscurePassword ? 'password' : 'text'}
				on:keyup={onChangePassword}
				on:focus={() => {
					passwordFieldFocused = true;
				}}
				bind:value={password}
				on:change={() => {
					if (passwordErrorMessage) passwordErrorMessage = undefined;
				}}
			/>
			<InputGroupText class="p-0">
				<Button
					color="primary"
					class="w-100 h-100 m-0 rounded-2 rounded-start-0"
					on:click={() => (obscurePassword = !obscurePassword)}
					><Icon name={obscurePassword ? 'eye-fill' : 'eye-slash-fill'} /></Button
				>
			</InputGroupText>
		</InputGroup>
		{#if (passwordErrorMessages.length > 0 && password.length > 0) || passwordErrorMessage}
			{#if passwordErrorMessage}
				<div class="invalid-feedback">
					{passwordErrorMessage}
				</div>
			{:else}
				<div id="password-errors">
					{#each allPasswordErrorMessages as errorMessage}
						<Badge
							color={passwordErrorMessages.includes(errorMessage)
								? 'danger'
								: 'success'}>{errorMessage}</Badge
						>
					{/each}
				</div>
			{/if}
		{/if}
		<Input
			disabled={false}
			invalid={password != confirmPassword}
			placeholder="Confirm Password"
			plaintext={false}
			reverse={false}
			type={obscurePassword ? 'password' : 'text'}
			bind:value={confirmPassword}
		/>
		{#if password != confirmPassword}
			<div class="invalid-feedback">Must match password</div>
		{/if}
	</div>
	<Button
		class="mt-2"
		color={isErrorFields ? 'secondary' : 'primary'}
		on:click={isErrorFields ? () => {} : registerUser}
		disabled={isErrorFields}>Register <Icon hidden name="box-arrow-in-right" /></Button
	>
	<span>Already have an account? <a href="/auth"> Login</a></span>
</Card>

<style>
	span {
		text-align: center;
	}
	#password-errors {
		margin-top: 8px;
		margin-inline: auto;
		max-width: 450px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 2px;
		justify-content: center;
	}
</style>
