import { useDispatch } from "react-redux";
import {
	removeFromCartThunk,
	increaseQuantThunk,
	decreaseQuantThunk,
} from "../../Redux/Reducers/productReducer";
import styles from "../../styles/cart.module.css";

export default function CartItem(props) {
	const dispatch = useDispatch();

	if (!props.product) {
		return null;
	}
	const { name, image, price, category, quantity } = props.product;

	return (
		<>
			<div className={styles.cartContainer}>
				<div className={styles.cartImage}>
					<img
						src={image}
						alt={category}
						width="100%"
						height="100%"
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className={styles.cartDetails}>
					<div className={styles.cartProductName}>
						<p style={{ margin: 0 }}>{name}</p>
					</div>
					<div className={styles.cartOptions}>
						<p style={{ color: "#224957", fontWeight: 700, margin: 0 }}>
							₹{price}
						</p>
						<div className={styles.cartQuantityContainer}>
							<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC"
								alt="Minus"
								onClick={() => dispatch(decreaseQuantThunk(props.product))}
							/>
							{quantity}
							<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC"
								alt="Minus"
								onClick={() => dispatch(increaseQuantThunk(props.product))}
							/>
						</div>
					</div>
					<button
						className={styles.cartBtn}
						title="Remove from cart"
						onClick={() => dispatch(removeFromCartThunk(props.product))}
					>
						Remove From Cart
					</button>
				</div>
			</div>
		</>
	);
}
