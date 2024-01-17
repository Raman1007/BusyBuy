import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../Redux/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import styles from "../styles/signup.module.css";

export function SignUp() {
	const dispatch = useDispatch();
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		const data = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		dispatch(createUserThunk(data));
		navigate("/signin");
	}

	return (
		<>
			<div className={styles.container}>
				<form className={styles.registerForm} onSubmit={handleSubmit}>
					<h2 className={styles.registerTitle}>Sign Up</h2>
					<input
						className={styles.registerInput}
						type="text"
						placeholder="Enter Name"
						required
						ref={nameRef}
					/>
					<input
						className={styles.registerInput}
						type="email"
						placeholder="Enter Email"
						required
						ref={emailRef}
					/>
					<input
						className={styles.registerInput}
						type="password"
						placeholder="Enter Password"
						required
						ref={passwordRef}
					/>
					<button className={styles.registerBtn}>Sign Up</button>
				</form>
			</div>
		</>
	);
}
