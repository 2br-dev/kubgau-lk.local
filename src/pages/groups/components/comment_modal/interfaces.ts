export interface ICommentModalProps{
	openClass: string,
	comment: string,
	groupId: number,
	studentId: number,
	setter: (groupId:number, studentId:number, comment:string) => void,
	closeSetter: () => void
}