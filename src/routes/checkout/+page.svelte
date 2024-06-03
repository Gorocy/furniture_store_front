<script>

import Form from '$lib/checkout/Form.svelte';
import ProgressBar from '$lib/checkout/ProgressBar.svelte';

let steps = ['Podsumowanie', 'Dostawa', 'Płatność', 'Potwierdzenie'], currentActive = 1, progressBar;
	
	const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}
</script>

<div class="stepper-div">
  <div class="container stepper-form">
		<ProgressBar class="" {steps} bind:currentActive bind:this={progressBar}/>
		
		<Form active_step={steps[currentActive-1]}/>

		<div class="step-button">
			<button class="btn" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Cofnij</button>
			<button class="btn" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Dalej</button>
		</div>		
	</div>	 


</div>

<style>
  .stepper-div{
    min-height: 600px;
    max-width: 1600px;
    margin: auto;
    
    border-radius: 25px;
    border: 6px solid #73AD21;
    margin-bottom: 30px;
  }

  .stepper-form{
    
    padding: 40px;
    margin: auto;
    max-width: 1400px;


  }

  .btn {
		background-color: #73AD21;
		color: #fff;
		border: 0;
		border-radius: 6px;
		cursor: pointer;
		font-family: inherit;
		padding: 8px 30px;
		margin: 5px;
		font-size: 14px;
    width: 100px;
	}

	.btn:active {
		transform: scale(0.98);
	}

	.btn:focus {
		outline: 0;
	}

	.btn:disabled {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}
	
	.step-button{
		margin-top: 1rem;
		text-align: center;
	}
</style>