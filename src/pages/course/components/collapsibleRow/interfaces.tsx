import { ICourse } from "../../interfaces"

export interface ICollapsibleRowProps{
	row: ICourse,
	isOpen: boolean,
	toggler: Function,
	index: number
}