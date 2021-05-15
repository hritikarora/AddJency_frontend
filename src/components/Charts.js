import React, { Component } from 'react';
import "../css/dash.css";
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


var CanvasJS = CanvasJSReact.CanvasJS;

export default class Charts extends Component {
	render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "Most Popular Newspapers"
			},
			axisX: {
				title: "Newspapers",
				reversed: true,
			},
			axisY: {
				title: "Monthly Ads posted",
				includeZero: true,
				labelFormatter: this.addSymbols
			},
			data: [{
				type: "bar",
				dataPoints: [
					{ y:  2200, label: "Times of India" },
					{ y:  1800, label: "Patrika" },
					{ y:  800, label: "Dainik bhaskar" },
					{ y:  563, label: "The hindu" },
				
				]
			}]
		}
		return (
		<div className="charts-div">
			<CanvasJSChart options = {options}
				// onRef={ref => this.chart = ref} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	addSymbols(e){
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
}
