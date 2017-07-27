import React, { Component } from 'react';
import ReactIscroll from 'components/react-iscroll';
import 'components/react-iscroll/react-iscroll.less';
import './example.less';

class Example extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
        <div className="app-head">
          example
        </div>
        <ReactIscroll
          className="app-content"
          api={(api) => {
            this.apiReactIscroll = api;
          }}
        >
          <ul>
            {Array.from(Array(100).keys()).map((item) => (
              <li key={item}>nav{item}</li>
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
