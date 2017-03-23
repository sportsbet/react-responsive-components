"use strict"

import * as React from "react"
import { ResponsiveWrapper } from "./responsive_wrapper"
import { breakpoints } from "../models/breakpoints"
import { Header } from "./header"
import { Content } from "./content"

export class RootComponent extends React.Component<void, void> {
	render() {
		return (
			<div>
				<ResponsiveWrapper>
					<Header />
					<Content />
				</ResponsiveWrapper>
			</div>
		)
	}
}