const utils = {
  currencyFormat(num) {
    const number = num.toFixed(2).split('.');
    number[0] = `${number[0].split(/(?=(?:...)*$)/).join('.')}`;
    return number.join(',');
  },
  convertDateToString(date, caracter = '/') {
    date = date.split('/');
    return `${date[2]}-${parseInt(date[1]) - 1}-${date[0]}`;
  },

  formataCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  mascaraCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  },

  mascaraCnpj(cnpj) {
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5'
    );
  },

  mascaraCep(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{4})(\d)/, '$1-$2');
    return cep;
  },
};

export default utils;
