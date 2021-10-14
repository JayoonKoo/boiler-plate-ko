import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom'

function RegisterPage(props) {
	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleChnage = (event) => {
		const {target: {value, name}} = event;
		switch (name) {
			case "email":
				setEmail(value);
				break;
			case "name":
				setName(value);
				break;
			case "password":
				setPassword(value);
				break;
			case "confirmPassword":
				setConfirmPassword(value);
				break;
			default:
				break;
		}
	}

	const onSubmitHandler = (event) => {
		event.preventDefault();
		
		if (password !== confirmPassword) {
			return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
		}

		const body = {
			email,
			name,
			password,
		}

		dispatch(registerUser(body))
			.then(response => {
				if (response.payload.success) {
					props.history.push('/login');
				} else {
					alert('Fail to Sign Up');
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

        <label>Name</label>
        <input name="name" type="text" value={name} onChange={handleChnage} />

        <label>Password</label>
        <input name="password" type="password" value={password} onChange={handleChnage} />

        <label>Confirm Password</label>
        <input name="confirmPassword" type="password" value={confirmPassword} onChange={handleChnage} />

        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
