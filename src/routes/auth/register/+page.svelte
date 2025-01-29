<!--Login page-->

<script lang="ts">
	import { REGEX_VALIDATORS } from '$lib';
	import {
		Badge,
		Button,
		Card,
		Icon,
		Input,
		InputGroup,
		InputGroupText
	} from '@sveltestrap/sveltestrap';

	let passwordFieldFocused = $state(false);
	let obscurePassword = $state(true);

	let allPasswordErrorMessages: string[] = Object.values(REGEX_VALIDATORS.password).map(
		(a) => a.errorMessage
	);
	let passwordErrorMessages: string[] = $state(allPasswordErrorMessages);

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	function onChangePassword(event: Event) {
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
</script>

<Card class="p-5 gap-4">
	<h1 class="mb-4">Start sharing your dreams</h1>

	<div class="d-flex flex-column gap-1">
		<Input
			disabled={false}
			invalid={(email.match(REGEX_VALIDATORS.email.regex) || []).length === 0 &&
				email.length > 0}
			placeholder="Email"
			plaintext={false}
			reverse={false}
			type="email"
			feedback={REGEX_VALIDATORS.email.errorMessage}
			bind:value={email}
		/>

		<InputGroup>
			<Input
				disabled={false}
				invalid={passwordErrorMessages.length > 0 && password.length > 0}
				placeholder="Password"
				plaintext={false}
				reverse={false}
				type={obscurePassword ? 'password' : 'text'}
				on:keyup={onChangePassword}
				on:focus={() => {
					passwordFieldFocused = true;
				}}
				bind:value={password}
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
		{#if passwordFieldFocused && passwordErrorMessages.length != 0}
			<div id="password-errors">
				{#each allPasswordErrorMessages as errorMessage}
					<Badge
						color={passwordErrorMessages.includes(errorMessage) ? 'danger' : 'success'}
						>{errorMessage}</Badge
					>
				{/each}
			</div>
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
	<Button class="mt-2" color="primary" on:click={() => (obscurePassword = !obscurePassword)}
		>Register <Icon hidden name="box-arrow-in-right" /></Button
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
