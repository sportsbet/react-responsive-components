/// <reference types="react" />
import * as React from "react";
export interface Breakpoint {
    name: string;
    width: number;
}
export declare type Breakpoints = Breakpoint[];
export interface MixedInHoCProps {
    breakpoints?: Breakpoints;
}
export declare function responsiveHoC<TComponentProps extends MixedInHoCProps>(component: React.ComponentClass<TComponentProps>, breakpoints: Breakpoints): React.ComponentClass<TComponentProps>;
export interface ResponsiveRootProps extends MixedInHoCProps {
    currentBreakpointChanged?: (breakpoint: Breakpoint) => any;
    widthUnits?: "px" | "rem";
}
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
 * passing showAtOrAbove or showAtOrBelow as props to <Responsive>.
 */
export declare class Responsive extends React.Component<ResponsiveProps, void> {
    getComparisonBreakpoint(comparisonBreakpointName: string): Breakpoint;
    render(): any;
}
