import styles from "../../styles/myorder.module.css";
export default function OrderDetail(props) {
	const { date, list, amount } = props.order;

	return (
		<div className={styles.orderContainer}>
			<h1 className={styles.orderHeading}>Ordered On:- {date}</h1>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total Price</th>
					</tr>
				</thead>

				{list.map((product, i) => (
					<tbody>
						<tr>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{product.quantity}</td>
							<td>₹{product.quantity * product.price}</td>
						</tr>
						<tr></tr>
					</tbody>
				))}
				<tr className={styles.orderPrice}>
					<td>₹{amount}</td>
				</tr>
			</table>
		</div>
	);
}
