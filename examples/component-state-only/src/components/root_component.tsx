"use strict"

import * as React from "react"
import {
	ResponsiveRoot,
	ResponsiveRootProps,
	responsiveHoC,
	Breakpoint
} from "../../../../js/react-responsive-components"
import { ResponsiveWrapper } from "./responsive_wrapper"
import { breakpoints } from "../models/breakpoints"
import { Header } from "./header"
import { Content } from "./content"

interface RootState {
	currentBreakpoint: Breakpoint
}

const ResponsiveRootContainer = responsiveHoC<ResponsiveRootProps>(ResponsiveRoot, { breakpoints })

export class RootComponent extends React.Component<void, RootState> {
	constructor() {
		super()
		this.state = {
			currentBreakpoint: breakpoints[0]
		}
		this.currentBreakpointChanged = this.currentBreakpointChanged.bind(this)
	}

	currentBreakpointChanged (currentBreakpoint: Breakpoint) {
		// It would be preferable to use redux or some such here, to avoid having to pass the parent's state to each child.
		// Doing it with state like this defeats the point of having the <ResponsiveWrapper>.
		this.setState({ currentBreakpoint })
	}

	render() {
		return (
			<ResponsiveRootContainer currentBreakpointChanged={this.currentBreakpointChanged}>
				<div>
					<ResponsiveWrapper currentBreakpoint={this.state.currentBreakpoint}>
						{(responsiveKey: string) => (
							<div>
								<Header currentBreakpoint={this.state.currentBreakpoint}/>
								<Content responsiveKey={responsiveKey}/>
							</div>
						)}
					</ResponsiveWrapper>
				</div>
			</ResponsiveRootContainer>
		)
	}
}