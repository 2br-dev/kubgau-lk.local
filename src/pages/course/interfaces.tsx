export interface ISubgroup{
	group: string,
	current: number,
	total: number
}

export interface IGroup{
	current: number,
	total: number,
	list: Array<ISubgroup> | Array<string>
}

export interface ICourse{
	id: number
	name: string,
	course: string,
	lections?: IGroup,
	seminars?: IGroup,
	labs?: IGroup
}