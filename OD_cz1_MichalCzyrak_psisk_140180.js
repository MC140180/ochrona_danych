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
      return alphabet[((alphabet.indexOf(element) - alphabet.indexOf(key[index % key.length]))+26) %26]
    }).join('')
    ;
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


console.log(encodeCeasar('michal czyrak', 140180 % 26))
console.log(decodeCeasar(encodeCeasar('michal czyrak', 140180 % 26), 140180 % 26))
console.log(encodeVigenere('michal czyrak', 'rune'))
console.log(decodeVigenere(encodeVigenere('michal czyrak', 'rune'), 'rune'))

console.log(breakTheCode(encodeCeasar('Jasny ksiezyc odbijal sie w tafli jeziora, a wokol panowala cisza przerywana jedynie szelestem lisci poruszanych delikatnym wiatrem', 140180 % 26),10))




