import { ReactElement } from "react";

export enum EMenuType{
	CREATE,
	UPDATE
}

export interface IValueMenuProps{
	sectionId:number,
	studentId:number,
	valueId:number,
	name?:string,
	type: EMenuType,
	content: ReactElement,
	value:number,
	removeHandler?: (sectionId:number, studentId:number, valueId:number) => void,
	changeHandler: (sectionId:number, studentId:number, valueId:number,  value:number, name:string | null) => void
}