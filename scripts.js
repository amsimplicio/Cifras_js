
// Cipher explanations
const ciphers = {
  caesar: {
    explanation: "The Caesar Cipher parameters each letter in the plaintext by a fixed number of positions in the alphabet. For example, a parameter of 3 turns A into D.",
    name: "Caesar Cipher"
  },
  morse: {
    explanation:"Morse Code represents letters and numbers using dots (.) and dashes (-). For example, A is .- and B is -...",
    name: "Morse Code"
  },
  pigpen:{
    explanation: "The Pigpen Cipher replaces letters with symbols derived from a grid or shapes. Each letter has a corresponding unique symbol.",
    name: "Pigpen Cipher"
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
  explanationElement.textContent = ciphers[cipher]["explanation"] || "Select a cipher to see its explanation.";
}

function updateParameterVisibility() {
  const cipher = document.getElementById("cipher").value;
  parameter.style.display = requireParam.has(cipher) ? "block" : "none";
}

function caesarCipher(text, parameter, encode = true) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    parameter = encode ? parameter : -parameter;
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // Non-alphabetic characters
        return alphabet[(index + parameter + 26) % 26];
      })
      .join('');
  }
  
function encode() {
  const text = document.getElementById('input').value;
  const cipher = document.getElementById('cipher').value;
  const parameter = parseInt(document.getElementById('parameter').value || 0, 10);
  let output = '';

  if (cipher === 'caesar') {
    output = caesarCipher(text, parameter, true);
  } else if (cipher === 'morse') {
    output = text.split('').map(char => MORSE_CODE[char.toUpperCase()] || char).join(' ');
  }

  document.getElementById('output').value = output;
}

function decode() {
  const text = document.getElementById('input').value;
  const cipher = document.getElementById('cipher').value;
  const parameter = parseInt(document.getElementById('parameter').value || 0, 10);
  let output = '';

  if (cipher === 'caesar') {
    output = caesarCipher(text, parameter, false);
  } else if (cipher === 'morse') {
    const reverseMorse = Object.fromEntries(Object.entries(MORSE_CODE).map(([k, v]) => [v, k]));
    output = text.split(' ').map(code => reverseMorse[code] || code).join('');
  }

  document.getElementById('output').value = output;
}

const MORSE_CODE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
  H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
  O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-',
  V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..', '1': '.----',
  '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....',
  '7': '--...', '8': '---..', '9': '----.', '0': '-----'
};


// Populate the dropdown on page load
document.addEventListener("DOMContentLoaded", populateCipherDropdown);