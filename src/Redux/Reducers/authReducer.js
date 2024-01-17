import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = { userList: [], isLoggedIn: false, userLoggedIn: null };

export const getInitialUserList = createAsyncThunk(
	"auth/userList",
	(args, thunkAPI) => {
		// eslint-disable-next-line no-unused-vars
		const unsub = onSnapshot(collection(db, "buybusy-redux"), (snapShot) => {
			const users = snapShot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			thunkAPI.dispatch(setUserList(users));
		});
	}
);

export const createUserThunk = createAsyncThunk(
	"auth/createUser",
	async (data, thunkAPI) => {
		const { authReducer } = thunkAPI.getState();
		const { userList } = authReducer;
		const index = userList.findIndex((user) => user.email === data.email);

		if (index !== -1) {
			toast.error("Email already used!");
			return;
		}

		// eslint-disable-next-line no-unused-vars
		const docRef = await addDoc(collection(db, "buybusy-redux"), {
			name: data.name,
			email: data.email,
			password: data.password,
			cart: [],
			orders: [],
		});
		toast.success("New user Created!");
	}
);

export const createSessionThunk = createAsyncThunk(
	"auth/createSession",
	async (data, thunkAPI) => {
		const { authReducer } = thunkAPI.getState();
		const { userList } = authReducer;
		const index = userList.findIndex((user) => user.email === data.email);

		if (index === -1) {
			toast.error("Email does not exist!");
			return false;
		}

		if (userList[index].password === data.password) {
			toast.success("Sign In Successfully!");

			thunkAPI.dispatch(setLoggedIn(true));
			thunkAPI.dispatch(setUserLoggedIn(userList[index]));

			window.localStorage.setItem("token", true);
			window.localStorage.setItem("index", JSON.stringify(userList[index]));
			return true;
		} else {
			toast.error("Wrong UserName/Password!");
			return false;
		}
	}
);
export const removeSessionThunk = createAsyncThunk("auth/removeSession", () => {
	window.localStorage.removeItem("token");
	window.localStorage.removeItem("index");
});

const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		setUserList: (state, action) => {
			state.userList = action.payload;
		},
		setLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUserLoggedIn: (state, action) => {
			state.userLoggedIn = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(removeSessionThunk.fulfilled, (state, action) => {
			state.isLoggedIn = false;
			state.userLoggedIn = null;
			toast.success("Sign Out successfully!");
		});
	},
});

export const authReducer = authSlice.reducer;
export const { setLoggedIn, setUserLoggedIn, setUserList } = authSlice.actions;
export const authSelector = (state) => state.authReducer;
