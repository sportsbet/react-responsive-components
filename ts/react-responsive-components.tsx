"use strict"

import * as React from "react"

export interface Breakpoint {
	name: string
	width: number
}

export type Breakpoints = Breakpoint[]

export interface MixedInHoCProps {
	breakpoints?: Breakpoints
}

export function responsiveHoC<TComponentProps extends MixedInHoCProps>(component: React.ComponentClass<TComponentProps>, breakpoints: Breakpoints): React.ComponentClass<TComponentProps> {
	return class WrappedResponsive extends React.Component<TComponentProps, void> {
		render() {
			const props = Object.assign({}, this.props, {
				breakpoints
			})
			return React.createElement(component, props)
		}
	}
}

export interface ResponsiveRootProps extends MixedInHoCProps {
	currentBreakpointChanged?: (breakpoint: Breakpoint) => any
	widthUnits?: "px" | "rem"
}

export class ResponsiveRoot extends React.Component<ResponsiveRootProps, void> {
	public static defaultProps: Partial<ResponsiveRootProps> = {
		widthUnits: "px"
	}

	private mediaQueriesWithListeners: {
		mediaQuery: MediaQueryList,
		listener: () => void
	}[]

	componentDidMount() {
		if (window.matchMedia) {
			const mediaQueries = this.buildMediaQueryStrings(this.props.breakpoints)
			this.mediaQueriesWithListeners = mediaQueries.map((namedMediaQuery) => {
				const mediaQuery = window.matchMedia(namedMediaQuery.mediaQuery)
				const listener = () => {
					if (mediaQuery.matches) {
						this.props.currentBreakpointChanged({
							name: namedMediaQuery.name,
							width: namedMediaQuery.maxWidth
						})
					}
				}
				mediaQuery.addListener(listener)
				listener()
				return { mediaQuery, listener }
			})
		}
	}

	componentWillUnmount() {
		if (window.matchMedia) {
			this.mediaQueriesWithListeners.forEach(({ mediaQuery, listener }) => {
				mediaQuery.removeListener(listener)
			})
			delete this.mediaQueriesWithListeners
		}
	}

	buildMediaQueryStrings(breakpoints: Breakpoints) {
		return breakpoints.map((breakpoint, index, allBreakpoints) => {
			let mediaQuery: string
			if (index === 0) {
				mediaQuery = `(max-width: ${breakpoint.width}${this.props.widthUnits})`
			} else {
				const minWidthMediaQueryString = `(min-width: ${allBreakpoints[index - 1].width + 1}${this.props.widthUnits})`
				if (breakpoint.width < Infinity) {
					const mediaQueryString = `${minWidthMediaQueryString} and (max-width: ${breakpoint.width}${this.props.widthUnits})`
					mediaQuery = mediaQueryString
				} else {
					mediaQuery = minWidthMediaQueryString
				}
			}
			return {
				name: breakpoint.name,
				maxWidth: breakpoint.width,
				mediaQuery
			}
		})
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

export interface ResponsiveProps extends MixedInHoCProps {
	currentBreakpoint?: Breakpoint
	showAtOrAbove?: string,
	showAtOrBelow?: string
}

export interface ResponsiveChildProps {
	responsiveKey?: string
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
export class Responsive extends React.Component<ResponsiveProps, void> {
	getComparisonBreakpoint(comparisonBreakpointName: string) {
		return this.props.breakpoints.find((breakpoint) => {
			return breakpoint.name === comparisonBreakpointName
		})
	}

	render() {
		let childrenToRender = null
		if (this.props.currentBreakpoint && (
			(!this.props.showAtOrAbove && !this.props.showAtOrBelow) ||
			(this.props.showAtOrAbove && this.props.currentBreakpoint.width >= this.getComparisonBreakpoint(this.props.showAtOrAbove).width) ||
			(this.props.showAtOrBelow && this.props.currentBreakpoint.width <= this.getComparisonBreakpoint(this.props.showAtOrBelow).width))
		) {
			const responsiveKey = this.props.currentBreakpoint.name
			if (typeof this.props.children === "function") {
				childrenToRender = this.props.children(responsiveKey)
			} else {
				childrenToRender = (
					<div>
						{
							React.Children.map(this.props.children, (child) => {
								if (typeof child === "string" || typeof child === "number") {
									// Leave string and number-type children in place as these aren't going to be responsive
									return child
								} else {
									return React.cloneElement(child, {
										responsiveKey
									})
								}
							})
						}
					</div>
				)
			}
		}
		return childrenToRender
	}
}
