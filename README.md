# React Responsive Components

Creates media queries at provided breakpoints, allowing various components to take different styles at different screen widths, or to be hidden completely.

# Why?

When setting up a responsive layout, it would be nice to have a simple way to get each component in the app to know about what the current form factor is, i.e. is the device small like a mobile or wide like a desktop? This library will create the media queries with listeners needed to do this, based on a simple object.

# How does it work?

You use two different components, one is the `<ResponsiveRoot>` and the other is `<Responsive>`. Wrap something near the Root component of your app with `<ResponsiveRoot>`. Then wrap your individual components that need to respond to screen size changes with `<Responsive>`.

The "name" of the currentBreakpoint becomes the responsiveKey prop. `<Responsive>` will pass this responsiveKey to all its children.

The magic happens by using the same breakpoint objects in `<ResponsiveRoot>` as in `<Responsive>`. You can use responsiveHoC to mix your pre-defined breakpoints object into both components. Better yet, you can connect both of these to a redux store, so the `<Responsive>` wrappers will automatically get notified with the new breakpoint when the form factor has changed.

# Example

```
// RootComponent.jsx
import {
	ResponsiveRoot,
	ResponsiveRootProps,
    Responsive,
    ResponsiveProps,
	responsiveHoC,
	Breakpoint
} from "react-responsive-components"

const breakpoints = [{
    name: "small",
    width: 768
}, {
    name: "medium",
    width: 1024
}, {
    name: "wide",
    width: 1280
}, {
    name: "wider",
    width: 1440
}, {
    name: "widest",
    width: Infinity
}]

interface RootState {
	currentBreakpoint: Breakpoint
}

const ResponsiveRootContainer = responsiveHoC<ResponsiveRootProps>(ResponsiveRoot, breakpoints)
const ResponsiveWrapper = responsiveHoC<ResponsiveProps>(Responsive, breakpoints)

export class RootComponent extends React.Component<void, RootState> {
	constructor() {
		super()
		this.state = {
			currentBreakpoint: breakpoints[0]
		}
		this.currentBreakpointChanged = this.currentBreakpointChanged.bind(this)
	}

	currentBreakpointChanged (currentBreakpoint: Breakpoint) {
		this.setState({ currentBreakpoint })
	}

	render() {
		return (
			<ResponsiveRootContainer currentBreakpointChanged={this.currentBreakpointChanged}>
				<div>
                    <header>
                        <ResponsiveWrapper showAtOrBelow="small" currentBreakpoint={this.state.currentBreakpoint}>
                            {(responsiveKey) => (
                                <div className="side-menu-hamburger">
                                    <i name="hamburger" className={`icon-menu-${responsiveKey}`} />
                                </div>
                            )}
                        </ResponsiveWrapper>
                    </header>
					<ResponsiveWrapper currentBreakpoint={this.state.currentBreakpoint} showAtOrAbove="medium">
						<Content />
					</ResponsiveWrapper>
				</div>
			</ResponsiveRootContainer>
		)
	}
}
 
// Content.jsx
import { ResponsiveChildProps } from "react-responsive-components"

interface ContentProps extends ResponsiveChildProps {}

export class Content extends React.Component<ContentProps, void> {
	render() {
        return (
            <div className="content">
                <div className={`content-item-${this.props.responsiveKey}`}>
                    <h3 className={`content-item-heading-${this.props.responsiveKey}`}>{props.title}</h3>
                    <div className={`content-item-text-${this.props.responsiveKey}`}>{props.content}</div>
                </div>
            </div>
		)
	}
}
```
  - See **examples** folder for a more thorough implementation



# License:

```
The MIT License

Copyright (c) 2017 Sportsbet Pty Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
