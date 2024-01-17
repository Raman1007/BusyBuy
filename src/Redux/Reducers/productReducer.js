/* eslint-disable array-callback-return */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import {
	updateDoc,
	doc,
	arrayUnion,
	onSnapshot,
	arrayRemove,
} from "firebase/firestore";
import { toast } from "react-toastify";

function getDate() {
	const date = new Date();
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	return `${year}-${month}-${day}`;
}

export const getInitialCartOrdersThunk = createAsyncThunk(
	"product/getCartOrders",
	(args, thunkAPI) => {
		const { authReducer, productReducer } = thunkAPI.getState();
		const { isLoggedIn, userLoggedIn } = authReducer;

		if (isLoggedIn) {
			// eslint-disable-next-line no-unused-vars
			const unsub = onSnapshot(
				doc(db, "buybusy-redux", userLoggedIn.id),
				(doc) => {
					const data = doc.data();
					thunkAPI.dispatch(setCart(data.cart));
					thunkAPI.dispatch(setMyOrders(data.orders));
				}
			);

			return productReducer.cart;
		}
	}
);

const updateCartInDatabase = createAsyncThunk(
	"product/updateCartInDatabase",
	async (args, thunkAPI) => {
		const { authReducer, productReducer } = thunkAPI.getState();
		const { userLoggedIn } = authReducer;

		const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
		await updateDoc(userRef, {
			cart: productReducer.cart,
		});
	}
);

export const increaseQuantThunk = createAsyncThunk(
	"product/increaseProductQuantity",
	async (product, thunkAPI) => {
		const { productReducer } = thunkAPI.getState();

		const index = productReducer.cart.findIndex(
			(item) => item.name === product.name
		);

		thunkAPI.dispatch(increaseProductQuantity(index));

		thunkAPI.dispatch(increaseTotalAmount(product.price));

		thunkAPI.dispatch(updateCartInDatabase());
	}
);

export const decreaseQuantThunk = createAsyncThunk(
	"product/decreaseProductQuantity",
	async (product, thunkAPI) => {
		const { productReducer } = thunkAPI.getState();

		const index = productReducer.cart.findIndex(
			(item) => item.name === product.name
		);

		if (productReducer.cart[index].quantity === 1) {
			thunkAPI.dispatch(removeFromCartThunk(product));
			return;
		}

		thunkAPI.dispatch(decreaseProductQuantity(index));

		thunkAPI.dispatch(reduceTotalAmount(productReducer.cart[index].price));

		thunkAPI.dispatch(updateCartInDatabase());
	}
);

export const addToCartThunk = createAsyncThunk(
	"product/addToCart",
	async (product, thunkAPI) => {
		const { authReducer, productReducer } = thunkAPI.getState();
		const { isLoggedIn, userLoggedIn } = authReducer;

		if (!isLoggedIn) {
			toast.error("Please Login First!");
			return;
		}

		const index = productReducer.cart.findIndex(
			(item) => item.name === product.name
		);
		if (index !== -1) {
			thunkAPI.dispatch(increaseQuantThunk(productReducer.cart[index]));
			toast.success("Product Increased!");
			return;
		}

		const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
		await updateDoc(userRef, {
			cart: arrayUnion({ quantity: 1, ...product }),
		});

		thunkAPI.dispatch(increaseTotalAmount(product.price));
		thunkAPI.dispatch(increaseTotalItem());

		toast.success("Added in your Cart!");
	}
);

export const removeFromCartThunk = createAsyncThunk(
	"product/removeFromCart",
	async (product, thunkAPI) => {
		const { authReducer } = thunkAPI.getState();
		const { userLoggedIn } = authReducer;

		const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
		await updateDoc(userRef, {
			cart: arrayRemove(product),
		});

		return product;
	}
);

export const clearCartThunk = createAsyncThunk(
	"product/emptyCart",
	async (args, thunkAPI) => {
		const { authReducer, productReducer } = thunkAPI.getState();
		const { userLoggedIn } = authReducer;

		if (productReducer.itemInCart === 0) {
			toast.error("Nothing is remove from Cart!");
			return;
		}

		const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
		await updateDoc(userRef, {
			cart: [],
		});

		toast.success("Cart is Empty!");
	}
);

export const purchaseAllThunk = createAsyncThunk(
	"product/purchaseAllItems",
	async (args, thunkAPI) => {
		const { authReducer, productReducer } = thunkAPI.getState();
		const { userLoggedIn } = authReducer;

		const currentDate = getDate();

		const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
		await updateDoc(userRef, {
			orders: arrayUnion({
				date: currentDate,
				list: productReducer.cart,
				amount: productReducer.total,
			}),
		});

		thunkAPI.dispatch(clearCartThunk());
	}
);

const productSlice = createSlice({
	name: "product",
	initialState: {
		cart: [],
		itemInCart: 0,
		myorders: [],
		total: 0,
	},
	reducers: {
		setMyOrders: (state, action) => {
			state.myorders = action.payload;
			return;
		},
		increaseProductQuantity: (state, action) => {
			const index = action.payload;
			state.cart.at(index).quantity++;
			return;
		},
		decreaseProductQuantity: (state, action) => {
			const index = action.payload;
			state.cart.at(index).quantity--;
			return;
		},
		setCart: (state, action) => {
			state.cart = action.payload;
			return;
		},
		increaseTotalItem: (state, action) => {
			state.itemInCart++;
			return;
		},
		increaseTotalAmount: (state, action) => {
			state.total += action.payload;
			return;
		},
		reduceTotalAmount: (state, action) => {
			state.total -= action.payload;
			return;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getInitialCartOrdersThunk.fulfilled, (state, action) => {
				const cart = action.payload;
				if (cart) {
					let sum = 0,
						len = 0;
					cart.map((item) => {
						Number((sum += item.price * item.quantity));
						Number((len += item.quantity));
					});
					state.total = sum;
					state.itemInCart = len;
				}
			})
			.addCase(increaseQuantThunk.fulfilled, (state, action) => {
				state.itemInCart++;
			})
			.addCase(decreaseQuantThunk.fulfilled, (state, action) => {
				if (state.itemInCart > 1) {
					state.itemInCart--;
				}
			})
			.addCase(removeFromCartThunk.fulfilled, (state, action) => {
				const product = action.payload;
				state.total -= product.quantity * product.price;
				state.itemInCart -= product.quantity;
				toast.success("Product removed from cart!");
			})
			.addCase(clearCartThunk.fulfilled, (state, action) => {
				state.itemInCart = 0;
				state.total = 0;
				state.cart = [];
			});
	},
});

export const productReducer = productSlice.reducer;

export const {
	setMyOrders,
	increaseProductQuantity,
	decreaseProductQuantity,
	setCart,
	increaseTotalItem,
	increaseTotalAmount,
	reduceTotalAmount,
} = productSlice.actions;

export const productSelector = (state) => state.productReducer;
