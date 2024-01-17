/* eslint-disable no-lone-blocks */
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { createSessionThunk } from "../Redux/Reducers/authReducer";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/signIn.module.css";

export function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();

	function handleSubmit(e) {
		e.preventDefault();
		const data = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		};
		const status = dispatch(createSessionThunk(data));
		{
			status ? navigate("/") : navigate("/signin");
		}
	}

	return (
		<div className={styles.container}>
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<h2 className={styles.loginTitle}>Sign In</h2>
				<input
					className={styles.loginInput}
					type="email"
					placeholder="Enter Email"
					required
					ref={emailRef}
				/>
				<input
					className={styles.loginInput}
					type="password"
					placeholder="Enter Password"
					required
					ref={passwordRef}
				/>
				<button className={styles.loginBtn}>Sign In</button>
				<NavLink
					style={{
						textDecoration: "none",
						color: "rgb(34, 73, 87)",
						fontFamily: "Quicksand",
					}}
					to="/signup"
				>
					<p style={{ fontWeight: 600, margin: "0px" }}>Or SignUp instead</p>
				</NavLink>
			</form>
		</div>
	);
}
