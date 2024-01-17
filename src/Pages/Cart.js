import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	productSelector,
	purchaseAllThunk,
} from "../Redux/Reducers/productReducer";
import CartItem from "../Component/Cart/CartItem";
import Loader from "../Component/Loader/Loader";
import styles from "../styles/cart.module.css";
import { toast } from "react-toastify";

export function Cart() {
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState(true);
	const { cart, total, itemInCart } = useSelector(productSelector);
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 300);
	}, []);

	function handlePurchase() {
		if (itemInCart === 0) {
			toast.error("Nothing to purchase in Cart!");
			return;
		}

		dispatch(purchaseAllThunk());
		toast.success("Your order is Placed!");
		navigate("/myorder");
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.cartPageContainer}>
					<div className={styles.cartGrid}>
						{cart.length === 0 ? (
							<h1>Cart is Empty!</h1>
						) : (
							<>
								<aside className={styles.cartTotalPrice}>
									<p
										style={{
											color: "#224957",
											fontSize: "1.15em",
											fontWeight: 700,
										}}
									>
										TotalPrice:- ₹{total} /-
									</p>
									<button
										className={styles.cartPurchase}
										onClick={handlePurchase}
									>
										Purchase
									</button>
								</aside>
								{cart.map((product, i) => (
									<CartItem key={i} product={product} />
								))}
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
}
