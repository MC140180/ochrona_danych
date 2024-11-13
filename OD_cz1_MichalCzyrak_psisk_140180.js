function encodeCeasar(word, shiftNumber){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    word = word.toUpperCase()
    return word.split('').map((element, index) => {
      return alphabet[(alphabet.indexOf(element)+shiftNumber) % 26]
    }).join('');
}

function decodeCeasar(word, shiftNumber){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    word = word.toUpperCase()
    return word.split('').map((element, index) => {
      return alphabet.split('').at([alphabet.indexOf(element)-shiftNumber])
    }).join('');
}

function encodeVigenere(word, key){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    word = word.toUpperCase()
    key= key.toUpperCase()

    return word.split('').map((element, index) => {
            const shift = (alphabet.indexOf(element) + alphabet.indexOf(key[index % key.length])) % 26;
            return alphabet[shift];
    }).join('');
}

function decodeVigenere(word, key){
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    word = word.toUpperCase()
    key= key.toUpperCase()

    return word.split('').map((element, index) => {
      return alphabet.split('').at((alphabet.indexOf(element) - alphabet.indexOf(key[index % key.length])))
    }).join('')
    ;
}

function breakTheCode(word, recordsNumber) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  word = word.trim().toUpperCase();
  let decryptedWords = [''];
  for (let i = 0; i < 26; i++) {
      const decryptedWord = word.split('').map(sign => {
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



console.log(encodeCeasar('michalczyrak', 140180 % 26))
console.log(decodeCeasar(encodeCeasar('michalczyrak', 140180 % 26), 140180 % 26))
console.log(encodeVigenere('michalczyrak', 'rune'))
console.log(decodeVigenere(encodeVigenere('michalczyrak', 'rune'), 'rune'))

console.log(breakTheCode('Jasny ksiezyc odbijal sie w tafli jeziora, a wokol panowala cisza przerywana jedynie szelestem lisci poruszanych delikatnym wiatrem',10))



