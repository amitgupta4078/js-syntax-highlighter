document.addEventListener("DOMContentLoaded", function(event) {
	let specialCharacterRegex = new RegExp(/\W/)
	let whitespaceRegex = new RegExp(/\s/)
	let alphaCharRegex = new RegExp(/^[a-zA-Z]+$/)

	let letter = ''
	let alphaChar = false
	let finalOutput = ''
	let stringCollector = ''
	let isString = false

	const tabSize = 4
	const maxWidth = 100
	let outputTab = document.getElementById('output-tab')

	function parse (inputString){
		for(let i = 0; i < inputString.length; i++){
			letter = inputString[i]
			if(alphaCharRegex.test(letter)){
				if(alphaChar === false) {
					alphaChar = true
				}
				stringCollector += letter
			}
			else {
				// Check if this is a string start/end
				if (letter === '"') {
					if (isString === false) {
						// Start a new string
						isString = true
						finalOutput += `<span class="string">"</span>`
					} else {
						// End the already running string
						isString = false
						// Check if some characters are entered in between the quotes
						if (alphaChar === true) {
							alphaChar = false
							finalOutput += `<span class="string">${stringCollector}</span><span class="string">"</span>`
							stringCollector = ''
						} else {
							// No characters have been entered yet empty quotes: close them
							finalOutput += `<span class="string">"</span>`
						}
					}
				}
				else {
					if(alphaChar === true) {
						/*
						End of collecting alphabetical character stringCollector contains the string till now.
						Check if it is a keyword. If it is a keyword, add class "keyword" otherwise add class "alphabets"
						*/ 
						alphaChar = false
						finalOutput += `<span class="alphabets">${stringCollector}</span>`
						stringCollector = ''
					}

					// Separate white spaces and special characters
					if(whitespaceRegex.test(letter)){
						// Separate tabs, carriage return, linefeeds and spaces
						if (letter === '\t') {
							console.log('It is a tab')
							finalOutput += `&nbsp&nbsp&nbsp&nbsp`
						}
						else if((letter === '\n') || (letter === '\r')) {
							console.log('It is a new line')
							finalOutput += `<br />`
						}
						else if (letter === ' ') {
							console.log('It is a space character')
							finalOutput += `&nbsp`
						}
					} else if(specialCharacterRegex.test(letter)){
						finalOutput += `<span class="punctuation">${letter}</span>`
					}					
				}
			}
		}

		// Handle case if input ends with alphabetical string
		if(alphaChar === true) {
			if (isString === true) {
				finalOutput += `<span class="string">${stringCollector}</span>`
			} else {
				finalOutput += `<span class="alphabets">${stringCollector}</span>`
			}
			alphaChar = false
			stringCollector = ''
		}

		outputTab.innerHTML = ""
		outputTab.innerHTML = finalOutput
		// Reset all flags
		letter = ''
		alphaChar = false
		finalOutput = ''
		stringCollector = ''
		isString = false
	}

	var inputArea = document.getElementById('input-area')
	inputArea.addEventListener('input', () => {
		parse(inputArea.value)
	})

})