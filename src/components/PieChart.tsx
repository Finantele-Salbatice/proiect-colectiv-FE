import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  classes: any;
  data: any;
}
interface PieChartState {
}

const generateColors = (size: number) => {
	const colors: string[] = [];
	for (let i = 0; i < size; i++) {
		let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		while (colors.includes(randomColor)) {
			randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
		}
		colors.push(randomColor);
	}
	return colors;
};

const styles = createStyles({
});

const addColors = (pie: any): any => {
	const size = pie.datasets[0].data.length;
	const pieColors = generateColors(size);
	const hoverPieColors = generateColors(size);
	pie.datasets[0].backgroundColor = pieColors;
	pie.datasets[0].hoverBackgroundColor = hoverPieColors;
	return pie;
};

class PieChartComponent extends React.Component<PieChartProps,PieChartState> {
	render() {
		const { classes,data } = this.props;
		const colorData = addColors(data);
		return (
			<div className = {classes.pie}>
				{colorData.labels.length == 0 && (
					<div>Nu aveti niciun cont adaugat...</div>
				)}
				{colorData.labels.length > 0 && (
					<Pie data = {colorData} width = {10} height = {3.5}/>
				)}
			</div>

		);
	}
}

export default withStyles(styles)(PieChartComponent);
