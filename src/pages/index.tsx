import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

const MainScreen: React.FC = () => {

	return (
		<main>
			{/* Навигационное меню */}
			<Navbar />
			{/* Вывод страниц */}
			<Outlet />
		</main>
	);
}

export default MainScreen;