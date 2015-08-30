/**
 * Verifies the check digit matches modulo 11 alogrithm
 * @param  {string} cuit An 11 digit number as string
 * @return {boolean}      TRUE if the check digit is valid. FALSE otherwise.
 */
function validateCheckDigit(cuit) {
  if(cuit.length != 11) {
    return false;
  }

  var acumulado = 0;
  var digitos   = cuit.split("");
  var digito    = digitos.pop();

  for(var i = 0; i < digitos.length; i++) {
   acumulado += digitos[9 - i] * (2 + (i % 6));
  }

  var verif = 11 - (acumulado % 11);
  if(verif == 11) {
    verif = 0;
  } else if(verif == 10) {
    verif = 9;
  }

  return digito == verif;
}

/**
 * Verifies the 2 first digits are valid, as per AFIP's specs
 * @param  {string} cuit An 11 digit number as string
 * @return {boolean}      TRUE if the first 2 digits are among the AFIP's specs
 */
function validateTypeDigits(cuit) {
  var valid_check_digits = ['20', '23', '27', '30', '33'];
  return valid_check_digits.indexOf(cuit.substr(0, 2)) !== -1;
}

/**
 * Returns a string-typed number
 */
function toNumericString(input) {
  return input.toString().replace(/\D/g,'');
}

/**
 * Checks if a CUIT is valid
 */
function validate(cuit) {
  var cuit_str = toNumericString(cuit);
  return validateCheckDigit(cuit_str) && validateTypeDigits(cuit_str);
}

/**
 * Returns a formatted CUIT (XX-XXXXXXXX-X)
 */
function formatted(cuit) {
  if(validate(cuit)) {
    var cuit_str = toNumericString(cuit);
    return cuit_str.substr(0,2) + '-' + cuit_str.substr(2,8) + '-' + cuit_str.substr(10,1);
  }
  return false;
}

/**
 * Returns an unformatted CUIT string (XXXXXXXXXXX)
 */
function unformatted(cuit) {
  if(validate(cuit)) {
    var cuit_str = toNumericString(cuit);
    return cuit_str;
  }
  return false;
}


module.exports = {
  validate: validate,
  formatted: formatted,
  unformatted: unformatted
}
