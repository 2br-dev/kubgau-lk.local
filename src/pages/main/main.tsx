import Navbar from "../../components/navbar";
import { Outlet } from "react-router-dom";
import './styles.scss';

/** Главная страница (оболочка)  */
const MainPage: React.FC = () => {

	return(
		<>
			<Navbar /> {/** Навигационное меню  */}
			<Outlet /> {/** Вывод страниц */}
		</>
	)
}

export default MainPage;