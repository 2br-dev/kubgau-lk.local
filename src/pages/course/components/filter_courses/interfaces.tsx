export interface IFilterParams{
	disciplines: Array<string>
	courses: Array<string>
	handleApply: Function
}

export interface IFilter{
	discipline: string | null,
	course: string | null,
	search: string | null
}
