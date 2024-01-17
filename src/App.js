import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import { Home } from "./Pages/Home";
import { MyOrder } from "./Pages/Order";
import { Cart } from "./Pages/Cart";
import { SignIn } from "./Pages/LoginForm";
import { SignUp } from "./Pages/RegistrationForm";
import { Error } from "./Pages/Error";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Navbar />,
			errorElement: <Error />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "/myorder", element: <MyOrder /> },
				{ path: "/cart", element: <Cart /> },
				{ path: "/signin", element: <SignIn /> },
				{ path: "/signup", element: <SignUp /> },
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
