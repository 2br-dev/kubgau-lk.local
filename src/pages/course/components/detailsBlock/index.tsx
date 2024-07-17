import { IProps, EView } from "./interfaces";
import CardBlock from "../cardBlock";
import TableBlock from "../tableBlock";
import { Grid } from "@mui/material";


/**
 * Блок детализации
 * @param {IProps} props Параметры блока детализации
 * @returns React.Node
 */
function DetailsBlock(props:IProps){

	let component = null;

	if(props.data){
		switch(props.view){
			case EView.TABLE:
				component = <TableBlock data={props.data} title={props.title}/>;
				break;
			case EView.CARD:
				component = <CardBlock data={props.data} title={props.title}/>;
				break;
		}
	}else{
		return <></>
	}

	return <Grid item xl={4} lg={4}>{component}</Grid>;
}

export default DetailsBlock;