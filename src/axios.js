import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:4444",
});

// функция посредник,
// который при каждом запросе будет проверять
// есть у нас токен или нет,
// и если он есть - отправлять его в запрос
instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem("token");

	return config;
});

export default instance;
