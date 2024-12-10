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
const RomanoArabe = {"a":"I", "e": "II", "i": "III", "o": "IV", "u": "V",
  'b': '1', 'c': '2', 'd': '3', 'f': '4', 'g': '5', 'h': '6',
  'j': '7', 'k': '8', 'l': '9', 'm': '10', 'n': '11', 'p': '12',
  'q': '13', 'r': '14', 's': '15', 't': '16', 'v': '17', 'w': '18',
  'x': '19', 'y': '20', 'z': '21', " ": ""}
const reverse_RomanoArabe = {
  'I': 'a', 'II': 'e', 'III': 'i', 'IV': 'o', 'V': 'u',  /* Roman numerals to vowels */
  '1': 'b', '2': 'c', '3': 'd', '4': 'f', '5': 'g', '6': 'h',  /* Custom numbers to consonants  */
  '7': 'j', '8': 'k', '9': 'l', '10': 'm', '11': 'n', '12': 'p',
  '13': 'q', '14': 'r', '15': 's', '16': 't', '17': 'v', '18': 'w',
  '19': 'x', '20': 'y', '21': 'z', "": " "
  }




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
return text.split(' ').map(code => reverseMorse[code] ).join('');
}

function identity(text) {
  return text
}
function unvailable_decode(text) {
  return "Descodificação não disponível para esta cifra";
}

function reverse(text) {
  return text.split('').reverse().join(''); 
}
function metades_encode(text) {

    // Remove spaces from the input text
    text = text.replace(/ /g, "");
    
    // Use slicing to get characters at even and odd indices
    let first = "", second = "";
    for (let i = 0; i < text.length; i++) {
      if (i % 2 === 0) {
        first += text[i];  // Characters at even indices
      } else {
        second += text[i]; // Characters at odd indices
      }
    }
    
    return `${first} ${second}`;

}

function metades_decode(text) {
  // Split the encoded text into two parts
  const [first, second] = text.split(" ");
  
  // Interleave characters from both parts using a loop
  let result = "";
  let maxLength = Math.max(first.length, second.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < first.length) result += first[i];
    if (i < second.length) result += second[i];
  }

  return result;
}

function RomanoArabe_encode(text) {
  return text.split('').map(char => RomanoArabe[char.toLowerCase()] || char).join(' ');
}
function RomanoArabe_decode(text) {
  return text.split(' ').map(char => reverse_RomanoArabe[char] || char).join('');  
}



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
  },
  reverse: {
    explanation: "As letras e as palavras são escritas ao contrário",
    name: "Caranguejo",
    encode: reverse,
    decode: reverse
  }, 
  metades: {
    explanation: "As letras da mensagem são dispostas alternadamente numa tabela de duas colunas.",
    name: "Metades",
    encode: metades_encode,
    decode: metades_decode  },
  RomanoArabe: {
    explanation: "As vogais são numeradas em romano, e as consoantes em árabe.",
    name: "Romano Arabe",
    encode: RomanoArabe_encode,
    decode: RomanoArabe_decode}
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