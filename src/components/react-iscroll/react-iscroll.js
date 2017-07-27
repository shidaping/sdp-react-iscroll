import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Iscroll from 'iscroll/build/iscroll-probe.js';


function isPassive() {
  var supportsPassiveOption = false;
  try {
    addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassiveOption = true;
      }
    }));
  } catch (e) {}
  return supportsPassiveOption;
}

class ReactIscroll extends Component {
  constructor(props) {
    super(props);
    this.props.api({
      getInstance: () => {
        return this.instance;
      }, 
    });
    this.touchmoveListener = null;
  }
  componentDidMount() {
    const domThis = ReactDOM.findDOMNode(this);



    if (!this.touchmoveListener) {
      this.touchMoveListener = document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false,
      } : false);
    }
    this.instance = new Iscroll(domThis, {
      probeType: 3,
      mouseWheel: true,
      startY: -50
    });
    this.instance.refresh();
    this.instance.on('scroll', () => {
      console.log(this.instance.y);
    })
    this.instance.on('scrollEnd', (e) => {
      console.log(222);
      // this.instance.scrollTo(0, -40, 50, 0);
    })
  }
  render() {
    return (
      <div className={`${this.props.className} react-iscroll__wrapper`}>
        <div className="react-iscroll__scroller">
          <div>下拉刷新</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
ReactIscroll.propTypes = {
  children: PropTypes.any,
  show: PropTypes.bool,
  api: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.any,
};

export default ReactIscroll;