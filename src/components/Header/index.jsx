import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);

	const onClickLogout = () => {
		if (window.confirm("Вы действительно хотите выйти?")) {
			dispatch(logout());
			// удаляем токен при выходе из акк
			window.localStorage.removeItem("token");
		}
	};

	return (
		<div className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link className={styles.logo} to="/">
						<div>NIKITA KOZGUNOV</div>
					</Link>
					<div className={styles.buttons}>
						{isAuth ? (
							<>
								<Button
									onClick={onClickLogout}
									variant="contained"
									color="error"
								>
									Sign Out
								</Button>
							</>
						) : (
							<>
								<Link to="/login">
									<Button className={styles.Outlined}>Sign In</Button>
								</Link>
								<Link to="/register">
									<Button className={styles.Contained}>Sign Up</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};
