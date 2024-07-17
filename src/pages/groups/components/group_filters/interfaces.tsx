import { Dayjs } from "dayjs";

export interface IGroupProps{
	theme:string,
	date:Dayjs | null,
	pair: number,
	themeSetter: any,
	dateSetter: any,
	pairSetter: Function
}