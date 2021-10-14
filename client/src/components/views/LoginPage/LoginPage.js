import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'

function LoginPage(props) {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChnage = (event) => {
		const {target: {value, name}} = event;
		name === 'email' ? setEmail(value) : setPassword(value);
	}

	const onSubmitHandler = (event) => {
		event.preventDefault();


		const body = {
			email,
			password,
		}
		dispatch(loginUser(body))
			.then(response => {
				if (response.payload.loginSuccess) {
					props.history.push('/');
				} else {
					alert('Error');
				}
			})


	}

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input name="email" type="email" value={email} onChange={handleChnage} />
        <label>Password</label>
        <input name="password" type="password" value={password} onChange={handleChnage} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
