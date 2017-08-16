"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * This function takes a component to wrap and a props object. All the props will be passed to the
 * wrapped component as props. Individual <WrappedResponsive> components can take breakpoints
 * and widthUnits that override the defaults.
 */
function responsiveHoC(component, propsToMixin) {
    return (function (_super) {
        __extends(WrappedResponsive, _super);
        function WrappedResponsive() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WrappedResponsive.prototype.render = function () {
            var props = Object.assign({}, propsToMixin, this.props);
            return React.createElement(component, props);
        };
        return WrappedResponsive;
    }(React.Component));
}
exports.responsiveHoC = responsiveHoC;
/**
 * Wrap a ResponsiveRoot around one of the top-level divs in your app. It will
 * set up media query listeners based on provided breakpoints.
 *
 * You can use the responsiveHoC to mix the breakpoints object in to this
 * one as props, or just pass it in manually, but it has to match the breakpoints
 * object you use for your <Responsive> components.
 *
 * Your HoC can hook into a redux store or just the parent's state or some other
 * place that can notify the <Responsive> components when it changed. You also need
 * to implement a currentBreakpointChanged function and pass it into ResponsiveRoot
 * as props. ResponsiveRoot will call to it with the new breakpoint whenever the
 * breakpoint has changed (e.g. user has shrunk the browser window).
 */
var ResponsiveRoot = (function (_super) {
    __extends(ResponsiveRoot, _super);
    function ResponsiveRoot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResponsiveRoot.prototype.componentDidMount = function () {
        var _this = this;
        if (window.matchMedia) {
            var mediaQueries = this.buildMediaQueryStrings(this.props.breakpoints);
            this.mediaQueriesWithListeners = mediaQueries.map(function (namedMediaQuery) {
                var mediaQuery = window.matchMedia(namedMediaQuery.mediaQuery);
                var listener = function () {
                    if (mediaQuery.matches) {
                        _this.props.currentBreakpointChanged({
                            name: namedMediaQuery.name,
                            width: namedMediaQuery.maxWidth
                        });
                    }
                };
                mediaQuery.addListener(listener);
                listener();
                return { mediaQuery: mediaQuery, listener: listener };
            });
        }
    };
    ResponsiveRoot.prototype.componentWillUnmount = function () {
        if (window.matchMedia) {
            this.mediaQueriesWithListeners.forEach(function (_a) {
                var mediaQuery = _a.mediaQuery, listener = _a.listener;
                mediaQuery.removeListener(listener);
            });
            delete this.mediaQueriesWithListeners;
        }
    };
    ResponsiveRoot.prototype.buildMediaQueryStrings = function (breakpoints) {
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
                name: breakpoint.name,
                maxWidth: breakpoint.width,
                mediaQuery: mediaQuery
            };
        });
    };
    ResponsiveRoot.prototype.render = function () {
        return (React.createElement("div", null, this.props.children));
    };
    ResponsiveRoot.defaultProps = {
        widthUnits: "px"
    };
    return ResponsiveRoot;
}(React.Component));
exports.ResponsiveRoot = ResponsiveRoot;
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
 * passing minSize and/or maxSize as props to <Responsive>.
 *
 * You need to pass in your breakpoints object to every <Responsive>, but you can use responsiveHoC
 * to do this for you.
 */
var Responsive = (function (_super) {
    __extends(Responsive, _super);
    function Responsive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Responsive.prototype.getComparisonBreakpoint = function (comparisonBreakpointName) {
        return this.props.breakpoints.find(function (breakpoint) {
            return breakpoint.name === comparisonBreakpointName;
        });
    };
    // Returns true if currentBreakpoint is between minSize/maxSize values (inclusive)
    // If there are no values for either it always returns true
    Responsive.prototype.isBreakpointWithinBounds = function () {
        var atOrAboveMin = true;
        var atOrBelowMax = true;
        if (this.props.minSize) {
            atOrAboveMin = this.props.currentBreakpoint.width >= this.getComparisonBreakpoint(this.props.minSize).width;
        }
        if (this.props.maxSize) {
            atOrBelowMax = this.props.currentBreakpoint.width <= this.getComparisonBreakpoint(this.props.maxSize).width;
        }
        return atOrAboveMin && atOrBelowMax;
    };
    Responsive.prototype.render = function () {
        var childrenToRender = null;
        if (this.props.currentBreakpoint && this.isBreakpointWithinBounds()) {
            var responsiveKey_1 = this.props.currentBreakpoint.name;
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
exports.Responsive = Responsive;
