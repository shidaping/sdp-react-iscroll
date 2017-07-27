'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _iscrollProbe = require('iscroll/build/iscroll-probe.js');

var _iscrollProbe2 = _interopRequireDefault(_iscrollProbe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isPassive() {
  var supportsPassiveOption = false;
  try {
    addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveOption = true;
      }
    }));
  } catch (e) {}
  return supportsPassiveOption;
}

var ReactIscroll = function (_Component) {
  _inherits(ReactIscroll, _Component);

  function ReactIscroll(props) {
    _classCallCheck(this, ReactIscroll);

    var _this = _possibleConstructorReturn(this, (ReactIscroll.__proto__ || Object.getPrototypeOf(ReactIscroll)).call(this, props));

    _this.state = {
      topText: props.topText.state1
    };
    _this.props.api({
      getInstance: function getInstance() {
        return _this.instance;
      }
    });
    _this.touchmoveListener = null;
    return _this;
  }

  _createClass(ReactIscroll, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var domThis = _reactDom2.default.findDOMNode(this);
      if (!this.touchmoveListener) {
        this.touchMoveListener = document.addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, isPassive() ? {
          capture: false,
          passive: false
        } : false);
      }
      this.instance = new _iscrollProbe2.default(domThis, {
        probeType: 3,
        mouseWheel: true
      });
      this.instance.refresh();
      this.instance.on('scroll', function () {
        // console.log(this.instance.y);
        if (_this2.instance.y > 50) {
          _this2.needRefresh = true;
          _this2.setState({
            topText: _this2.props.topText.state2
          });
        } else {
          _this2.setState({
            topText: _this2.props.topText.state1
          });
        }
      });
      this.instance.on('scrollEnd', function () {
        if (_this2.needRefresh) {
          if (_this2.props.onRefresh) {
            _this2.props.onRefresh();
            _this2.needRefresh = false;
          }
        }
        if (_this2.instance.y < _this2.instance.maxScrollY + 40) {
          if (_this2.props.onLoadmore) {
            _this2.props.onLoadmore();
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className + ' react-iscroll__wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'react-iscroll__scroller' },
          _react2.default.createElement(
            'div',
            { className: 'react-iscroll__head' },
            _react2.default.createElement(
              'div',
              { className: 'react-iscroll__head-content' },
              this.state.topText
            )
          ),
          this.props.children,
          _react2.default.createElement(
            'div',
            { className: 'react-iscroll__foot' },
            _react2.default.createElement(
              'div',
              { className: 'react-iscroll__foot-content' },
              this.props.bottomText
            )
          )
        )
      );
    }
  }]);

  return ReactIscroll;
}(_react.Component);

ReactIscroll.propTypes = {
  children: _propTypes2.default.any,
  api: _propTypes2.default.func,
  className: _propTypes2.default.string,
  options: _propTypes2.default.any,
  topText: _propTypes2.default.object,
  bottomText: _propTypes2.default.string,
  onRefresh: _propTypes2.default.func,
  onLoadmore: _propTypes2.default.func,
  showTop: _propTypes2.default.bool,
  showBottom: _propTypes2.default.bool
};
ReactIscroll.defaultProps = {
  topText: {
    state1: '下拉刷新',
    state2: '松开刷新'
  },
  bottomText: '加载更多',
  showTop: true,
  showbottom: true
};

exports.default = ReactIscroll;