
// Cipher explanations
const cipherExplanations = {
  caesar: "The Caesar Cipher shifts each letter in the plaintext by a fixed number of positions in the alphabet. For example, a shift of 3 turns A into D.",
  morse: "Morse Code represents letters and numbers using dots (.) and dashes (-). For example, A is .- and B is -...",
  pigpen: "The Pigpen Cipher replaces letters with symbols derived from a grid or shapes. Each letter has a corresponding unique symbol."
};

// Function to update the explanation when a cipher is selected
function updateExplanation() {
  const cipher = document.getElementById("cipher").value;
  const explanationElement = document.getElementById("cipher-explanation");
  explanationElement.textContent = cipherExplanations[cipher] || "Select a cipher to see its explanation.";
}

function caesarCipher(text, shift, encode = true) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    shift = encode ? shift : -shift;
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        const index = alphabet.indexOf(char);
        if (index === -1) return char; // Non-alphabetic characters
        return alphabet[(index + shift + 26) % 26];
      })
      .join('');
  }
  
function encode() {
  const text = document.getElementById('input').value;
  const cipher = document.getElementById('cipher').value;
  const shift = parseInt(document.getElementById('shift').value || 0, 10);
  let output = '';

  if (cipher === 'caesar') {
    output = caesarCipher(text, shift, true);
  } else if (cipher === 'morse') {
    output = text.split('').map(char => MORSE_CODE[char.toUpperCase()] || char).join(' ');
  }

  document.getElementById('output').value = output;
}

function decode() {
  const text = document.getElementById('input').value;
  const cipher = document.getElementById('cipher').value;
  const shift = parseInt(document.getElementById('shift').value || 0, 10);
  let output = '';

  if (cipher === 'caesar') {
    output = caesarCipher(text, shift, false);
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
