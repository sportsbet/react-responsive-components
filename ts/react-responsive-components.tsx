"use strict"

import * as React from "react"

export interface Breakpoint {
	name: string
	width: number
}

export type Breakpoints = Breakpoint[]

export interface MixedInHoCProps {
	breakpoints?: Breakpoints
	widthUnits?: "px" | "rem" | "em"
}

/**
 * This function takes a component to wrap and a props object. All the props will be passed to the
 * wrapped component as props. Individual <WrappedResponsive> components can take breakpoints
 * and widthUnits that override the defaults.
 */
export function responsiveHoC<TComponentProps extends MixedInHoCProps>(component: React.ComponentClass<TComponentProps>, propsToMixin: MixedInHoCProps): React.ComponentClass<TComponentProps> {
	return class WrappedResponsive extends React.Component<TComponentProps> {
		render() {
			const props = Object.assign({}, propsToMixin, this.props)
			return React.createElement(component, props)
		}
	}
}

export interface ResponsiveRootProps extends MixedInHoCProps {
	currentBreakpointChanged?: (breakpoint: Breakpoint) => any
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
				const fontSize = Number(window.getComputedStyle(document.body).getPropertyValue("font-size").match(/\d+/))
				const shift = (this.props.widthUnits === "px") ? 1 : 1 / fontSize

				const minWidthMediaQueryString = `(min-width: ${allBreakpoints[index - 1].width + shift}${this.props.widthUnits})`

				if (breakpoint.width < Infinity) {
					mediaQuery = `${minWidthMediaQueryString} and (max-width: ${breakpoint.width}${this.props.widthUnits})`
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
	maxSize?: string
	minSize?: string
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
 * passing minSize and/or maxSize as props to <Responsive>.
 *
 * You need to pass in your breakpoints object to every <Responsive>, but you can use responsiveHoC
 * to do this for you.
 */
export class Responsive extends React.Component<ResponsiveProps, void> {

	getComparisonBreakpoint(comparisonBreakpointName: string) {
		return this.props.breakpoints.find((breakpoint) => {
			return breakpoint.name === comparisonBreakpointName
		})
	}

	// Returns true if currentBreakpoint is between minSize/maxSize values (inclusive)
	// If there are no values for either it always returns true
	private isBreakpointWithinBounds() : boolean {
		let atOrAboveMin: boolean = true
		let atOrBelowMax: boolean = true

		if (this.props.minSize) {
			atOrAboveMin = this.props.currentBreakpoint.width >= this.getComparisonBreakpoint(this.props.minSize).width
		}

		if (this.props.maxSize) {
			atOrBelowMax = this.props.currentBreakpoint.width <= this.getComparisonBreakpoint(this.props.maxSize).width
		}

		return atOrAboveMin && atOrBelowMax
	}

	render() {

		if (this.props.currentBreakpoint && this.isBreakpointWithinBounds()) {
			if (typeof this.props.children === "function") {
				const responsiveKey = this.props.currentBreakpoint.name
				return this.props.children(responsiveKey)
			} else {
				return this.props.children
			}
		} else {
			return null
		}
	}
}
