import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigations';
import ViewGroups from './ViewGroups';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {saveGroup} from '../constants_actioncreators/layout';
import '../style/css/App.css';

import { setBox, addBox, removeBox, setParent, addChild, removeParent, removeChild, copyBox } from '../constants_actioncreators/boxes';


const mapStateToProps = (state) => {
	const ids = Object.keys(state.get('boxes').toJS());
	return {
		boxes: state.get('boxes').toJS(),
		boxesCss: state.get('sibling'),
		html: state.get('html'),
		boxIds: ids,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
	}
}


class User extends Component {
	constructor(props){
		super(props);
		this.state= {}
		this.boxAdder=this.boxAdder.bind(this);

	}

	boxAdder = (e => {
		let tagType = e.target.attributes.value.value;
		const id = +this.props.nextBoxId;
		this.props.addBox(id, tagType);
	})

	boxCopier = (boxToCopy) => { // here or on drawHere
		const newBoxId = +this.props.nextBoxId;
		this.props.copyBox(boxToCopy, newBoxId);
	}

	render(){
		const boxes = this.props.boxes;
		const boxIds = this.props.boxIds;

		return (
			<div className="App bkgrey">
				<div className="container-fluid ">
					<Navigation page="user"/>
				{/* rework once index is revised*/}
					<ViewGroups />
					{/*<Footer />*/}
			</div>
		</div>
		)
	}
}

export default connect(mapStateToProps, null)(User);
