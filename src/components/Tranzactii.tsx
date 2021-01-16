import DateFnsUtils from '@date-io/date-fns';
import { createStyles,  FormControl,  InputLabel,  Select,  TextField,  withStyles } from '@material-ui/core';
import { ColDef, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';

export interface TranzactiiProps {
	classes: any;
	rows: any;
	from: Date;
	to:  Date;
	dateChange: any;
	cont: any;
	sumFrom: number;
	sumTo: number;
	listConturi: any;
}

export interface TranzactiiState {

}

const columns: ColDef[] = [
	{
		field: 'id', headerName: 'ID', width: 120,
	},
	{
		field: 'amount', headerName: 'Suma', width: 240,
	},
	{
		field: 'currency', headerName: 'Currency', width: 240,
	},
	{
		field: 'details', headerName: 'Details' ,width: 240,
	},
	{
		field: 'beneficiary', headerName: 'Beneficiary' ,width: 240,
	},
	{
		field: 'date_time', headerName: 'Date' ,width: 240, valueFormatter: (params: ValueFormatterParams) => {
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
		width:'98%',
		marginLeft:'1%',
		marginTop: '1%',
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
		flexDirection:'row',
	},
	banckFilter: {
		display:'inline-flex',
		justifyContent:'center',
		marginRight:'5%',
	},
	formControl: {
	},
	sumFilter: {
		display:'inline-flex',
		flexDirection:'row',
	},
});

class Tranzactii extends React.Component<TranzactiiProps, TranzactiiState> {

	handleData = (type: any) => (event: any) => {
		let data;

		if (type !== 'from' && type !== 'to') {

			if (type === 'sumFrom' || type === 'sumTo') {
				if (!Number(event.target.value)) {
					return;
				}
			}
			data = {
				[type]: event.target.value,
			};
		} else {
			data = {
				[type]: event,
			};
		}
		this.props.dateChange(data);
	};

	getConturi = () =>{
		return this.props.listConturi.map((elem: any)=>{
			return <option value={elem.id}>{elem.iban}</option>;
		});
	}

	render() {
		const { classes, sumFrom, sumTo } = this.props;
		return (
			<div className = {classes.container}>
				<div className={classes.filtreLine}>
					<div className={classes.sumFilter}>
						<TextField label="Sum from" variant="outlined"
							value={sumFrom}
							style={{
								marginRight:'1%', width: '40%',
							}}
							onChange={this.handleData('sumFrom')}
							type="number"
						/>
						<TextField
							label="Sum to"
							variant="outlined"
							value={sumTo}
							onChange={this.handleData('sumTo')}
							style={{
								width:'40%',
							}}
							type="number"
						/>
					</div>
					<div className={classes.banckFilter}>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel>Cont</InputLabel>
							<Select
								native
								value={this.props.cont}
								onChange={this.handleData('cont')}
								label='cont'
								inputProps={{
									name: 'cont',
									id: 'outlined-age-native-simple',
								}}
								style={{
									width:'100%',
								}}
							>
								<option value={undefined}>{'Toate'}</option>
								{this.getConturi()}
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
								style={{
									marginRight:'1%',
								}}
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