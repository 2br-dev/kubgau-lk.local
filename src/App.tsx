import MainPage from './pages/main/main';
import './scss/master.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/loign/login';
import CoursePage from './pages/course';
import StatementsPage from './pages/statements';

import { createTheme, ThemeProvider } from '@mui/material';
import GroupsPage from './pages/groups';

function App() {

	// Установка шрифта для приложения
	const theme = createTheme({
		typography: {
			fontFamily: 'Wix Madefor Display',
		}
	})

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				{/* Роутер */}
				<Router>
					<Routes>
						<Route path="/" element={<LoginScreen />} />
						<Route path="/main" element={<MainPage />} >
							<Route path="courses" element={ <CoursePage /> } />
							<Route path="statements" element={ <StatementsPage /> } />
							<Route path="groups" element={ <GroupsPage /> } />
						</Route>
					</Routes>
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
