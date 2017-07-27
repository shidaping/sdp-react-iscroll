import React, { Component } from 'react';
import ReactIscroll from 'components/react-iscroll';
import 'components/react-iscroll/react-iscroll.less';
import './example.less';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Array.from(Array(parseInt(Math.random() * 100 + 50)).keys())
    }
    this.refresh = this.refresh.bind(this);
    this.loadmore = this.loadmore.bind(this);
  }
  refresh(){
    console.log('refresh');
    this.setState({
      data: Array.from(Array(parseInt(Math.random() * 100 + 50)).keys()),
    }) 
  }
  componentDidUpdate(){
    this.apiReactIscroll.getInstance().refresh();
  }
  loadmore(){
    console.log('loadmore')
    this.setState({
      data: this.state.data.concat(  
        Array.from(Array(parseInt(Math.random() * 100 + 50)).keys()),
      )
    })
  }
  render() {
    return (
      <div className="app">
        <div className="app-head">
          example
        </div>
        <ReactIscroll
          className="app-content"
          onRefresh={this.refresh}
          onLoadmore = {this.loadmore}
          api={(api) => {
            this.apiReactIscroll = api;
          }}
        >
          <ul>
            {this.state.data.map((item,i) => (
              <li key={i}>nav{item}</li>
            ))}
          </ul>
        </ReactIscroll>
        <div className="app-foot">
          foot
        </div>
      </div>
    );
  }
}

export default Example;
