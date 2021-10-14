import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action';

const Auth = (SpecificComponent, option, adminRoute = null) => {

	// option 
	// null -> 모두 접근 가능. 
	// true -> 로그인한 사용자만 접근할 수 있는 페이지.
	// false -> 로그인 한 사용자는 접근하지 못하는 페이지.

	function AutenticationCheck(props) {
		const dispatch = useDispatch();

		useEffect(() => {
			dispatch(auth()).then(response => {
				console.log(response);
				// 로그인 하지 않았다면
				if (!response.payload.isAuth) {
					// 로그인 한 사용자만 접근 가능 페이지면
					if (option) {
						props.history.push('/login');
					}
				} else {
					// 로그인한 상태
					if (adminRoute && !response.payload.isAdmin) {
						props.history.push('/');
					} else {
						if (option === false) {
							props.history.push('/');
						}
					}
				}
			})
		})

		return (
			<SpecificComponent />
		)
	}


	return AutenticationCheck;
}

export default Auth;
