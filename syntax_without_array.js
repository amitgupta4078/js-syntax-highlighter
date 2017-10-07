document.addEventListener("DOMContentLoaded", function(event) {
	const specialCharacterRegex = new RegExp(/\W/)
	const whitespaceRegex = new RegExp(/\s/)
	const alphaCharRegex = new RegExp(/^[a-zA-Z0-9]+$/)
	const keywordRegex = new RegExp(/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/)

	let letter = ''
	let finalOutput = ''
	let stringCollector = ''
	let isCollectingString = false
	let areQuotesStarted = false

	const tabSize = 4
	const maxWidth = 100
	const outputTab = document.getElementById('output-tab')
	const inputArea = document.getElementById('input-area')

	function appendString(appearsWithinQuotes) {
		if (appearsWithinQuotes) {
			finalOutput += `<span class="quoted-text">${stringCollector}</span>`
		} else {
			// Check if collected string is a keyword
			if (keywordRegex.test(stringCollector)) {
				finalOutput += `<span class="keywords">${stringCollector}</span>`
			} else {
				finalOutput += `<span class="alphabets">${stringCollector}</span>`
			}
		}
	}

	function parse(inputString) {
		for(let i = 0; i < inputString.length; i++){
			letter = inputString[i]
			if (letter === '"') {
				if (isCollectingString) {
					if (areQuotesStarted) {
						appendString(true)
						// finalOutput += `<span class="quoted-text">${stringCollector}</span>`
					} else {
						appendString(false)
						finalOutput += `<span class="alphabets">${stringCollector}</span>`
					}
					isCollectingString = false
					stringCollector = ''
				}
				areQuotesStarted = !(areQuotesStarted)
				finalOutput += `<span class="quoted-text">"</span>`
			} else {
				if(alphaCharRegex.test(letter)) {
					if (!isCollectingString) {
						isCollectingString = true
					}
					stringCollector += letter
				} else {
					if (areQuotesStarted) {
						if (isCollectingString) {
							appendString(true)
							// finalOutput += `<span class="quoted-text">${stringCollector}</span>`
							isCollectingString = false
							stringCollector = ''
						}
						finalOutput += `<span class="quoted-text">${letter}</span>`
					} else {
						if (isCollectingString) {
							appendString(false)
							// finalOutput += `<span class="alphabets">${stringCollector}</span>`
							isCollectingString = false
							stringCollector = ''
						}
						if(whitespaceRegex.test(letter)){
							// Separate tabs, carriage return, linefeeds and spaces
							if (letter === '\t') {
								finalOutput += `&nbsp&nbsp&nbsp&nbsp`
							}
							else if((letter === '\n') || (letter === '\r')) {
								finalOutput += `<br />`
							}
							else if (letter === ' ') {
								finalOutput += `&nbsp`
							}
						} else if(specialCharacterRegex.test(letter)){
							finalOutput += `<span class="punctuation">${letter}</span>`
						}
					}
				}
			}
		}

		if (isCollectingString) {
			if (areQuotesStarted) {
				appendString(true)
				// finalOutput += `<span class="quoted-text">${stringCollector}</span>`
			} else {
				appendString(false)
				// finalOutput += `<span class="alphabets">${stringCollector}</span>`
			}
		}

		outputTab.innerHTML = ""
		outputTab.innerHTML = finalOutput
		// Reset all flags
		letter = ''
		finalOutput = ''
		stringCollector = ''
		isCollectingString = false
		areQuotesStarted = false
	}

	inputArea.addEventListener('input', () => {
		parse(inputArea.value)
	})
})