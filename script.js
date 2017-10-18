document.addEventListener("DOMContentLoaded", function(event) {

	const outputTab = document.getElementById('output-tab')
	const inputArea = document.getElementById('input-area')

	inputArea.addEventListener('input', () => {
		outputTab.innerHTML = ""
		outputTab.innerHTML = highlighter(inputArea.value)
	})
})
