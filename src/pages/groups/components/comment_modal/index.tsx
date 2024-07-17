import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICommentModalProps } from './interfaces';

export default function CommentModal(props:ICommentModalProps){

	const [ open, setOpen ] = useState('')
	const [ comment, setComment ] = useState('');

	// Подтверждение изменений
	const setCommentField = () => {
		
		props.closeSetter?.();
		if(props.comment !== comment)
			props.setter?.(props.groupId, props.studentId, comment);
	}

	// Изменение текста комментария в State'е
	const commentChangeEvent = (e:React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	}

	// Закрытие модального окна по нажатию "отмена"
	const closeCommentButton = () => {
		props.closeSetter?.();
	}

	// 
	const clickAwayHandler = (e:React.MouseEvent<HTMLDivElement>) => {
		let path = Array.from(e.nativeEvent.composedPath());
		let modal = path.filter((el:EventTarget) => {
			let element = el as HTMLElement;
			if(element.classList){
				return element.classList.contains('modal');
			}
			return null;
		})

		if(!modal.length)
			props.closeSetter?.();
	}

	useEffect(() => {
		setOpen(props.openClass);
		setComment(props.comment);
	}, [props.openClass, props.comment])

	return(
		<div className={"modal-wrapper" + open} onClick={clickAwayHandler}>
			<div className="modal">
				<div className="modal-content">
					<TextField placeholder="Текст комментария" sx={{width: '100%'}} rows={5} multiline={true} value={comment} onInput={commentChangeEvent} />
				</div>
				<div className="modal-footer">
					<Button onClick={closeCommentButton}>Отмена</Button>
					<Button onClick={setCommentField}>Ок</Button>
				</div>
			</div>
		</div>
	)
}