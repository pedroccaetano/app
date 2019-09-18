const utils = {
  currencyFormat(num) {
    const number = num.toFixed(2).split('.');
    number[0] = `R$ ${number[0].split(/(?=(?:...)*$)/).join('.')}`;
    return number.join(',');
  },
};

export default utils;
