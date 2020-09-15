import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {
	const [ isLoggedIn, setLoggedIn ] = useContext(UserContext);

	//***********Important*************/
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	//After Login redirect to the desired page
	const history = useHistory();
	const location = useLocation();
	let { from } = location.state || { from: { pathname: '/' } };

	//Google Sign in
	var provider = new firebase.auth.GoogleAuthProvider();
	const googleSignIn = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				var { displayName, email } = result.user;
				const SignInUser = {
					name  : displayName,
					email
				};
				setLoggedIn(SignInUser);
				history.replace(from);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<div style={{ textAlign: 'center' }}>
			<h1>This is Login</h1>
			<button onClick={googleSignIn}>Google Sign In</button>
		</div>
	);
};

export default Login;
