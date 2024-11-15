const readline = require('readline');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function sortWordsByLetterA_ASC(decryptedWords) {
  return  decryptedWords.sort((a, b) => {
    const countA = a.split('').filter(letter => letter === 'A').length;
    const countB = b.split('').filter(letter => letter === 'A').length;
    return countB - countA;
});
}

function encodeCeasar(word, shiftNumber) {
    return word.toUpperCase().split('').map((element) => {
        if (alphabet.indexOf(element) === -1) {
          return element; 
        }
        return alphabet[(alphabet.indexOf(element) + shiftNumber) % 26];
        
    }).join('');
}

function decodeCeasar(word, shiftNumber){
    return word.toUpperCase().split('').map((element) => {
        if(alphabet.indexOf(element)=== -1) {
          return element
        }
      return alphabet[((alphabet.indexOf(element)-shiftNumber)+26) %26]
    }).join('');
}

function encodeVigenere(word, key) {
  key = key.toUpperCase();
  let consumeKey = 0;
  return word.toUpperCase().split('').map((element) => {
      if (alphabet.indexOf(element) === -1) {
          return element;
      }
      const shift = (alphabet.indexOf(element) + alphabet.indexOf(key[consumeKey % key.length])) % 26;
      consumeKey++;
      return alphabet[shift];
  }).join('');
}

function decodeVigenere(word, key) {
  key = key.toUpperCase();
  let consumeKey = 0;
  return word.toUpperCase().split('').map((element) => {
      if (alphabet.indexOf(element) === -1) {
          return element;
      }
      const shift = (alphabet.indexOf(element) - alphabet.indexOf(key[consumeKey % key.length]) + 26) % 26;
      consumeKey++;
      return alphabet[shift];
  }).join('');
}

function breakTheCode(word, recordsNumber) {
  word = word.toUpperCase();
  let decryptedWords = [''];
  for (let i = 0; i < 26; i++) {
      const decryptedWord = decodeCeasar(word, i)
      decryptedWords.push(decryptedWord)
      decryptedWords = sortWordsByLetterA_ASC(decryptedWords)
  }
  
  return decryptedWords.slice(0, recordsNumber);
}



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function promptUser() {
  rl.question("Wybierz operację:\n1 - Szyfr Cezara\n2 - Szyfr Vigenere\n3 - Łamanie szyfru Cezara\nWybór: ", (operation) => {
    if (operation === "3") {
      rl.question("Podaj zaszyfrowany tekst do złamania: ", (encryptedText) => {
        rl.question("Podaj liczbę wyników do wyświetlenia: ", (recordsNumber) => {
          const records = parseInt(recordsNumber);
          console.log("Najlepsze odszyfrowania (Cezar - automatyczny):", breakTheCode(encryptedText, records));
          rl.close();
        });
      });
    } else {
      rl.question("Wybierz:\n1 - Kodowanie\n2 - Odszyfrowywanie\nWybór: ", (action) => {
        rl.question("Podaj tekst do zakodowania/odszyfrowania: ", (inputWord) => {
          rl.question("Podaj przesunięcie (dla Cezara) lub klucz (dla Vigenere): ", (shiftOrKey) => {
            if (operation === "1") {
              const shift = parseInt(shiftOrKey);
              if (action === "1") {
                console.log("Zakodowany tekst (Cezar):", encodeCeasar(inputWord, parseInt(shift)));
              } else if (action === "2") {
                console.log("Odszyfrowany tekst (Cezar):", decodeCeasar(inputWord, parseInt(shift)));
              } else {
                console.log("Nieprawidłowy wybór akcji.");
              }
            } else if (operation === "2") {
              if (action === "1") {
                console.log("Zakodowany tekst (Vigenere):", encodeVigenere(inputWord, shiftOrKey));
              } else if (action === "2") {
                console.log("Odszyfrowany tekst (Vigenere):", decodeVigenere(inputWord, shiftOrKey));
              } else {
                console.log("Nieprawidłowy wybór akcji.");
              }
            } else {
              console.log("Nieprawidłowa operacja.");
            }
            rl.close();
          });
        });
      });
    }
  });
}

promptUser();
