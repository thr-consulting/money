'use strict';

exports.__esModule = true;
exports.makeMoney = makeMoney;
exports.roundTo = roundTo;
exports.formatMoney = formatMoney;
exports.transformObjectsToMoney = transformObjectsToMoney;

var _jsMoney = require('js-money');

var _jsMoney2 = _interopRequireDefault(_jsMoney);

var _accounting = require('accounting');

var _accounting2 = _interopRequireDefault(_accounting);

var _transform = require('lodash/transform');

var _transform2 = _interopRequireDefault(_transform);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.
 * @param {Object|decimal} objOrDecimal - The object or decimal to convert to Money.
 * @param {string} currency - If converting a decimal, specifies the currency to use.
 * @return {Money}
 */
function makeMoney(objOrDecimal) {
  var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'CAD';

  if (!objOrDecimal) return new _jsMoney2.default(0, _jsMoney2.default.CAD);
  if ((0, _isNumber2.default)(objOrDecimal)) return _jsMoney2.default.fromDecimal(objOrDecimal, currency);
  if (objOrDecimal.amount && objOrDecimal.currency) return new _jsMoney2.default(objOrDecimal.amount, objOrDecimal.currency);
  return new _jsMoney2.default(0, _jsMoney2.default.CAD);
}

/**
 * Rounds a decimal value to a certain number of decimal digits.
 * @param {number} value - A number to round.
 * @param {number} decimals - The number of decimal digits to round to.
 * @return {number} - The rounded number.
 */
function roundTo(value, decimals) {
  return Number(Math.round(value + 'e' + decimals).toString() + 'e-' + decimals);
}

/**
 * Formats a Money value to a nice string.
 * @param {Money} money - The Money value
 * @param {bool} symbol - If true displays the proper currency symbol
 * @return {string} The formatted Money string
 */
function formatMoney(money) {
  var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return _accounting2.default.formatMoney(money.toDecimal(), symbol ? _jsMoney2.default[money.currency].symbol_native : '', _jsMoney2.default[money.currency].decimal_digits);
}

/**
 * Transforms anything that has Money style objects into Money.
 * @param obj
 * @returns {*}
 */
function transformObjectsToMoney(obj) {
  if ((0, _isArray2.default)(obj)) {
    return (0, _map2.default)(obj, function (v) {
      return transformObjectsToMoney(v);
    });
  }
  if ((0, _isObject2.default)(obj)) {
    if (obj.amount && obj.currency) return new _jsMoney2.default(obj.amount, obj.currency);
    return (0, _transform2.default)(obj, function (result, value, key) {
      result[key] = transformObjectsToMoney(value); // eslint-disable-line no-param-reassign
    }, {});
  }
  return obj;
}