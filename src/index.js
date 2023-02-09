const NUMBERS_BASE = new Map();

NUMBERS_BASE.set(2, 'twen');
NUMBERS_BASE.set(3, 'thir');
NUMBERS_BASE.set(4, 'four');
NUMBERS_BASE.set(5, 'fif');
NUMBERS_BASE.set(6, 'six');
NUMBERS_BASE.set(7, 'seven');
NUMBERS_BASE.set(8, 'eigh');
NUMBERS_BASE.set(9, 'nine');

let dozen = new Map();
dozen.set(0, "zero");
dozen.set(1, "one");
dozen.set(2, "two");
dozen.set(3, "three");
dozen.set(4, "four");
dozen.set(5, "five");
dozen.set(6, "six");
dozen.set(7, "seven");
dozen.set(8, "eight");
dozen.set(9, "nine");
dozen.set(10, "ten");
dozen.set(11, "eleven");
dozen.set(12, "twelve");

module.exports = function toReadable(number) {
  switch (String(number).length) {
    case 1: return checkSingleDigitNumber(number); // вызов функции, которая проверяет однозначные числа      
    case 2: return checkTwoDigitNumber(number); // вызов функции, которая проверяет двухзначные числа      
    case 3: return checkThreeDigitNumber(number); // вызов функции, которая проверяет трехзначные числа      
  }
}

// реализация функции перевода числа в строку для однозначных чисел
function checkSingleDigitNumber(number) {
  if (number > 9) {
    return 'the number is too big';
  }
  return dozen.get(number);
}

// реализация функции перевода числа в строку для двухзначных чисел
function checkTwoDigitNumber(number) {

  const dozens = Math.trunc(number / 10);
  const units = number % 10;
  let answer = '';

  if (number >= 10 && number <= 12) {
    return dozen.get(number);
  }

  if (number >= 13 && number <= 19) {
    return NUMBERS_BASE.get(units) + 'teen';
  }

  if (dozens > 1) {
    answer = NUMBERS_BASE.get(dozens) + 'ty';
    if (dozens === 4) {
      answer = 'forty';
    }
  }

  if (units > 0) {
    if (answer !== '') {
      answer += ' ';
    }
    answer = answer + checkSingleDigitNumber(units);
  }

  return answer;
}

// реализация функции перевода числа в строку для трехзначных чисел
function checkThreeDigitNumber(number) {

  const hundreds = Math.trunc(number / 100);
  const remainder = number % 100;
  let hundredWord = 'hundred';

  if (remainder !== 0) {
    hundredWord = hundredWord + ' ';
  }
  return checkSingleDigitNumber(hundreds) + ' ' + hundredWord + checkTwoDigitNumber(remainder);
}
