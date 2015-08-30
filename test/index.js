var should = require('chai').should(),
    cuit_validator = require('../index'),
    validate = cuit_validator.validate,
    formatted = cuit_validator.formatted,
    unformatted = cuit_validator.unformatted;

describe('validate', function() {
  it('accepts both numbers and strings', function() {
    validate(20342125574).should.equal(validate('20342125574'));
  });

  it('accepts both formatted and unformatted CUITs', function() {
    validate('20342125574').should.equal(validate('20-34212557-4'));
  });

  it('returns false if check digit is not correct', function() {
    validate('20342125571').should.equal(false);
  });

  it('returns true if check digit is correct', function() {
    validate('20342125574').should.equal(true);
  });

  it('returns false if type digits are not valid', function() {
    validate('21342125570').should.equal(false);
  });

  it('returns false if input is not valid', function() {
    validate(false).should.equal(false)
    && validate({ cuit: '20-34212557-4' }).should.equal(false)
    && validate(['teléfono']).should.equal(false);
  });
});

describe('formatted', function() {
  it('returns a formatted string for valid CUITs', function() {
    formatted(20342125574).should.equal('20-34212557-4');
  });
});

describe('unformatted', function() {
  it('returns an unformatted string for valid CUITs', function() {
    unformatted('20-34212557-4').should.equal('20342125574');
  });
});
