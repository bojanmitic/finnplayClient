import {FunctionComponent} from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
 import './LoginContianer.css'


const LoginContainer: FunctionComponent= () => {
	return (
		<div className='container'>
			<LoginComponent />
		</div>
	)
};

export default LoginContainer;
