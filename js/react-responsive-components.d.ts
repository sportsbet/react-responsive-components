/// <reference types="react" />
import * as React from "react";
export interface Breakpoint {
    name: string;
    width: number;
}
export declare type Breakpoints = Breakpoint[];
export interface MixedInHoCProps {
    breakpoints?: Breakpoints;
    widthUnits?: "px" | "rem" | "em";
}
/**
 * This function takes a component to wrap and a props object. All the props will be passed to the
 * wrapped component as props. Individual <WrappedResponsive> components can take breakpoints
 * and widthUnits that override the defaults.
 */
export declare function responsiveHoC<TComponentProps extends MixedInHoCProps>(component: React.ComponentClass<TComponentProps>, propsToMixin: MixedInHoCProps): React.ComponentClass<TComponentProps>;
export interface ResponsiveRootProps extends MixedInHoCProps {
    currentBreakpointChanged?: (breakpoint: Breakpoint) => any;
}
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
export declare class ResponsiveRoot extends React.Component<ResponsiveRootProps, void> {
    static defaultProps: Partial<ResponsiveRootProps>;
    private mediaQueriesWithListeners;
    componentDidMount(): void;
    componentWillUnmount(): void;
    buildMediaQueryStrings(breakpoints: Breakpoints): {
        name: string;
        maxWidth: number;
        mediaQuery: string;
    }[];
    render(): JSX.Element;
}
export interface ResponsiveProps extends MixedInHoCProps {
    currentBreakpoint?: Breakpoint;
    showAtOrAbove?: string;
    showAtOrBelow?: string;
}
export interface ResponsiveChildProps {
    responsiveKey?: string;
}
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
 * passing showAtOrAbove and/or showAtOrBelow as props to <Responsive>.
 *
 * You need to pass in your breakpoints object to every <Responsive>, but you can use responsiveHoC
 * to do this for you.
 */
export declare class Responsive extends React.Component<ResponsiveProps, void> {
    getComparisonBreakpoint(comparisonBreakpointName: string): Breakpoint;
    render(): any;
}
