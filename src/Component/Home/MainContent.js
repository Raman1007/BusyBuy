import React from "react";
import ItemCard from "./ItemCard";
import { data } from "../../Assets/data";
import styles from "../../styles/home.module.css";

export default function MainContent(props) {
	const { search, price, category, applyFilter } = props;

	const filteredData = data
		.filter((item) => {
			return (
				search.trim() === "" ||
				item.name.toLowerCase().includes(search.trim().toLowerCase())
			);
		})
		.filter((item) => {
			return !applyFilter || item.price <= price;
		})
		.filter((item) => {
			return category === "none" || item.category === category;
		});

	return (
		<div className={styles.productGrid}>
			{filteredData.map((item) => (
				<ItemCard key={item.id} item={item} />
			))}
		</div>
	);
}
