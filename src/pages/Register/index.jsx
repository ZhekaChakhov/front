import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Register.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

const sex = [
	{ value: "undecided", label: "..." },
	{ value: "male", label: "male" },
	{ value: "female", label: "female" },
];

const countries = [
	{ value: "undecided", label: "..." },
	{ value: "AF", label: "Afghanistan" },
	{ value: "AX", label: "Åland Islands" },
	{ value: "AL", label: "Albania" },
	{ value: "DZ", label: "Algeria" },
	{ value: "AS", label: "American Samoa" },
	{ value: "AD", label: "Andorra" },
	{ value: "AO", label: "Angola" },
	{ value: "AI", label: "Anguilla" },
	{ value: "AQ", label: "Antarctica" },
	{ value: "AG", label: "Antigua and Barbuda" },
	{ value: "AR", label: "Argentina" },
	{ value: "AM", label: "Armenia" },
	{ value: "AW", label: "Aruba" },
	{ value: "AU", label: "Australia" },
	{ value: "AT", label: "Austria" },
	{ value: "AZ", label: "Azerbaijan" },
	{ value: "BS", label: "Bahamas" },
	{ value: "BH", label: "Bahrain" },
	{ value: "BD", label: "Bangladesh" },
	{ value: "BB", label: "Barbados" },
	{ value: "BY", label: "Belarus" },
	{ value: "BE", label: "Belgium" },
	{ value: "BZ", label: "Belize" },
	{ value: "BJ", label: "Benin" },
	{ value: "BM", label: "Bermuda" },
	{ value: "BT", label: "Bhutan" },
	{ value: "BO", label: "Bolivia, Plurinational State of" },
	{ value: "BQ", label: "Bonaire, Sint Eustatius and Saba" },
	{ value: "BA", label: "Bosnia and Herzegovina" },
	{ value: "BW", label: "Botswana" },
	{ value: "BV", label: "Bouvet Island" },
	{ value: "BR", label: "Brazil" },
	{ value: "IO", label: "British Indian Ocean Territory" },
	{ value: "BN", label: "Brunei Darussalam" },
	{ value: "BG", label: "Bulgaria" },
	{ value: "BF", label: "Burkina Faso" },
	{ value: "BI", label: "Burundi" },
	{ value: "KH", label: "Cambodia" },
	{ value: "CM", label: "Cameroon" },
	{ value: "CA", label: "Canada" },
	{ value: "CV", label: "Cape Verde" },
	{ value: "KY", label: "Cayman Islands" },
	{ value: "CF", label: "Central African Republic" },
	{ value: "TD", label: "Chad" },
	{ value: "CL", label: "Chile" },
	{ value: "CN", label: "China" },
	{ value: "CX", label: "Christmas Island" },
	{ value: "CC", label: "Cocos (Keeling) Islands" },
	{ value: "CO", label: "Colombia" },
	{ value: "KM", label: "Comoros" },
	{ value: "CG", label: "Congo" },
	{ value: "CD", label: "Congo, the Democratic Republic of the" },
	{ value: "CK", label: "Cook Islands" },
	{ value: "CR", label: "Costa Rica" },
	{ value: "CI", label: "Côte d'Ivoire" },
	{ value: "HR", label: "Croatia" },
	{ value: "CU", label: "Cuba" },
	{ value: "CW", label: "Curaçao" },
	{ value: "CY", label: "Cyprus" },
	{ value: "CZ", label: "Czech Republic" },
	{ value: "DK", label: "Denmark" },
	{ value: "DJ", label: "Djibouti" },
	{ value: "DM", label: "Dominica" },
	{ value: "DO", label: "Dominican Republic" },
	{ value: "EC", label: "Ecuador" },
	{ value: "EG", label: "Egypt" },
	{ value: "SV", label: "El Salvador" },
	{ value: "GQ", label: "Equatorial Guinea" },
	{ value: "ER", label: "Eritrea" },
	{ value: "EE", label: "Estonia" },
	{ value: "ET", label: "Ethiopia" },
	{ value: "FK", label: "Falkland Islands (Malvinas)" },
	{ value: "FO", label: "Faroe Islands" },
	{ value: "FJ", label: "Fiji" },
	{ value: "FI", label: "Finland" },
	{ value: "FR", label: "France" },
	{ value: "GF", label: "French Guiana" },
	{ value: "PF", label: "French Polynesia" },
	{ value: "TF", label: "French Southern Territories" },
	{ value: "GA", label: "Gabon" },
	{ value: "GM", label: "Gambia" },
	{ value: "GE", label: "Georgia" },
	{ value: "DE", label: "Germany" },
	{ value: "GH", label: "Ghana" },
	{ value: "GI", label: "Gibraltar" },
	{ value: "GR", label: "Greece" },
	{ value: "GL", label: "Greenland" },
	{ value: "GD", label: "Grenada" },
	{ value: "GP", label: "Guadeloupe" },
	{ value: "GU", label: "Guam" },
	{ value: "GT", label: "Guatemala" },
	{ value: "GG", label: "Guernsey" },
	{ value: "GN", label: "Guinea" },
	{ value: "GW", label: "Guinea-Bissau" },
	{ value: "GY", label: "Guyana" },
	{ value: "HT", label: "Haiti" },
	{ value: "HM", label: "Heard Island and McDonald Mcdonald Islands" },
	{ value: "VA", label: "Holy See (Vatican City State)" },
	{ value: "HN", label: "Honduras" },
	{ value: "HK", label: "Hong Kong" },
	{ value: "HU", label: "Hungary" },
	{ value: "IS", label: "Iceland" },
	{ value: "IN", label: "India" },
	{ value: "ID", label: "Indonesia" },
	{ value: "IR", label: "Iran, Islamic Republic of" },
	{ value: "IQ", label: "Iraq" },
	{ value: "IE", label: "Ireland" },
	{ value: "IM", label: "Isle of Man" },
	{ value: "IL", label: "Israel" },
	{ value: "IT", label: "Italy" },
	{ value: "JM", label: "Jamaica" },
	{ value: "JP", label: "Japan" },
	{ value: "JE", label: "Jersey" },
	{ value: "JO", label: "Jordan" },
	{ value: "KZ", label: "Kazakhstan" },
	{ value: "KE", label: "Kenya" },
	{ value: "KI", label: "Kiribati" },
	{ value: "KP", label: "Korea, Democratic People's Republic of" },
	{ value: "KR", label: "Korea, Republic of" },
	{ value: "KW", label: "Kuwait" },
	{ value: "KG", label: "Kyrgyzstan" },
	{ value: "LA", label: "Lao People's Democratic Republic" },
	{ value: "LV", label: "Latvia" },
	{ value: "LB", label: "Lebanon" },
	{ value: "LS", label: "Lesotho" },
	{ value: "LR", label: "Liberia" },
	{ value: "LY", label: "Libya" },
	{ value: "LI", label: "Liechtenstein" },
	{ value: "LT", label: "Lithuania" },
	{ value: "LU", label: "Luxembourg" },
	{ value: "MO", label: "Macao" },
	{ value: "MK", label: "Macedonia, the Former Yugoslav Republic of" },
	{ value: "MG", label: "Madagascar" },
	{ value: "MW", label: "Malawi" },
	{ value: "MY", label: "Malaysia" },
	{ value: "MV", label: "Maldives" },
	{ value: "ML", label: "Mali" },
	{ value: "MT", label: "Malta" },
	{ value: "MH", label: "Marshall Islands" },
	{ value: "MQ", label: "Martinique" },
	{ value: "MR", label: "Mauritania" },
	{ value: "MU", label: "Mauritius" },
	{ value: "YT", label: "Mayotte" },
	{ value: "MX", label: "Mexico" },
	{ value: "FM", label: "Micronesia, Federated States of" },
	{ value: "MD", label: "Moldova, Republic of" },
	{ value: "MC", label: "Monaco" },
	{ value: "MN", label: "Mongolia" },
	{ value: "ME", label: "Montenegro" },
	{ value: "MS", label: "Montserrat" },
	{ value: "MA", label: "Morocco" },
	{ value: "MZ", label: "Mozambique" },
	{ value: "MM", label: "Myanmar" },
	{ value: "NA", label: "Namibia" },
	{ value: "NR", label: "Nauru" },
	{ value: "NP", label: "Nepal" },
	{ value: "NL", label: "Netherlands" },
	{ value: "NC", label: "New Caledonia" },
	{ value: "NZ", label: "New Zealand" },
	{ value: "NI", label: "Nicaragua" },
	{ value: "NE", label: "Niger" },
	{ value: "NG", label: "Nigeria" },
	{ value: "NU", label: "Niue" },
	{ value: "NF", label: "Norfolk Island" },
	{ value: "MP", label: "Northern Mariana Islands" },
	{ value: "NO", label: "Norway" },
	{ value: "OM", label: "Oman" },
	{ value: "PK", label: "Pakistan" },
	{ value: "PW", label: "Palau" },
	{ value: "PS", label: "Palestine, State of" },
	{ value: "PA", label: "Panama" },
	{ value: "PG", label: "Papua New Guinea" },
	{ value: "PY", label: "Paraguay" },
	{ value: "PE", label: "Peru" },
	{ value: "PH", label: "Philippines" },
	{ value: "PN", label: "Pitcairn" },
	{ value: "PL", label: "Poland" },
	{ value: "PT", label: "Portugal" },
	{ value: "PR", label: "Puerto Rico" },
	{ value: "QA", label: "Qatar" },
	{ value: "RE", label: "Réunion" },
	{ value: "RO", label: "Romania" },
	{ value: "RU", label: "Russian Federation" },
	{ value: "RW", label: "Rwanda" },
	{ value: "BL", label: "Saint Barthélemy" },
	{ value: "SH", label: "Saint Helena, Ascension and Tristan da Cunha" },
	{ value: "KN", label: "Saint Kitts and Nevis" },
	{ value: "LC", label: "Saint Lucia" },
	{ value: "MF", label: "Saint Martin (French part)" },
	{ value: "PM", label: "Saint Pierre and Miquelon" },
	{ value: "VC", label: "Saint Vincent and the Grenadines" },
	{ value: "WS", label: "Samoa" },
	{ value: "SM", label: "San Marino" },
	{ value: "ST", label: "Sao Tome and Principe" },
	{ value: "SA", label: "Saudi Arabia" },
	{ value: "SN", label: "Senegal" },
	{ value: "RS", label: "Serbia" },
	{ value: "SC", label: "Seychelles" },
	{ value: "SL", label: "Sierra Leone" },
	{ value: "SG", label: "Singapore" },
	{ value: "SX", label: "Sint Maarten (Dutch part)" },
	{ value: "SK", label: "Slovakia" },
	{ value: "SI", label: "Slovenia" },
	{ value: "SB", label: "Solomon Islands" },
	{ value: "SO", label: "Somalia" },
	{ value: "ZA", label: "South Africa" },
	{ value: "GS", label: "South Georgia and the South Sandwich Islands" },
	{ value: "SS", label: "South Sudan" },
	{ value: "ES", label: "Spain" },
	{ value: "LK", label: "Sri Lanka" },
	{ value: "SD", label: "Sudan" },
	{ value: "SR", label: "Suriname" },
	{ value: "SJ", label: "Svalbard and Jan Mayen" },
	{ value: "SZ", label: "Swaziland" },
	{ value: "SE", label: "Sweden" },
	{ value: "CH", label: "Switzerland" },
	{ value: "SY", label: "Syrian Arab Republic" },
	{ value: "TW", label: "Taiwan, Province of China" },
	{ value: "TJ", label: "Tajikistan" },
	{ value: "TZ", label: "Tanzania, United Republic of" },
	{ value: "TH", label: "Thailand" },
	{ value: "TL", label: "Timor-Leste" },
	{ value: "TG", label: "Togo" },
	{ value: "TK", label: "Tokelau" },
	{ value: "TO", label: "Tonga" },
	{ value: "TT", label: "Trinidad and Tobago" },
	{ value: "TN", label: "Tunisia" },
	{ value: "TR", label: "Turkey" },
	{ value: "TM", label: "Turkmenistan" },
	{ value: "TC", label: "Turks and Caicos Islands" },
	{ value: "TV", label: "Tuvalu" },
	{ value: "UG", label: "Uganda" },
	{ value: "UA", label: "Ukraine" },
	{ value: "AE", label: "United Arab Emirates" },
	{ value: "GB", label: "United Kingdom" },
	{ value: "US", label: "United States" },
	{ value: "UM", label: "United States Minor Outlying Islands" },
	{ value: "UY", label: "Uruguay" },
	{ value: "UZ", label: "Uzbekistan" },
	{ value: "VU", label: "Vanuatu" },
	{ value: "VE", label: "Venezuela, Bolivarian Republic of" },
	{ value: "VN", label: "Viet Nam" },
	{ value: "VG", label: "Virgin Islands, British" },
	{ value: "VI", label: "Virgin Islands, U.S." },
	{ value: "WF", label: "Wallis and Futuna" },
	{ value: "EH", label: "Western Sahara" },
	{ value: "YE", label: "Yemen" },
	{ value: "ZM", label: "Zambia" },
	{ value: "ZW", label: "Zimbabwe" },
];

export const Register = () => {
	const isAuth = useSelector(selectIsAuth);
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			name: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirmation: "",
			age: "",
			sex: "",
			country: "",
			phoneNumber: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));

		if (!data.payload) {
			// если произошла какая-то ошибка в авторизации - оповещяем юзера
			alert("Failed to register");
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

	return (
		<Paper classes={{ root: styles.root }}>
			<Typography classes={{ root: styles.title }} variant="h4">
				Sign Up
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					error={Boolean(errors.name?.message)}
					helperText={errors.name?.message}
					{...register("name", { required: "Please enter your name" })}
					className={styles.field}
					label="Name"
					fullWidth
				/>
				<TextField
					error={Boolean(errors.lastName?.message)}
					helperText={errors.lastName?.message}
					{...register("lastName", { required: "Please enter your last name" })}
					className={styles.field}
					label="Last name"
					fullWidth
				/>
				<TextField
					error={Boolean(errors.email?.message)}
					helperText={errors.email?.message}
					{...register("email", { required: "Please enter your email" })}
					className={styles.field}
					label="E-Mail"
					type="email"
					fullWidth
				/>
				<TextField
					error={Boolean(errors.password?.message)}
					helperText={errors.password?.message}
					{...register("password", { required: "Please enter your password" })}
					className={styles.field}
					label="Password"
					type="password"
					fullWidth
				/>
				<TextField
					error={Boolean(errors.passwordConfirmation?.message)}
					helperText={errors.passwordConfirmation?.message}
					{...register("passwordConfirmation", {
						required: "Please confirm your password",
					})}
					className={styles.field}
					label="Confirm your password"
					type="password"
					fullWidth
				/>
				<TextField
					error={Boolean(errors.age?.message)}
					helperText={errors.age?.message}
					{...register("age")}
					className={styles.field}
					label="Age"
					fullWidth
				/>
				<TextField
					helperText={"Please select your sex"}
					{...register("sex")}
					className={styles.field}
					select
					label="Sex"
					defaultValue="undecided"
					fullWidth
				>
					{sex.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					helperText={"Please select your country"}
					{...register("country")}
					className={styles.field}
					select
					label="Country"
					defaultValue="undecided"
					fullWidth
				>
					{countries.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					error={Boolean(errors.phoneNumber?.message)}
					helperText={errors.phoneNumber?.message}
					{...register("phoneNumber")}
					className={styles.field}
					label="Phone number"
					type="tel"
					fullWidth
				/>
				<Button
					disabled={!isValid}
					// className={styles.Button}
					type="submit"
					size="large"
					variant="contained"
					fullWidth
				>
					Sign up
				</Button>
			</form>
		</Paper>
	);
};
