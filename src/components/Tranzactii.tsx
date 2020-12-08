import { createStyles, TextField, withStyles } from '@material-ui/core';
import { ColDef, DataGrid } from '@material-ui/data-grid';
import * as React from 'react';

export interface TranzactiiProps {
    classes: any;
}

export interface TranzactiiState {

}

const columns: ColDef[] = [
	{
		field: 'id', headerName: 'ID', width: 70,
	},
	{
		field: 'suma', headerName: 'Suma', width: 100,
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
		field: 'data', headerName: 'Data' ,width: 120,
	},
];

const rows = [
	{
		id: 1, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' , data :'cand vr eu',
	},
	{
		id: 2, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 3, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 4, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 5, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 6, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 7, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 8, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
	},
	{
		id: 9, suma: 'Snow', currency: 'Jon', details: 35,beneficiary:'mama la iulius' ,data :'cand vr eu',
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
		justifyContent:'center'
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
		marginLeft:'auto'
	},
	filtreLine : {
		display:'inline-flex',
		flexDirection:'row',
		marginLeft:'auto',
		marginBottom:'10px'
	},
	filters : {
		margin:'auto',
		display:'inline'
	}
});

class Tranzactii extends React.Component<TranzactiiProps, TranzactiiState> {
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.container}>
				<div className={classes.filtreLine}>
					<div className={classes.filters}>
						<TextField
							id="dateFrom"
							label="From"
							type="date"
							defaultValue="2017-05-24"
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="dateTo"
							label="To"
							type="date"
							defaultValue="2017-05-24"
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
				</div>
				<div style={{
					height: 600,
				}}>
					<DataGrid rows={rows} columns={columns} pageSize={16} />
				</div>
			</div>
		);
	}
}

export default withStyles(styles) (Tranzactii);