import React from 'react';
import {MoneyInput} from '../dist';

before(() => {
	sinon.stub(console, 'error').callsFake(warning => {
		throw new Error(warning);
	})
});
after(() => {
	console.error.restore()
});

describe('MoneyInput', () => {
	it('renders without error', () => {
		shallow(<MoneyInput/>);
	});
});
