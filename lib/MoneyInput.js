'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _jsMoney = require('js-money');

var _jsMoney2 = _interopRequireDefault(_jsMoney);

var _tproptypes = require('@thx/tproptypes');

var _tproptypes2 = _interopRequireDefault(_tproptypes);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _moneyInputMask = require('./moneyInputMask');

var _moneyInputMask2 = _interopRequireDefault(_moneyInputMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable jsx-a11y/no-static-element-interactions */


var d = (0, _debug2.default)('money:MoneyInput');

function moneyFromProps(value) {
	d('moneyFromProps(' + value + ')');
	var money = void 0;
	if (value) {
		if (value.toDecimal) {
			money = value;
		} else {
			money = new _jsMoney2.default(value.amount, value.currency);
		}
	} else {
		money = new _jsMoney2.default(0, 'CAD');
	}
	return money;
}

/**
 * A masked money input. Defaults to CAD funds.
 * @class
 * @property {Money} value - The money value.
 * @property {onChange} onChange - Called when the value changes.
 * @property {function} onDetailsClick - Called when the details button is clicked.
 * @property {string} [detailsIcon=server] - The Semantic UI icon to display on the details button.
 * @property {string} placeholder - The placeholder text to display.
 * @property {bool} [locked=false] - If true, cannot edit the amount.
 */

var MoneyInput = function (_Component) {
	_inherits(MoneyInput, _Component);

	function MoneyInput(props) {
		_classCallCheck(this, MoneyInput);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_initialiseProps.call(_this);

		var money = moneyFromProps(_this.props.value);
		_this.state = { money: money };
		return _this;
	}

	MoneyInput.prototype.componentDidMount = function componentDidMount() {
		if (this._input) {
			this._input.value = this.state.money.toDecimal();
			(0, _moneyInputMask2.default)({
				element: this._input,
				onChange: this.handleChange,
				currency: this.state.money.currency
			});
		}
	};

	MoneyInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
		var money = moneyFromProps(this.props.value);
		var prevMoney = moneyFromProps(prevProps.value);
		if (!money.equals(prevMoney) && !money.equals(this.state.money)) {
			this._input.value = money.toDecimal();
		}
	};

	MoneyInput.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
		    onDetailsClick = _props.onDetailsClick,
		    placeholder = _props.placeholder,
		    detailsIcon = _props.detailsIcon,
		    locked = _props.locked;


		var detailsButton = onDetailsClick ? _react2.default.createElement(_semanticUiReact.Icon, {
			name: detailsIcon,
			color: locked ? 'blue' : null,
			link: true,
			'data-title': 'Details',
			'data-content': 'Click for more details',
			onClick: onDetailsClick
		}) : null;

		return _react2.default.createElement(
			_semanticUiReact.Input,
			{ placeholder: placeholder, icon: !!onDetailsClick },
			_react2.default.createElement('input', { type: 'text', ref: function ref(r) {
					return _this2._input = r;
				}, readOnly: locked ? 'readonly' : null }),
			detailsButton
		);
	};

	return MoneyInput;
}(_react.Component);

MoneyInput.propTypes = {
	value: _tproptypes2.default.money,
	onChange: _propTypes2.default.func,
	onDetailsClick: _propTypes2.default.func,
	detailsIcon: _propTypes2.default.string,
	placeholder: _propTypes2.default.string,
	locked: _propTypes2.default.bool
};
MoneyInput.defaultProps = {
	detailsIcon: 'server',
	locked: false
};

var _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.handleChange = function (value) {
		var money = _jsMoney2.default.fromDecimal(value, _this3.state.money.currency);
		_this3.setState({ money: money });
		if (_this3.props.onChange) _this3.props.onChange(money);
	};
};

exports.default = MoneyInput;
module.exports = exports['default'];