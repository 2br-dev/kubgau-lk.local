import { IGroup } from "../../interfaces";

export enum EView{
	TABLE,
	CARD
}

export interface IProps{
	view: EView;
	title: string;
	data: IGroup | undefined;
}