'use strict';

exports.__esModule = true;
exports.default = moneyInputMask;

require('inputmask/dist/inputmask/inputmask.numeric.extensions');

var _inputmask = require('inputmask');

var _inputmask2 = _interopRequireDefault(_inputmask);

var _jsMoney = require('js-money');

var _jsMoney2 = _interopRequireDefault(_jsMoney);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function moneyInputMask(_ref) {
	var element = _ref.element,
	    currency = _ref.currency,
	    onChange = _ref.onChange,
	    onKeydown = _ref.onKeydown;

	function onComplete(ev) {
		onChange(ev.target.value);
	}

	function onCleared() {
		onChange(0);
	}

	var im = new _inputmask2.default({
		alias: 'numeric',
		groupSeparator: ',',
		autoGroup: true,
		digits: _jsMoney2.default[currency].decimal_digits,
		digitsOptional: false,
		// prefix: `${Money[currency].symbol} `,
		placeholder: '0',
		autoUnmask: true,
		oncomplete: onComplete,
		oncleared: onCleared,
		onKeyDown: onKeydown
	});
	im.mask(element);

	return im;
}
module.exports = exports['default'];