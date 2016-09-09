import React, {
	Component
} from 'react';
import {
	Text,
} from 'react-native';
import {Provider} from 'react-redux';
import MainContainer from './container/MainContainer';
import configureStore from './store/configure-store';

const store = configureStore();

export default class Index extends Component {

	render() {
		return(
			<Provider store={store} >
				<MainContainer />
			</Provider>
		);
	}
}
