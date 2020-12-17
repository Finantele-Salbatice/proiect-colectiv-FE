import DateFnsUtils from '@date-io/date-fns';
import { createStyles,  withStyles } from '@material-ui/core';
import { ColDef, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';

export interface TranzactiiProps {
	classes: any;
	rows: any;
	from: Date;
	to:  Date;
	dateChange: any;
}

export interface TranzactiiState {

}

const columns: ColDef[] = [
	{
		field: 'id', headerName: 'ID', width: 70,
	},
	{
		field: 'amount', headerName: 'Suma', width: 100,
	},
	{
		field: 'currency', headerName: 'Currency', width: 130,
	},
	{
		field: 'details', headerName: 'Details' ,width: 150,
	},
	{
		field: 'beneficiary', headerName: 'Beneficiary' ,width: 150,
	},
	{
		field: 'date_time', headerName: 'Date' ,width: 150, valueFormatter: (params: ValueFormatterParams) => {
			const value = params.value || '';
			 return  new Date(value.toString()).toLocaleDateString();
		},
	},
];

const styles = createStyles({
	container: {
		//display:'inline-flex',
		flexDirection:'column',
		display: 'inline-flex',
		flexWrap: 'wrap',
		width:'65%',
		marginLeft:'12%',
		justifyContent:'center',
	},
	cardBox: {
		display:'inline-block',
	},
	welcomeCard: {
		width:'100%',
		position:'relative',
		left:'170px',
		top:'30px',
	},
	pieCard : {
		width:'100%',
		position:'relative',
		left:'170px',
		top:'40px',
		verticalAlign: 'center',
	},
	welcomeCardIcon : {
		width:'40px',
		height:'40px',
	},
	button:{
		//marginLeft:'1340px',
		marginLeft:'1100px',
		//zIndex:1,
	},
	textField: {
		width: 200,
		marginLeft:'auto',
	},
	filtreLine : {
		display:'inline-flex',
		flexDirection:'row',
		marginLeft:'auto',
		marginBottom:'10px',
	},
	filters : {
		margin:'auto',
		display:'inline',
	},
});

class Tranzactii extends React.Component<TranzactiiProps, TranzactiiState> {

	handleData = (type: any) => (event: any , value: any) => {
		console.log(event , value);
		const data = {
			[type]: event,
		};
		this.props.dateChange(data);
	};

	render() {
		const { classes  } = this.props;
		return (
			<div className = {classes.container}>
				<div className={classes.filtreLine}>
					<div className={classes.filters}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								id="dateFrom"
								label="From"
								value={this.props.from}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={this.handleData('from')}
							/>
							<KeyboardDatePicker
								id="dateTo"
								label="To"
								value={this.props.to}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={this.handleData('to')}
							/>
						</MuiPickersUtilsProvider>
					</div>
				</div>
				<div style={{
					height: 600,
				}}>
					<DataGrid rows={this.props.rows} columns={columns} pageSize={9} />
				</div>
			</div>
		);
	}
}

export default withStyles(styles) (Tranzactii);