import React, {Component} from 'react';
import {Grid, Header, Form, Segment} from 'semantic-ui-react';
import {MoneyInput} from 'lib';

class App extends Component {
	handleDetailsClick = () => {
		console.log('Click!');
	}

	render() {
		return (
			<Grid container>
				<Grid.Row>
					<Grid.Column>
						<Header as="h1">Money Demo</Header>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Segment>
							<Form>
								<Form.Field>
									<label>MoneyInput</label>
									<MoneyInput/>
								</Form.Field>
								<Form.Field>
									<label>MoneyInput with Icon</label>
									<MoneyInput onDetailsClick={this.handleDetailsClick}/>
								</Form.Field>
							</Form>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default App;
