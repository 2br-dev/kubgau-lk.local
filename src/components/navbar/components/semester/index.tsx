import { useState, useEffect, SyntheticEvent, Ref } from "react";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import store from '../../../../store';
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import './styles.scss';

const Semester: React.FC = () => {

	let [ semester, setSemester ] = useState<string>( localStorage.getItem("currentSemester") || "Выберите семестр" );
	let [ menuItems, setMenuItems ] = useState<Array<string>>( [] );
	let searchInput:Ref<HTMLInputElement>;

	useEffect(() => {

		fetch('/data/semesters.json')
			.then(res => res.json())
			.then((response:Array<string>) => {
				setMenuItems(response);
			})
			.catch((error) => {
				setMenuItems([]);
				console.error('Error:', error);
			});
	}, []);
	
		
	const handleChange = () => {
		setSemester(store.getState()[0].name);
		localStorage.setItem("currentSemester", store.getState()[0].name);
	}

	const handleInputChange = (e:SyntheticEvent<Element, Event>, value:string | null) => {
		store.dispatch({type: "write", payload: value})
	}

	useEffect(() => {

		return () => {
			unsubscribe();
		}
	})

	const unsubscribe = store.subscribe(handleChange);

	return (
		<div className="semester">
			<div>
				<Autocomplete
					disablePortal
					options={ menuItems }
					id="selectSemester"
					value={ semester }
					disableClearable
					blurOnSelect
					sx={{
						width: 250,
						fontFamily: 'Wix Madefor Text'
					}}
					onChange = { handleInputChange }
					renderInput={(params) => 
						<TextField {...params}
							inputRef={ searchInput }
							variant="standard"
							InputProps = {{
								...params.InputProps,
								disableUnderline: true,
								startAdornment: <CalendarMonthRoundedIcon 
									sx={{marginRight: '10px'}}
								/>
							}}
						 />
					}
				 />
			</div>
		</div>
	)
}

export default Semester;