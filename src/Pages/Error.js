import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Error() {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate("/");
		}, 3000);
	}, [navigate]);

	return (
		<div style={{ textAlign: "center" }}>
			<h1>Error, Something went wrong !!!</h1>
			<p>redirecting back to homepage... </p>
		</div>
	);
}
