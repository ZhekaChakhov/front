import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchAuth(values));

		if (!data.payload) {
			// если произошла какая-то ошибка в авторизации - оповещяем юзера
			alert("Failed to log in");
		}

		if ("token" in data.payload) {
			// сохраняем наш токен в localStorage
			window.localStorage.setItem("token", data.payload.token);
		}
	};

	if (isAuth) {
		// если авторизованы - перенаправить нас на главную страницу
		return <Navigate to="/" />;
	}

	// если два поля {...register(...)} рендерятся
	//      то мы их сразу регистрируем в useForm, и он их будет обрабатывать
	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h4">
				Sign In
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					className={styles.field}
					label="E-Mail"
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register("email", { required: "Please enter your email" })}
					type="email"
					fullWidth
				/>
				<TextField
					className={styles.field}
					label="Password"
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "Please enter your password" })}
					type="password"
					fullWidth
				/>
				<Button type="submit" size="large" variant="contained" fullWidth>
					Sign In
				</Button>
			</form>
		</Paper>
	);
};
