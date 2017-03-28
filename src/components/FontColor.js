import React, { Component } from 'react';
import {connect} from 'react-redux';
//core actions

import { clearAll } from '../constants_actioncreators/boxes';
import { previewLive } from '../reducers/siblings';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';

import {showPreview, hidePreview } from '../reducers/preview';


const mapStateToProps = (state) => {
  return {
    boxes: state.get('boxes').toJS(),
    preview: state.get('preview').toJS().preview,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showPreview(boxes){
      dispatch(showPreview(boxes))
    },
    hidePreview(){
      dispatch(hidePreview())
    },
    previewLive(boxes){
      dispatch(previewLive(boxes))
    },
    clear(){
      dispatch(clearAll())
    }
  }
}



class FontColor extends Component{
  constructor(props){
    super(props);
    this.state= {
      colorsPicked:[],
      headerFont:'',
      paragraphFont:'',

    }
    this.pickColor=this.pickColor.bind(this);
    this.pickHeader=this.pickHeader.bind(this);
    this.pickParagraph=this.pickParagraph.bind(this);
    this.showHide=this.showHide.bind(this);
    this.getPreview=this.getPreview.bind(this);

  }

  pickColor=((e)=>{
    // add in the js color picker here for the final workflow- npm install
    console.log(e.target);

  })

  pickHeader=((e)=>{
    // add in the js color picker here for the final workflow- npm install
    console.log(e.target);

  })

  pickParagraph=((e)=>{
    // add in the js color picker here for the final workflow- npm install
    console.log(e.target);

  })

  showHide = (e) => {
    e.preventDefault();
    let previewCur = this.props.preview;

    if (previewCur===true){
      console.log('true, need to set to false');
      this.props.hidePreview();
    } else {
      this.props.showPreview(this.props.boxes);
    }
  }

  getPreview = (e) =>{
    this.props.previewLive(this.props.boxes);
    console.log('check store for html-jsx and css', history, this.props);
    //<Redirect to="/preview" push={true} />;
    //history.pushState('/preview', []);
  }


    render(){

    return (
            <div className="fontOptions bkoffwhite row border1">
              <div className="col-lg-10 row">
                    <div className="col-lg-2">
                          <p className="TrendHandMade closer">other options</p>
                          <p className="small">to include in css classes</p>
                    </div>
                    <div className="col-lg-3">
                      <form onChange="">
                        <select name="headers" className="bkwhite" >
                            <option value="volvo">google header font options</option>
                          </select>
                          <p className="small">sample</p>
                      </form>
                    </div>
                    <div className="col-lg-3">
                      <form onChange="">
                        <select name="paragraphs" className="bkwhite" >
                            <option value="volvo">google paragraph font options</option>
                          </select>
                          <p className="small">sample</p>
                      </form>
                    </div>
                    <div className="col-lg-2 block-center text-center">

                    <button className="btn btn-default btn-sm clearBtn" onClick={this.showHide} ><span className="TrendHandMade closer">hierarchies</span></button>

                  </div>
                    <div className="col-lg-2 block-center text-center">

                    <button className="btn btn-default btn-sm clearBtn text-center" onClick={this.getPreview} ><Link to="/preview"><span className="TrendHandMade closer"> preview </span></Link> </button>

                  </div>
                  </div>
                  <div className="col-lg-2 block-center text-center">

                    <button className="btn btn-default btn-sm clearBtn" onClick={() => this.props.clear()} ><span className="TrendHandMade closer">clear layout</span></button>

                  </div>
              </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(FontColor);
