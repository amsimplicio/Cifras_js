function caesarCipher(text, parameter, encode = true) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var shift = alphabet.indexOf(parameter.charAt(0));
  shift = encode ? shift : -shift; // Reverse shift for decoding
  //shift = 3;
  // Process text
  return text
    .split('')
    .map(char => {
      const isUpperCase = char === char.toUpperCase(); // Check case
      const upperChar = char.toUpperCase(); // Convert to uppercase for indexing
      const index = alphabet.indexOf(upperChar);

      if (index === -1) return char; // Keep non-alphabetic characters as is

      const newIndex = (index + shift +26 ) % 26; // Calculate new index
      const shiftedChar = alphabet[newIndex];

      return isUpperCase ? shiftedChar : shiftedChar.toLowerCase(); // Preserve original case
    })
    .join('');
}


const MORSE_CODE = {
A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-',
V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..', '1': '.----',
'2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
'7': '--...', '8': '---..', '9': '----.', '0': '-----'
};
const reverseMorse = Object.fromEntries(Object.entries(MORSE_CODE).map(([k, v]) => [v, k]));
function caesar_encode(text, parameter) {
return caesarCipher(text, parameter, true);
}
function caeser_decode(text, parameter) {
return caesarCipher(text, parameter, false);
}
function morse_encode(text) {
return text.split('').map(char => MORSE_CODE[char.toUpperCase()] || char).join(' ');
}
function morse_decode(text) {
return text.split(' ').map(code => reverseMorse[code] || code).join('');
}

function identity(text) {
  return text
}
function unvailable_decode(text) {
  return "Descodificação não disponível para esta cifra";}




// Cipher explanations
const ciphers = {
  caesar: {
    explanation:  "Por baixo do alfabeto nomal, escreve-se mesmo alfabeto, mas começando na letra chave do código. " +
        "Se, por exemplo, a chave do código for V (A = V), temos: A = V, B = W, .., F = A, G = B..." ,
    name: "Alfabeto Transposto",
    encode: caesar_encode,
    decode: caeser_decode
  },
  morse: {
    explanation:"Morse Code represents letters and numbers using dots (.) and dashes (-). For example, A is .- and B is -...",
    name: "Morse Code",
    encode: morse_encode,
    decode: morse_decode
  },
  pigpen:{
    explanation: "Segue a seguinte imagem: <br> <img src='images/Pigpen.png' >",
    name: "Angular",
    encode: identity ,
    decode: identity
  }
  };
const requireParam = new Set(["caesar"]);

// TODO: acabar esta função 
function populateCipherDropdown() {
  const selectElement = document.getElementById("cipher");
  
  for (const [key, value] of Object.entries(ciphers)) {
    const option = document.createElement("option");
    option.value = key; // Set the value to the key
    option.textContent = value.name; // Capitalize the first letter
    selectElement.appendChild(option);
  }
}

// Function to update the explanation when a cipher is selected
function updateExplanation() {
  const cipher = document.getElementById("cipher").value;
  const explanationElement = document.getElementById("cipher-explanation");
  explanationElement.innerHTML = ciphers[cipher]?.explanation || "Select a cipher to see its explanation.";
  if (cipher === 'pigpen') {
    output.classList.add('pigpen-font'); // Apply the Pigpen font to output
  } else {
    output.classList.remove('pigpen-font'); // Remove the Pigpen font if another cipher is selected
  }

}

function updateParameterVisibility() {
  const cipher = document.getElementById("cipher").value;
  parameter.style.display = requireParam.has(cipher) ? "block" : "none";
}


  
function encode() {
  const text = document.getElementById('input').value;
  const cipher = document.getElementById('cipher').value;
  const parameter = document.getElementById('parameter').value ;
  let output = '';

  output = ciphers[cipher]["encode"](text, parameter);

  document.getElementById('output').value = output;
}

function decode() {
  const text = document.getElementById('input').value;
  const cipher = document.getElementById('cipher').value;
  const parameter = document.getElementById('parameter').value;
  let output = '';

  output = ciphers[cipher]["decode"](text, parameter);

  document.getElementById('output').value = output;
}



// Populate the dropdown on page load
document.addEventListener("DOMContentLoaded", populateCipherDropdown);