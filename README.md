# sdp-react-iscroll
## description
integrage iscroll to react, and add scroll bottom to load more and pull down to refresh
## how to use
`npm install sdp-react-iscroll`
## example
``` JSX
import React, { Component } from 'react';
import ReactIscroll from 'sdp-react-iscroll';
import 'sdp-react-iscroll/dist/react-iscroll.css';


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
          topText={{
            state1: '下拉刷新',
            state2: '松开刷新',
          }}
          bottomText="加载更多"
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

```
## to develop
clone the project and run 
`npm install && npm run dev`
visit [http://localhost:3000](http://localhost:3000)

