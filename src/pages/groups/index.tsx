import { ChevronLeftRounded, AddRounded, AddCommentRounded, CloseRounded, EditRounded } from "@mui/icons-material";
import InfoPanel from "../../components/info_panel";
import { InfoClass } from "../../components/info_panel/interfaces";
import { useState, useEffect } from "react";
import { Grid, Snackbar, Tooltip } from "@mui/material";
import GroupFilters from './components/group_filters';
import { useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { IGroup, IStudent, IValue } from "./interfaces";
import { Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell, Button, IconButton, List, ListItemButton, Switch } from '@mui/material';
import ValueMenu from './components/value_menu';
import { EMenuType } from "./components/value_menu/interfaces";
import './styles.scss';
import CommentModal from "./components/comment_modal";
import styled from "@emotion/styled";

const StyledSwitch = styled(Switch)(({theme}) => ({
	'& .MuiSwitch-switchBase': {

		'&.Mui-checked': {
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: '#00BFA5',
				opacity: 1
			},
		},
	},
	'& .MuiSwitch-track': {
		backgroundColor: '#FF1744',
		opacity: 1,
		'&::before, &::after': {
			content: '""',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			width: 16,
			height: 16,
			backgroundSize: 'contain'
		  }
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: '#D9D9D9'
	}
}))

export default function GroupsPage(){

	const [ panelOpen, setPanelOpen ] = useState(true);
	const [ theme, setTheme ] = useState("");
	const [ date, setDate ] = useState<Dayjs | null>(null);
	const [ pair, setPair ] = useState(1);
	const [ data, setData ] = useState<Array<IGroup> | null>(null);
	const [ snackbarOpen, setSnackbarOpen ] = useState(false);
	const [ snackbarMessage, setSnackbarMessage ] = useState("");
	const [ commentModalOpen, setCommentModalOpen ] = useState("");
	const [ comment, setComment ] = useState("");
	const [ studentId, setStudentId ] = useState(-1);
	const [ groupId, setGroupId ] = useState(-1);
	const navigate = useNavigate();

	// Прокрутка до группы
	const handleGroupClick = (e:React.MouseEvent<HTMLElement>) => {
		let groupIndex = (e.target as HTMLElement).dataset['group'];
		let link = "#group-" + groupIndex;
		let element = (document.querySelector(link) as HTMLElement);
		let top = element.offsetTop;
		window.scrollTo({ top: top - 110, behavior: 'smooth' });
	}

	// Закрытие модального окна комментария
	const closeCommentModal = () => {
		setCommentModalOpen('');
	}

	// Задание текста комментария в данных
	const setCommentField = (groupId:number, studentId:number, comment:string) => {

		// Сохранение данных перед вносом комментариев
		let newData = [...data!];

		localStorage.setItem('prevGroupsData', JSON.stringify(data));

		if(data){

			let group = data[groupId];

			if(group){

				let student = group.students[studentId];

				if(student){
					student.comment = comment;
					setData(newData);

					setCommentModalOpen('');
					setSnackbarMessage("Комментарий изменён!");
					setSnackbarOpen(true);

					// Закрываем уведомление через 2 секунды
					setTimeout(() => {
						setSnackbarOpen(false);
					}, 2000);
				}
			}
		}
	}

	// Открытие модального окна комментария
	const openCommentModal = (e:React.MouseEvent<HTMLElement>) => {
		let button = e.currentTarget as HTMLButtonElement;
		let studentId = button.dataset['studentid'] ? parseInt(button.dataset['studentid']) : -1;
		let groupId = button.dataset['groupid'] ? parseInt(button.dataset['groupid']) : -1;

		setGroupId(groupId);
		setStudentId(studentId);

		if(data !== null ){
			let student = data[groupId].students[studentId];
			if(student){
				setComment(student.comment);
			}
		}

		setCommentModalOpen(' open')
		
	}

	// Удаление оценки
	const valueRemover = (sectionId:number, studentId:number, valueId:number) => {
		let oldData:Array<IGroup>;
		const newData = oldData = [...data!];
		const section = newData[sectionId];
		const student = section.students[studentId];

		// Сохраняем данные для возможной отмены
		localStorage.setItem('prevGroupsData', JSON.stringify(oldData));

		student.values.splice(valueId, 1);
		setData(newData);
		setSnackbarMessage("Оценка удалена!");
		setSnackbarOpen(true);

		setTimeout(() => {
			setSnackbarOpen(false);
			localStorage.removeItem('prevGroupsData');
		}, 2000);
	}

	// Откат изменений
	const handleCancel = () => {
		let prevGroupsData = localStorage.getItem("prevGroupsData") || "";
		let prevData:Array<IGroup> = JSON.parse(prevGroupsData);
		setData(prevData);
		setSnackbarOpen(false);
	}

	const cancelAction = <>
		<Button onClick={handleCancel} sx={{color: 'yellow', marginRight: '10px'}}>Отмена</Button>
		<IconButton onClick={() => setSnackbarOpen(false)}>
			<CloseRounded sx={{color: '#ffffff'}} />
		</IconButton>
	</>

	// Установка оценки
	const valueSetter = (sectionId:number, studentId:number, valueId:number, val:number, name:string | null) => {
		localStorage.setItem('prevGroupsData', JSON.stringify(data));
		const newData = [...data!];
		const section = newData[sectionId];
		const student = section.students[studentId];
		const value = student.values[valueId];

		// Если оценка была, меняем её
		if(value){
			value.value = val;
			value.name = name ? name : '';

			setSnackbarMessage('Оценка изменена!');

		}else{
			// Иначе создаём её
			if(name != null){

				let value:IValue = {
					name: name,
					value: val
				}

				setSnackbarMessage('Оценка проставлена!');

				// Закрываем уведомление через 2 секунды
				setTimeout(() => {
					setSnackbarOpen(false);
				}, 2000)

				student.values.push(value);
			}else{
				alert("Укажите тип оценки!");
			}
		}

		setSnackbarOpen(true);

		setData(newData);
	}

	// Отработка кнопки "Назад"
	const back = () => {
		navigate(-1)
	}

	// Установка состояния панели
	const setter = (value:boolean, id:string) => {
		let state = {
			panelId: id,
			opened: value
		}

		let stateString = JSON.stringify(state);
		localStorage.setItem('panelState', stateString);
		setPanelOpen(value);
	}

	// Тема
	const themeSetter = (newVal:string) => {
		setTheme(newVal);

		// Вывод фильтров в консоль
		showFilters();
	}

	// Дата
	const dateSetter = (newVal:Dayjs) => {
		setDate(newVal);

		// Вывод фильтров в консоль
		showFilters();
	}

	/**
	 * Пара
	 * @param {number} newVal Новое значение
	 */
	const pairSetter = (newVal:number) => {
		setPair(newVal);

		// Вывод фильтров в консоль
		showFilters();
	}

	/**
	 * Вывод фильтров в консоль
	 */
	const showFilters = () => {

		let data = {
			theme: theme,
			date: date,
			pair: pair
		}

		console.table(data);
	}

	// Получение данных
	const getData = async () => {
		await fetch('/data/groups.json')
			.then(res => res.json())
			.then(data => setData(data))
			.catch(error => console.error(error));
	}

	/**
	 * Монтаж компонента
	 */
	useEffect(() => {
		// Состояние информационной панели
		let stateString = localStorage.getItem('panelState');

		// Чтение состояния информационной панели из localStorage
		if (stateString) {
			let state = JSON.parse(stateString);
			setter(state.opened, state.panelId);
		}else{
			setter(true, 'statement-page-info');
		}

		getData();
	}, [])

	const hereSwitcher = (e:React.SyntheticEvent, value:boolean) => {
		const dataHolder = e.currentTarget.parentElement?.parentElement?.parentElement;
		const groupId = parseInt(dataHolder?.dataset['group'] || "-1");
		const studentId = parseInt(dataHolder?.dataset['student'] || "-1");

		let newData = [...data!];

		if(data){
			let student = newData[groupId].students[studentId];
			student.isHere = value;
		}

		setData(newData);
	}

	const switchAll = (e:React.ChangeEvent)=> {
		const dataHolder = e.currentTarget.parentElement?.parentElement?.parentElement;
		const groupId = parseInt(dataHolder?.dataset['group'] || "-1");
		let el = e.target as HTMLInputElement;
		let value = el.checked;

		if(data){

			let newData = [...data];

			let group = newData[groupId];
			group.students.forEach((student) => {
				student.isHere = value;
			});

			setData(newData);
		}
	}

	return(
		<main>
			<section>
				<div className="container">
					<a href="#!" onClick={ back } className="icon-block">
						<ChevronLeftRounded />
						Назад
					</a>
					<InfoPanel id="groups-info-panel" title="Алгоритмизация и программирование" open={ panelOpen } message={<div><ol>
						<li><strong>Основная оценка</strong> предназначена для отражения результатов работы обучающегося на занятии (устный ответ, защита доклада/реферата, работа на занятии). Выставляется непосредственно во время переклички в период 7-ми дней. Исправление или удаление оценки осуществляется ТОЛЬКО сотрудниками Центра ИТ через служебную записку, подписанную начальником УМУ.</li>
						<li><strong>Дополнительная оценка</strong> предназначена для отражения результатов работы всей группы обучающихся (проведение тестирования, защиты лабораторных работ, контрольных работ, домашнего задания, расчетно-графических работ и другого). Если дополнительная оценка выставлена хотя бы одному обучающемуся, то всем остальным также должна быть выставлена оценка. Оценка может быть выставлена в период 14-ти дней даже студентам, которые отсутствовали на занятии. Исправление или удаление оценки осуществляется ТОЛЬКО сотрудниками Центра ИТ через служебную записку, подписанную начальником УМУ.</li>
					</ol></div>} type={InfoClass.INFO} setter={setter} subtitle={<>Семинрар №2 <span className="fogged">(из 5)</span></>}/>
				</div>
				<div className="container">
					<Grid container className="filters-wrapper" sx={{alignItems: 'unset'}}>
						<Grid item lg={9}>
							<GroupFilters
								theme={ theme }
								date={ date }
								pair={ pair }
								themeSetter={ themeSetter }
								dateSetter={ dateSetter }
								pairSetter={ pairSetter }
							/>
							{
								data?.map((group:IGroup, sectionIndex:number) => {

									return(
										<Card key={sectionIndex} id={"group-"+(sectionIndex + 1)}>
											<CardContent>
												<h2 style={{marginTop: 0}}>{ group.name }</h2>
												<Table>
													<TableHead>
														<TableRow>
															<TableCell colSpan={3}>ФИО</TableCell>
															<TableCell data-group={sectionIndex}><StyledSwitch onChange={switchAll} /></TableCell>
															<TableCell>Посещаемость</TableCell>
															<TableCell>Пропуски</TableCell>
															<TableCell>Оценка</TableCell>
															<TableCell sx={{textAlign: 'right'}}>Добавить оценку</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>

														{ group.students.map((student:IStudent, studentIndex:number) => {

															let skipping = <TableCell>{ student.skipping.current }/{ student.skipping.total }</TableCell>;
															let skippingPercent = <TableCell>{ student.skipping.percentage }%</TableCell>;
															let commentTooltip = student.comment === "" ? "Добавить комментарий" : "Изменить комментарий";
															let commentIcon = student.comment === "" ? <AddCommentRounded /> : <EditRounded />;
															let isHere = student.isHere;

															if(student.skipping){
																if(student.skipping.percentage >= 50){
																	skipping= <TableCell sx={{color: '#FF1744'}}>{ student.skipping.current }/{ student.skipping.total } </TableCell>
																	skippingPercent = <TableCell sx={{color: '#FF1744'}}>{ student.skipping.percentage }%</TableCell>
																}
															}

															return(
																<TableRow key={studentIndex} hover>
																	<TableCell>{ studentIndex + 1 }</TableCell>
																	<TableCell>
																		<Tooltip title={commentTooltip} placement="top">
																			<IconButton onClick={ openCommentModal } data-studentid={studentIndex} data-groupid={sectionIndex}>
																				{ commentIcon }
																			</IconButton>
																		</Tooltip>
																	</TableCell>
																	<TableCell>
																		<div className="name">{ student.fullname }</div>
																		<div className="comment">{ student.comment }</div>
																	</TableCell>
																	<TableCell>
																		<div data-group={sectionIndex} data-student={studentIndex}>
																			<StyledSwitch onChange={hereSwitcher} checked={isHere}/>
																		</div>
																	</TableCell>
																	{ skipping }
																	{ skippingPercent }
																	<TableCell>
																		<div className="values">
																			{ student.values.map((value:IValue, valueIndex:number) => {
																				return(
																					<ValueMenu
																						sectionId={sectionIndex}
																						valueId={valueIndex}
																						studentId={studentIndex}
																						name={ value.name }
																						key={valueIndex}
																						value={value.value}
																						type={EMenuType.UPDATE}
																						content={<span>{value.value}</span>}
																						changeHandler={ valueSetter }
																						removeHandler={ valueRemover }
																					/>
																				)
																			})}
																		</div>
																	</TableCell>
																	<TableCell sx={{textAlign: 'right'}}>
																		<ValueMenu 
																			sectionId={sectionIndex}
																			studentId={ studentIndex }
																			valueId={ -1 }
																			type={EMenuType.CREATE} 
																			value={-1}
																			content={ <AddRounded /> }
																			changeHandler={ valueSetter }
																			/>
																	</TableCell>
																</TableRow>
															)
														}) }
													</TableBody>
												</Table>
											</CardContent>
										</Card>
									)
								})
							}
						</Grid>
						<Grid item lg={1} />
						<Grid item lg={2}>
							<div className="pin">
								<h2>Группы</h2>
								<List>
									{ data?.map((group:IGroup, groupIndex:number) => {
										return(
											<ListItemButton key={groupIndex} data-group={groupIndex + 1} onClick={handleGroupClick}>{ group.name }</ListItemButton>
										)
									})}
								</List>
							</div>
						</Grid>
					</Grid>
				</div>
			</section>
			<Snackbar open={snackbarOpen} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} message={snackbarMessage} action={ cancelAction } />
			<CommentModal openClass={commentModalOpen} comment={comment} groupId={groupId} studentId={studentId} setter={ setCommentField } closeSetter={closeCommentModal} />
		</main>
	)
}