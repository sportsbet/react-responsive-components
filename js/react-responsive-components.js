"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
/**
 * This function takes a component to wrap and a props object. All the props will be passed to the
 * <Responsive> component as props. Individual <WrappedResponsive> components can take breakpoints
 * and widthUnits that override the defaults.
 */
function responsiveHoC(component, propsToMixIn) {
    return (function (_super) {
        __extends(WrappedResponsive, _super);
        function WrappedResponsive() {
            return _super.apply(this, arguments) || this;
        }
        WrappedResponsive.prototype.render = function () {
            var props = Object.assign({}, propsToMixIn, this.props);
            return React.createElement(component, props);
        };
        return WrappedResponsive;
    }(React.Component));
}
exports.responsiveHoC = responsiveHoC;
/**
 * Wrap this component around anything that you want to be responsive. There are two flavours:
 *
 * 1) You pass your own components as children. All the top-level components you pass need to
 * extend ResponsiveChildProps, and they will receive "responsiveKey" as props in addition to
 * any of their normal props. The responsiveKey can be used for styling.
 * 2) You pass a function as the children of this component. The function will get the
 * responsiveKey passed into it. Use this if you need to wrap a <div> or other DOM element that
 * can't extend its props with ResponsiveChildProps, or if you want to give the responsiveKey
 * to children below the top-level.
 *
 * Whichever flavour you opt for, you can conditionally hide or show anything inside it by
 * passing showAtOrAbove or showAtOrBelow as props to <Responsive>.
 *
 * You need to pass in your breakpoints object to every <Responsive>, but you can use responsiveHoC
 * to do this for you.
 */
var Responsive = (function (_super) {
    __extends(Responsive, _super);
    function Responsive(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentBreakpoint: props.breakpoints[0]
        };
        return _this;
    }
    Responsive.prototype.componentDidMount = function () {
        var _this = this;
        if (window.matchMedia) {
            var mediaQueries = this.buildMediaQueryStrings(this.props.breakpoints);
            this.mediaQueriesWithListeners = mediaQueries.map(function (namedMediaQuery) {
                var mediaQuery = window.matchMedia(namedMediaQuery.mediaQuery);
                var listener = function () {
                    if (mediaQuery.matches) {
                        _this.setState({
                            currentBreakpoint: namedMediaQuery.breakpoint
                        });
                    }
                };
                mediaQuery.addListener(listener);
                listener();
                return { mediaQuery: mediaQuery, listener: listener };
            });
        }
    };
    Responsive.prototype.componentWillUnmount = function () {
        if (window.matchMedia) {
            this.mediaQueriesWithListeners.forEach(function (_a) {
                var mediaQuery = _a.mediaQuery, listener = _a.listener;
                mediaQuery.removeListener(listener);
            });
            delete this.mediaQueriesWithListeners;
        }
    };
    Responsive.prototype.buildMediaQueryStrings = function (breakpoints) {
        var _this = this;
        return breakpoints.map(function (breakpoint, index, allBreakpoints) {
            var mediaQuery;
            if (index === 0) {
                mediaQuery = "(max-width: " + breakpoint.width + _this.props.widthUnits + ")";
            }
            else {
                var minWidthMediaQueryString = "(min-width: " + (allBreakpoints[index - 1].width + 1) + _this.props.widthUnits + ")";
                if (breakpoint.width < Infinity) {
                    var mediaQueryString = minWidthMediaQueryString + " and (max-width: " + breakpoint.width + _this.props.widthUnits + ")";
                    mediaQuery = mediaQueryString;
                }
                else {
                    mediaQuery = minWidthMediaQueryString;
                }
            }
            return {
                breakpoint: breakpoint,
                mediaQuery: mediaQuery
            };
        });
    };
    Responsive.prototype.getComparisonBreakpoint = function (comparisonBreakpointName) {
        return this.props.breakpoints.find(function (breakpoint) {
            return breakpoint.name === comparisonBreakpointName;
        });
    };
    Responsive.prototype.render = function () {
        var childrenToRender = null;
        if (this.state.currentBreakpoint && ((!this.props.showAtOrAbove && !this.props.showAtOrBelow) ||
            (this.props.showAtOrAbove && this.state.currentBreakpoint.width >= this.getComparisonBreakpoint(this.props.showAtOrAbove).width) ||
            (this.props.showAtOrBelow && this.state.currentBreakpoint.width <= this.getComparisonBreakpoint(this.props.showAtOrBelow).width))) {
            var responsiveKey_1 = this.state.currentBreakpoint.name;
            if (typeof this.props.children === "function") {
                childrenToRender = this.props.children(responsiveKey_1);
            }
            else {
                childrenToRender = (React.createElement("div", null, React.Children.map(this.props.children, function (child) {
                    if (typeof child === "string" || typeof child === "number") {
                        // Leave string and number-type children in place as these aren't going to be responsive
                        return child;
                    }
                    else {
                        return React.cloneElement(child, {
                            responsiveKey: responsiveKey_1
                        });
                    }
                })));
            }
        }
        return childrenToRender;
    };
    return Responsive;
}(React.Component));
Responsive.defaultProps = {
    widthUnits: "px"
};
exports.Responsive = Responsive;
