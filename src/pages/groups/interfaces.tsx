export interface IValue{
	value: number,
	name: string
}

export interface IStudent{
	fullname: string,
	comment: string,
	isHere: boolean,
	skipping: {
		current: number,
		total: number,
		percentage: number
	},
	values: Array<IValue>
	
}

export interface IGroup{
	name: string,
	students: IStudent[]
}