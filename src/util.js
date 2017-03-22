import Money from 'js-money';
import accounting from 'accounting';
import isNumber from 'lodash/isNumber';

/**
 * Creates a Money object out of a plain Object or decimal. Defaults null to $0 CAD.
 * @memberOf module:addons/money
 * @param {Object|decimal} objOrDecimal - The object or decimal to convert to Money.
 * @param {string} currency - If converting a decimal, specifies the currency to use.
 * @return {Money}
 */
export function makeMoney(objOrDecimal, currency = 'CAD') {
	if (!objOrDecimal) return new Money(0, Money.CAD);
	if (isNumber(objOrDecimal)) return Money.fromDecimal(objOrDecimal, currency);
	if (objOrDecimal.amount && objOrDecimal.currency) return new Money(objOrDecimal.amount, objOrDecimal.currency);
	return new Money(0, Money.CAD);
}

/**
 * Rounds a decimal value to a certain number of decimal digits.
 * @memberOf module:addons/money
 * @param {number} value - A number to round.
 * @param {number} decimals - The number of decimal digits to round to.
 * @return {number} - The rounded number.
 */
export function roundTo(value, decimals) {
	return Number(`${Math.round(`${value}e${decimals}`).toString()}e-${decimals}`);
}

/**
 * Formats a Money value to a nice string.
 * @memberOf module:addons/money
 * @param {Money} money - The Money value
 * @param {bool} symbol - If true displays the proper currency symbol
 * @return {string} The formatted Money string
 */
export function formatMoney(money, symbol = false) {
	return accounting.formatMoney(money.toDecimal(), symbol ? Money[money.currency].symbol_native : '', Money[money.currency].decimal_digits);
}
