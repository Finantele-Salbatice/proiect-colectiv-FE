import { createStyles, withStyles } from '@material-ui/core';
import { ColDef, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import * as React from 'react';

export interface TranzactiiMainPageProps {
	classes: any;
	tranzactii: any;
}

export interface TranzactiiMainPageState {

}

const styles = createStyles({

});

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
		field: 'date_time', headerName: 'Data' ,width: 150, valueFormatter: (params: ValueFormatterParams) => {
			const value = params.value || '';
			return  new Date(value.toString()).toLocaleDateString();
		},
	},
];

class TranzactiiMainPage extends React.Component<TranzactiiMainPageProps, TranzactiiMainPageState> {
	render() {
		const { classes } = this.props;
		return (
			<div className = {classes.container}>
				<div style={{
					height: 400,
					width: 752,
				}}>
					<h2>Ultimele tale 5 tranzactii</h2>
					<DataGrid rows={this.props.tranzactii} columns={columns} pageSize={5}
						hideFooter = {true}
						hideFooterRowCount = {true}
						hideFooterPagination = {true}
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(TranzactiiMainPage);