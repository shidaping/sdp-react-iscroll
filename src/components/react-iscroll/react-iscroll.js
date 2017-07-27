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
    this.state = {
      topText: props.topText.state1,
    };
    this.props.api({
      getInstance: () => this.instance,
    });
    this.touchmoveListener = null;
  }
  componentDidMount() {
    const domThis = ReactDOM.findDOMNode(this);
    if (!this.touchmoveListener) {
      this.touchMoveListener = document.addEventListener('touchmove', function(e) { e.preventDefault(); }, isPassive() ? {
        capture: false,
        passive: false,
      } : false);
    }
    this.instance = new Iscroll(domThis, {
      probeType: 3,
      mouseWheel: true,
    });
    this.instance.refresh();
    this.instance.on('scroll', () => {
      console.log(this.instance.y);
      if (this.instance.y > 50) {
        this.needRefresh = true;
        this.setState({
          topText: this.props.topText.state2,
        });
      } else {
        this.setState({
          topText: this.props.topText.state1,
        });
      }
    });
    this.instance.on('scrollEnd', () => {
      if (this.needRefresh) {
        if (this.props.onRefresh) {
          this.props.onRefresh();
          this.needRefresh = false;
        }
      }
      if (this.instance.y < this.instance.maxScrollY + 40) {
        if (this.props.onLoadmore) {
          this.props.onLoadmore();
        }
      }
    });
  }
  render() {
    return (
      <div className={`${this.props.className} react-iscroll__wrapper`}>
        <div className="react-iscroll__scroller">
          <div className="react-iscroll__head">
            <div className="react-iscroll__head-content">{this.state.topText}</div>
          </div>
          {this.props.children}
          <div className="react-iscroll__foot">
            <div className="react-iscroll__foot-content">{this.props.bottomText}</div>
          </div>
        </div>
      </div>
    );
  }
}
ReactIscroll.propTypes = {
  children: PropTypes.any,
  api: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.any,
  topText: PropTypes.object,
  bottomText: PropTypes.string,
  onRefresh: PropTypes.func,
  onLoadmore: PropTypes.func,
  showTop: PropTypes.bool,
  showBottom:PropTypes.bool,
};
ReactIscroll.defaultProps = {
  topText: {
    state1: '下拉刷新',
    state2: '松开刷新',
  },
  bottomText: '加载更多',
  showTop: true,
  showbottom: true,
};

export default ReactIscroll;
