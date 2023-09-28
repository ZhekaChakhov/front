import { React } from "react";
import Container from "@mui/material/Container";
import { Header } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, Register, Login } from "./pages";

function App() {
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
