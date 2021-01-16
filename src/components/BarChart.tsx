import { createStyles, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  classes: any;
  data: any;
}
interface BarChartState {
}

const generateColor = () => {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const styles = createStyles({
});

const addColors = (barChart: any): any => {
	barChart.datasets[0].backgroundColor = generateColor();
	barChart.datasets[0].hoverBackgroundColor = generateColor();
	return barChart;
};

class BarChartComponent extends React.Component<BarChartProps,BarChartState> {
	render() {
		const { classes,data } = this.props;
		const colorData = addColors(data);
		return (
			<div className = {classes.pie}>
				{colorData.labels.length == 0 && (
					<div>Nu aveti niciun cont adaugat...</div>
				)}
				{colorData.labels.length > 0 && (
					<Bar
						data = {colorData}
						width = {80}
						height = {250}
						options={{
							maintainAspectRatio: false,
						}}/>
				)}
			</div>

		);
	}
}

export default withStyles(styles)(BarChartComponent);