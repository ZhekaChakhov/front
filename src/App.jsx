import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import { Header } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "./pages";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	React.useEffect(() => {
		dispatch(fetchAuthMe());
	}, []);

	return (
		<>
			<Header />
			<Container maxWidth="lg">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Container>
		</>
	);
}

export default App;
