/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {Component, PropTypes} from 'react';
import {Input, Icon} from 'semantic-ui-react';
import Money from 'js-money';
import TPropTypes from 'tproptypes';
import moneyInputMask from './moneyInputMask';

function moneyFromProps(value) {
	let money;
	if (value) {
		if (value.toDecimal) {
			money = value;
		} else {
			money = new Money(value.amount, value.currency);
		}
	} else {
		money = new Money(0, 'CAD');
	}
	return money;
}

/**
 * A masked money input. Defaults to CAD funds.
 * @class
 * @memberOf module:addons/money
 * @property {Money} value - The money value.
 * @property {onChange} onChange - Called when the value changes.
 * @property {function} onDetailsClick - Called when the details button is clicked.
 * @property {string} [detailsIcon=server] - The Semantic UI icon to display on the details button.
 * @property {string} placeholder - The placeholder text to display.
 * @property {bool} [locked=false] - If true, cannot edit the amount.
 * @property {bool} [fluid=false] - If true, the input has a fluid width.
 * @property {string} className - Custom input div class names.
 */
export default class MoneyInput extends Component {
	static propTypes = {
		value: TPropTypes.money,
		onChange: PropTypes.func,
		onDetailsClick: PropTypes.func,
		detailsIcon: PropTypes.string,
		placeholder: PropTypes.string,
		locked: PropTypes.bool,
		fluid: PropTypes.bool,
		className: PropTypes.string,
	};

	static defaultProps = {
		detailsIcon: 'server',
		locked: false,
		fluid: false,
	};

	constructor(props) {
		super(props);
		const money = moneyFromProps(this.props.value);
		this.state = {money};
	}

	componentDidMount() {
		this._input.value = this.state.money.toDecimal();
		moneyInputMask({
			element: this._input,
			onChange: this.handleChange,
			currency: this.state.money.currency,
		});
	}

	componentDidUpdate(prevProps) {
		const money = moneyFromProps(this.props.value);
		const prevMoney = moneyFromProps(prevProps.value);
		if (!money.equals(prevMoney) && !money.equals(this.state.money)) {
			this._input.value = money.toDecimal();
		}
	}

	componentWillUnmount() {
	}

	handleChange = value => {
		const money = Money.fromDecimal(value, this.state.money.currency);
		this.setState({money});
		if (this.props.onChange) this.props.onChange(money);
	}

	render() {
		const {onDetailsClick, placeholder, detailsIcon, locked, value, meta, ...rest} = this.props;

		const detailsButton = onDetailsClick ? (
			<Icon
				name={detailsIcon}
			  color={locked ? 'blue' : null}
			  link
			  data-title="Details"
			  data-content="Click for more details"
			  onClick={onDetailsClick}
			/>
		) : null;

		return (
			<Input placeholder={placeholder} icon={!!onDetailsClick}>
				<div>
					<input type="text" ref={r => (this._input = r)} readOnly={locked ? 'readonly' : null}/>
				</div>
				{detailsButton}
			</Input>
		);
	}
}
