import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<BrowserRouter>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</BrowserRouter>
	</>
);
