 "use strict"

const specialCharacterRegex = new RegExp(/\W/)
const whitespaceRegex = new RegExp(/\s/)
const alphaCharRegex = new RegExp(/^[a-zA-Z0-9]+$/)
const keywordRegex = new RegExp(/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/)

let letter = ''
let finalOutput = ''
let stringCollector = ''
let isCollectingString = false
let areQuotesStarted = false
let list = ''

const appendString = function (string, appearsWithinQuotes) {
	if (appearsWithinQuotes) {
		finalOutput += `<span class="quoted-text">${string}</span>`
	} else {
		// Check if collected string is a keyword
		if (keywordRegex.test(stringCollector)) {
			finalOutput += `<span class="keywords">${string}</span>`
		} else {
			finalOutput += `<span class="alphabets">${string}</span>`
		}
	}
}

const highlighter = function (inputString) {
	// Reset all flags and variables
	letter = ''
	finalOutput = ''
	stringCollector = ''
	isCollectingString = false
	areQuotesStarted = false
	list = ''
	
	for(let i = 0; i < inputString.length; i++){
		letter = inputString[i]
		if (letter === '"') {
			if (isCollectingString) {
				isCollectingString = false
				appendString(stringCollector, false)
				stringCollector = ''
			}
			if (!list.length) {
				areQuotesStarted = true
				list += '"'
			} else {
				list += '"'
				appendString(list, true)
				areQuotesStarted = false
				list = ''
			}
		} else {
			if (areQuotesStarted) {
				if ((letter !== '\n') && (letter !== '\r')) {
					list += letter
				}
			} else {
				if(alphaCharRegex.test(letter)) {
					stringCollector += letter
					isCollectingString = true
				} else {
					if (isCollectingString) {
						isCollectingString = false
						appendString(stringCollector, false)
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

	if (areQuotesStarted) {
		appendString(list, true)
	} else {
		if (isCollectingString) {
			appendString(stringCollector, false)
		}
	}

	// Return final DOM string
	return finalOutput
}
