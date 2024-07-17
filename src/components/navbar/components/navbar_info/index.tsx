import { ErrorRounded, InfoRounded, WarningRounded } from '@mui/icons-material';
import './styles.scss';

export enum EType{
	INFO = 'info',
	WARNING = 'warning',
	ERROR = 'error'
}

interface INavbarInfoProps{
	message: string,
	type: EType
}

function NavbarInfo(props:INavbarInfoProps){

	let icon;

	switch(props.type){
		case "info": icon = <InfoRounded />; break;
		case "error": icon = <ErrorRounded />; break;
		case "warning": icon = <WarningRounded />; break;
	}

	return(
		<div className={"navbar-info " + props.type}>
			<div className="container icon-block">{ icon } { props.message }</div>
		</div>
	)
}

export default NavbarInfo;