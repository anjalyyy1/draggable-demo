import React, { Component } from 'react'

import Grid from "./components/Grid";
import Moveable from "./components/moveable";

class Demo extends Component {

	state= {
		dimensions: {
			width: 0,
			height: 0
		},
		showGrid: false
	}

	handleStateChange = ({key, value}) => {
		this.setState({
			[key]: value
		})
	}

	render() {
		const { showGrid } = this.state;

		return (
			<div className="demo-test">
			<Moveable handleStateChange={this.handleStateChange}/>
			{showGrid && <Grid colsWidth={116} gutterWidthSpace={92} colsHeight={65} gutterHeightSpace={49}></Grid>}
			</div>
		)
	}
}

export default Demo;
