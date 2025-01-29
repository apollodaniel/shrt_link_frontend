<!--Login page-->

<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		Icon,
		Input,
		InputGroup,
		InputGroupText
	} from '@sveltestrap/sveltestrap';

	let obscurePassword = $state(true);

	let email = $state('');
	let password = $state('');
</script>

<Card class="p-5 gap-4">
	<h1 class="mb-4">Start sharing your dreams</h1>

	<div class="d-flex flex-column gap-1">
		<Input
			disabled={false}
			invalid={false}
			placeholder="Email"
			plaintext={false}
			reverse={false}
			type="email"
			valid={false}
			bind:value={email}
		/>
		<InputGroup>
			<Input
				disabled={false}
				placeholder="Password"
				plaintext={false}
				reverse={false}
				type={obscurePassword ? 'password' : 'text'}
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
	</div>
	<Button class="mt-2" color="primary" on:click={() => (obscurePassword = !obscurePassword)}
		>Login <Icon hidden name="box-arrow-in-right" /></Button
	>
	<span>Don't have an account? <a href="/auth/register"> Sign up</a></span>
</Card>

<style>
	span {
		text-align: center;
	}
</style>
