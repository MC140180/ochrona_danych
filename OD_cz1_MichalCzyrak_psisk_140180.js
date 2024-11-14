function encodeCeasar(word, shiftNumber) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    return word.toUpperCase().split('').map((element) => {
        const index = alphabet.indexOf(element);
        if (index !== -1) {
            return alphabet[(index + shiftNumber) % 26];
        }
        return element; 
        
    }).join('');
}

function decodeCeasar(word, shiftNumber){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    return word.toUpperCase().split('').map((element) => {
      const ix = alphabet.indexOf(element);
        if(ix === -1) {
          return element
        }
      return alphabet.split('').at([alphabet.indexOf(element)-shiftNumber])
    }).join('');
}

function encodeVigenere(word, key){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    key = key.toUpperCase()

    return word.toUpperCase().split('').map((element, index) => {
          const shift = (alphabet.indexOf(element) + alphabet.indexOf(key[index % key.length])) % 26;
          const ix = alphabet.indexOf(element);
            if(ix === -1) {
              return element
            }
          return alphabet[shift];
    }).join('');
}

function decodeVigenere(word, key){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    key = key.toUpperCase()

    return word.toUpperCase().split('').map((element, index) => {
      const ix = alphabet.indexOf(element);
        if(ix === -1) {
          return element
        }
      return alphabet.split('').at((alphabet.indexOf(element) - alphabet.indexOf(key[index % key.length])))
    }).join('')
    ;
}

function breakTheCode(word, recordsNumber) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  word = word.toUpperCase();
  let decryptedWords = [''];
  for (let i = 0; i < 26; i++) {
      const decryptedWord = word.split('').map(sign => {
      const ix = alphabet.indexOf(sign);
        if(ix === -1) {
          return sign
        }

          const newIndex = (alphabet.indexOf(sign) - i + 26) % 26; 
          return alphabet[newIndex];
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



