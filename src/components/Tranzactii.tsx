import DateFnsUtils from '@date-io/date-fns';
import { createStyles,  FormControl,  Input,  InputLabel,  Select,  TextField,  withStyles } from '@material-ui/core';
import { ColDef, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { Label } from '@material-ui/icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';

export interface TranzactiiProps {
	classes: any;
	rows: any;
	from: Date;
	to:  Date;
	dateChange: any;
	banca:any;
	sumFrom:number;
	sumTo:number;
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
		width:'65%',
		marginLeft:'1%',
		marginTop: '1%',
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
		display:'flex',
		flexDirection:'row',
		justifyContent:'space-between',
		marginBottom:'10px',
	},
	filters : {
		display:'flex',
		flexDirection:'row'
	},
	banckFilter: {
		display:'flex',
		justifyContent:'center',
	},
	formControl: {
	},
	sumFilter: {
		display:'flex',
		flexDirection:'row'
	}
});

class Tranzactii extends React.Component<TranzactiiProps, TranzactiiState> {

	handleData = (type: any) => (event: any) => {
		let data;

		if(type !== 'from' && type !== 'to') {
			data = {
				[type]: event.target.value,
			};
		}
		else {
			data = {
				[type]: event,
			};
		}

		this.props.dateChange(data);
	};

	render() {
		const { classes  } = this.props;
		return (
			<div className = {classes.container}>
				<div className={classes.filtreLine}>
					<div className={classes.sumFilter}>
						<TextField id="outlined-basic" label="Sum from" variant="outlined" value={this.props.sumFrom} style={{marginRight:'1%'}} />
						<TextField id="outlined-basic" label="Sum to" variant="outlined" value={this.props.sumTo} />
					</div>
					<div className={classes.banckFilter}>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel>Banca</InputLabel>
							<Select
							native
							value={this.props.banca}
							onChange={this.handleData('banca')}
							label='Banca'
							inputProps={{
								name: 'banca',
								id: 'outlined-age-native-simple',
							}}
							style={{width:'110%'}}
							>
							<option value="" />
							<option value={'BT'}>BT</option>
							<option value={'BCR'}>BCR</option>
							<option value={'BRD'}>BRD</option>
							</Select>
						</FormControl>
					</div>
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
								style={{marginRight:'1%'}} 
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