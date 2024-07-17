export enum EStatementType{
	TEST,
	COURSE,
	EXAM
}

export interface IStatementRow{
	indicator: string,
	group: string,
	date: string,
	status: {
		current: number,
		total: number,
		closeDate: string
	},
	type: EStatementType,
	statementNum: string
}

export interface IStatementEntry{
	name: string,
	code: string,
	groups: Array<IStatementRow>
}

export interface IStatementEntryProps{
	data: Array<IStatementEntry> | null
}