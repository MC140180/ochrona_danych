const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function encodeCeasar(word, shiftNumber) {
    return word.toUpperCase().split('').map((element) => {
        if (alphabet.indexOf(element) !== -1) {
            return alphabet[(alphabet.indexOf(element) + shiftNumber) % 26];
        }
        return element; 
        
    }).join('');
}

function decodeCeasar(word, shiftNumber){
    return word.toUpperCase().split('').map((element) => {
        if(alphabet.indexOf(element)=== -1) {
          return element
        }
      return alphabet.split('').at([alphabet.indexOf(element)-shiftNumber])
    }).join('');
}

function encodeVigenere(word, key){
    key = key.toUpperCase()

    return word.toUpperCase().split('').map((element, index) => {
          const shift = (alphabet.indexOf(element) + alphabet.indexOf(key[index % key.length])) % 26;
          
            if(alphabet.indexOf(element)=== -1) {
              return element
            }
          return alphabet[shift];
    }).join('');
}

function decodeVigenere(word, key){
    key = key.toUpperCase()

    return word.toUpperCase().split('').map((element, index) => {
        if(alphabet.indexOf(element) === -1) {
          return element
        }
      return alphabet.split('').at((alphabet.indexOf(element) - alphabet.indexOf(key[index % key.length])))
    }).join('')
    ;
}

function breakTheCode(word, recordsNumber) {
  word = word.toUpperCase();
  let decryptedWords = [''];
  for (let i = 0; i < 26; i++) {
      const decryptedWord = word.split('').map(sign => {
        if(alphabet.indexOf(sign)=== -1) {
          return sign
        }
          return alphabet[(alphabet.indexOf(sign) - i + 26) % 26];
      });

      const aCount = decryptedWord.filter(letter => letter === 'A').length;
      if (aCount >=  1) {
          decryptedWords.push(decryptedWord.join(''));
      }

      decryptedWords.sort((a, b) => {
        const countA = a.split('').filter(letter => letter === 'A').length;
        const countB = b.split('').filter(letter => letter === 'A').length;
        return countB - countA;
    });
  }
  
  return decryptedWords.slice(0, recordsNumber);
}



console.log(encodeCeasar('michal czyrak', 140180 % 26))
console.log(decodeCeasar(encodeCeasar('michal czyrak', 140180 % 26), 140180 % 26))
console.log(encodeVigenere('michal czyrak', 'rune'))
console.log(decodeVigenere(encodeVigenere('michal czyrak', 'rune'), 'rune'))

console.log(breakTheCode(encodeCeasar('Jasny ksiezyc odbijal sie w tafli jeziora, a wokol panowala cisza przerywana jedynie szelestem lisci poruszanych delikatnym wiatrem', 140180 % 26),10))



