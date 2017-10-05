let specialCharacterRegex = new RegExp(/\W/);
let whitespaceRegex = new RegExp(/\s/);
let alphaCharRegex = new RegExp(/^[a-zA-Z]+$/);

// let divEle = document.getElementById('textarea');
// divEle.oninput = function(){
// 	let text = divEle.innerText;
// 	let c = text.substring(text.length - 1);
// 	// console.log(c);
// 	if(whitespaceRegex.test(c)){
// 		console.log('Whitespace ignoring');
// 	}
// 	else if(specialCharacterRegex.test(c)){
// 		console.log('special char')
// 		// text = text.slice(0, -1) + `<span class="special-char">${c}</span>`;
// 		divEle.innerHTML = divEle.innerHTML.replace(/&.*;/, `<span class="special-char">${c}</span>`);
// 		// placeCaretAtEnd(divEle);
// 	}
// 	else {
// 		console.log('This is something else');
// 	}
// };

let inputString = "This is a random text. Hello World";

let letter = '';
let alphaChar = false
let finalOutput = '';
let stringCollector = '';

for(let i = 0; i < inputString.length; i++){
	// console.log(inputString[i])
	letter = inputString[i]
	// if(whitespaceRegex.test(letter)){
	// 	console.log(letter + ' - Whitespace')
	// }
	// else if(specialCharacterRegex.test(letter)){
	// 	console.log(letter + ' - Special Character')
	// }
	// else {
	// 	console.log(letter + ' - Alphabetical character')
	// 	if(alphaChar === false) {
	// 		alphaChar = true
	// 	}
	// }

	if(alphaCharRegex.test(letter)){
		if(alphaChar === false) {
			alphaChar = true
		}
		stringCollector += letter
	}
	else {
		if(alphaChar === true) {
			/*
			End of collecting alphabetical character; stringCollector contains the string till now.
			Check if it is a keyword. If it is a keyword, add class "keyword" otherwise add class "alphabets"
			*/ 
			finalOutput += `<span class="alphabets">${stringCollector}</span>`
			stringCollector = ''
		}

		// Separate white spaces and special characters
		if(whitespaceRegex.test(letter)){
			// console.log(letter + ' - Whitespace')
		}
		else if(specialCharacterRegex.test(letter)){
			// console.log(letter + ' - Special Character')
			finalOutput += `<span class="punctuation">${letter}</span>`
		}
	}
}