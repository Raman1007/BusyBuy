import styles from "../../styles/home.module.css";
export default function FilterBar(props) {
	const { price, setPrice, category, setCategory } = props;

	return (
		<aside className={styles.filterContainer}>
			<h2 style={{ color: "#224957", fontSize: "1.25em", fontWeight: 700 }}>
				Filter
			</h2>
			<form>
				<label htmlFor="price">Price:{price}</label>
				<input
					type="range"
					id="price"
					name="price"
					min="100"
					max="100000"
					step="10"
					className={styles.filterSidebar}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<h2 style={{ color: "#224957", fontSize: "1.25em", fontWeight: 700 }}>
					Category
				</h2>
				<div className={styles.categoryContainer}>
					<div>
						<input
							style={{
								borderRadius: "0.25rem",
								height: "1rem",
								marginRight: "0.5rem",
								width: "1rem",
							}}
							type="checkbox"
							id="men"
							value="men"
							name="category"
							checked={category === "men"}
							onClick={() => setCategory("men")}
						/>
						<label htmlFor="men">Men's Clothing</label>
					</div>
					<div>
						<input
							style={{
								borderRadius: "0.25rem",
								height: "1rem",
								marginRight: "0.5rem",
								width: "1rem",
							}}
							type="checkbox"
							id="women"
							value="women"
							name="category"
							checked={category === "women"}
							onClick={() => setCategory("women")}
						/>
						<label htmlFor="women">Women's Clothing</label>
					</div>
					<div>
						<input
							style={{
								borderRadius: "0.25rem",
								height: "1rem",
								marginRight: "0.5rem",
								width: "1rem",
							}}
							type="checkbox"
							id="jewellery"
							value="jewellery"
							name="category"
							checked={category === "jewellery"}
							onClick={() => setCategory("jewellery")}
						/>
						<label htmlFor="jewellery">Jewellery</label>
					</div>
					<div>
						<input
							style={{
								borderRadius: "0.25rem",
								height: "1rem",
								marginRight: "0.5rem",
								width: "1rem",
							}}
							type="checkbox"
							id="electric"
							value="electric"
							name="category"
							checked={category === "electric"}
							onClick={() => setCategory("electric")}
						/>
						<label htmlFor="electric">Electronics</label>
					</div>
					<div>
						<input
							style={{
								borderRadius: "0.25rem",
								height: "1rem",
								marginRight: "0.5rem",
								width: "1rem",
							}}
							type="checkbox"
							id="none"
							value="none"
							name="category"
							checked={category === "none"}
							onClick={() => setCategory("none")}
						/>
						<label htmlFor="none">None</label>
					</div>
				</div>
			</form>
		</aside>
	);
}
