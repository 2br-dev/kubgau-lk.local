import { Autocomplete, Button, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { IFilter, IFilterParams } from "./interfaces";
import './filter_courses.scss';

/**
 * Форма фильтров страницы курсов
 * @param disciplines Список дисциплин для Autocomplete
 * @param courses Список курсов для Autocomplete
 * @param handleApply Callback, вызываемый при изменении формы
 */
function FilterCourses(props:IFilterParams){

	// Инициализация состояний
	const [ selectedDiscipline, setSelectedDiscipline ] = useState<string>('');
	const [ selectedCourse, setSelectedCourse ] = useState<string>('');
	const [ searchText, setSearchText ] = useState<string>('');

	/**
	 * Изменение выбранной дисциплины
	 * @param event 
	 * @param value 
	 */
	const handleDisciplineChange = (event:SyntheticEvent<Element, Event>, value:string | null) => {
		if(value !== null){
			setSelectedDiscipline( value );
		}else{
			setSelectedDiscipline( '' );
		}
		let filters:IFilter = {
			discipline: value,
			course: selectedCourse,
			search: searchText
		}
		props.handleApply( filters );
	}
	
	/**
	 * Изменение выбранного курса
	 * @param event 
	 * @param value 
	 */
	const handleCourseChange = (event:SyntheticEvent<Element, Event>, value:string | null) => {
		if(value !== null){
			setSelectedCourse( value )
		}else{
			setSelectedCourse( '' );
		}
		let filters:IFilter = {
			discipline: selectedDiscipline,
			course: value,
			search: searchText
		}
		props.handleApply( filters );
	}

	/**
	 * Изменение текста строки поиска
	 */
	const handleSearchTextChange = (event:React.ChangeEvent <HTMLInputElement> )=> {
		let textbox = event.target as HTMLInputElement;
		let value = textbox.value;

		setSearchText( value );
		let filters:IFilter = {
			discipline: selectedDiscipline,
			course: selectedCourse,
			search: value
		}

		props.handleApply( filters );
	}

	/**
	 * Сброс формы
	 */
	const resetForm = () => {
		setSelectedDiscipline('')
		setSelectedCourse('')
		setSearchText('')
		let filters:IFilter = {
			discipline: "",
			course: "",
			search: ""
		}
		props.handleApply( filters );
	}

	// Рендер компонента
	return(
		<div className="filters-wrapper">
			<div className="title">
				<h3>Фильтры</h3>
			</div>
			<div className="disciplines">
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={ props.disciplines }
					value={ selectedDiscipline }
					onChange={ handleDisciplineChange }
					renderInput={(params) => 
						<TextField {...params} 
							variant="standard"
							placeholder="Все дисциплины"
							size="small"
						/>
					}
				/>
			</div>
			<div className="courses">
				<Autocomplete
					disablePortal
					id="combo-box-demo"
					options={ props.courses }
					value={ selectedCourse }
					onChange={ handleCourseChange }
					renderInput={(params) => 
						<TextField {...params} 
							placeholder="Все курсы"
							variant="standard"
							size="small"
						/>
					}
				/>
			</div>
			<div className="search">
				<TextField
					variant="standard"
					size="small"
					placeholder="Поиск"
					value={ searchText }
					onInput={ handleSearchTextChange }
				/>
			</div>
			<div className="action">
				<Button variant="outlined" onClick={resetForm}>Сброс</Button>
			</div>
		</div>
	)
}

export default FilterCourses