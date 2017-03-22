/**
 * Money Addons
 * @module module:addons/money
 */
import MoneyInput from './MoneyInput';
import getCountryCode from './currencyCountry';
import {makeMoney, formatMoney, roundTo} from './util';

export {
	MoneyInput,
	getCountryCode,
	makeMoney,
	formatMoney,
	roundTo,
};

/**
 * A JS-Money object.
 * @typedef Money
 * @memberOf module:addons/money
 */
