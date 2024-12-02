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
  