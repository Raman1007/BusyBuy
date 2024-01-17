import { useDispatch } from "react-redux";
import { addToCartThunk } from "../../Redux/Reducers/productReducer";
import styles from "../../styles/home.module.css";

export default function ItemCard(props) {
	const dispatch = useDispatch();
	const { name, image, price, category } = props.item;
	return (
		<>
			<div>
				<div className={styles.productContainer}>
					<div className={styles.productImage}>
						<img
							src={image}
							alt={category}
							width="100%"
							height="100%"
							style={{ objectFit: "contain" }}
						/>
					</div>
					<div className={styles.productDetails}>
						<div className={styles.productName}>
							<p style={{ margin: 0 }}>{name}</p>
						</div>
						<div className={styles.productOptions}>
							<p style={{ color: "#224957", fontWeight: 700, margin: 0 }}>
								₹{price}
							</p>
						</div>
					</div>

					<button
						className={styles.productBtn}
						title="Add to Cart"
						onClick={() => dispatch(addToCartThunk(props.item))}
					>
						Add to Cart
					</button>
				</div>
			</div>
		</>
	);
}
