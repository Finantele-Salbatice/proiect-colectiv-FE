import { createStyles, TextField, withStyles } from '@material-ui/core';
import { ColDef, DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import * as React from 'react';
import { Component } from 'react';

export interface TranzactiiMainPageProps {
    classes: any;
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

const rows = [
	{
		id: 1, amount: 100, currency: '$$$', details: 'asdasd', beneficiary: 'Ion', date_time: '1.1.2000',
	},
	{
		id: 2, amount: 110, currency: '$$$', details: 'asdasdasd', beneficiary: 'Ghita', date_time: '1.1.2000',
	},
	{
		id: 3, amount: 120, currency: '$$$', details: 'asdasd', beneficiary: 'Portita', date_time: '1.1.2000',
	},
	{
		id: 4, amount: 130, currency: '$$$', details: 'asdasd', beneficiary: 'Matei', date_time: '1.1.2000',
	},
	{
		id: 5, amount: 140, currency: '$$$', details: 'asdasd', beneficiary: 'Andrei', date_time: '1.1.2000',
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
					<DataGrid rows={rows} columns={columns} pageSize={5}
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