<nav>
	<h1
		on:click={() => {
			window.open('/', '_self');
		}}
	>
		shrt <span>link</span>
	</h1>
</nav>
<div class="slot-container">
	<slot />
</div>

<style>
	.slot-container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	nav > h1 {
		cursor: pointer;
	}
	nav > h1 {
		font-weight: bold;
	}

	nav > h1 > span {
		font-weight: normal;
	}
	nav {
		padding: 8px;
		padding-inline: 32px;
		display: flex;
		flex-direction: row;
		justify-content: start;
		width: 100%;
		/* background: gray; */
	}
</style>
