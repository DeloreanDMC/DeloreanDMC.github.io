'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rectangle = function (_React$Component) {
    _inherits(Rectangle, _React$Component);

    function Rectangle(props) {
        _classCallCheck(this, Rectangle);

        var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, props));

        _this.swiped = function () {
            _this.setState({ color: "#00FFFF" });
        };

        _this.state = { color: "#0044FF" };
        return _this;
    }

    _createClass(Rectangle, [{
        key: "render",
        value: function render() {
            var box = {
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF"
            };
            var btn = {
                width: "200px",
                height: "200px",
                backgroundColor: this.state.color
            };
            return React.createElement(
                "div",
                { style: box },
                React.createElement(
                    "button",
                    { style: btn, onTouchStart: this.swiped, onClick: this.swiped },
                    "\u0414\u043E\u0433\u043E\u043D\u0438 \u043C\u0435\u043D\u044F"
                )
            );
        }
    }]);

    return Rectangle;
}(React.Component);

var airconsole = new AirConsole({ "orientation": AirConsole.ORIENTATION_LANDSCAPE });

var domContainer = document.querySelector('#player_id');
ReactDOM.render(React.createElement(Rectangle, null), domContainer);