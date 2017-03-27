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
 * <Responsive> component as props. Individual <WrappedResponsive> components can take breakpoints
 * and widthUnits that override the defaults.
 */
export declare function responsiveHoC<TComponentProps extends MixedInHoCProps>(component: React.ComponentClass<TComponentProps>, propsToMixIn: MixedInHoCProps): React.ComponentClass<TComponentProps>;
export interface ResponsiveState {
    currentBreakpoint?: Breakpoint;
}
export interface ResponsiveProps extends MixedInHoCProps {
    showAtOrAbove?: string;
    showAtOrBelow?: string;
    getCurrentBreakpoint?: () => Breakpoint;
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
 * passing showAtOrAbove or showAtOrBelow as props to <Responsive>.
 *
 * You need to pass in your breakpoints object to every <Responsive>, but you can use responsiveHoC
 * to do this for you.
 */
export declare class Responsive extends React.Component<ResponsiveProps, ResponsiveState> {
    static defaultProps: Partial<ResponsiveProps>;
    private mediaQueriesWithListeners;
    constructor(props: ResponsiveProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    buildMediaQueryStrings(breakpoints: Breakpoints): {
        breakpoint: Breakpoint;
        mediaQuery: string;
    }[];
    currentBreakpointIsFunction(): Boolean;
    getCurrentBreakpoint(): Breakpoint;
    getComparisonBreakpoint(comparisonBreakpointName: string): Breakpoint;
    render(): any;
}
