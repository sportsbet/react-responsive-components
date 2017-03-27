# React Responsive Components

Creates media queries at provided breakpoints, allowing various components to take different styles at different screen widths, or to be hidden completely.

# Why?

When setting up a responsive layout, it would be nice to have a simple way to get each component in the app to know about what the current form factor is, i.e. is the device small like a mobile or wide like a desktop? This library will create the media queries with listeners needed to do this, based on a simple object.

# How does it work?

Just wrap your individual components that need to respond to screen size changes with `<Responsive>`.

The difference in this library, as opposed to some of the other media query options out there, is that the "name" of the currentBreakpoint becomes a responsiveKey prop, which `<Responsive>` will pass to all its children. You can use this to apply different styles at different widths.

If you want to completely hide or show a component at a given breakpoint, just pass "showAtOrAbove" or "showAtOrBelow" as a prop to the `<Responsive>` around it. The value of each of these is the "name" of the breakpoint.

The `<Responsive>` component will set up all the media queries you need, based on the breakpoints you passed in. If your layout always responds to the same breakpoints, you can use responsiveHoC to mix a pre-defined breakpoints object into `<Responsive>` and the HoC you get back will always have those breakpoints automatically, saving a bit of boilerplate. If you'd like to use a different default width unit other than px, you can mix that in with the HoC as well.

If you want to handle your own media query listeners, you can pass in a `getCurrentBreakpoint()` callback to `<Responsive>`. Listeners will not be set up, and it will compare "showAtOrAbove" and "showAtOrBelow" to the callback's current breakpoint.

# Example

```
// RootComponent.jsx
import {
    Responsive,
    ResponsiveProps,
	responsiveHoC
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

const ResponsiveWrapper = responsiveHoC<ResponsiveProps>(Responsive, breakpoints)

export class RootComponent extends React.Component<void, RootState> {
	render() {
		return (
			<div>
                <header>
                    <ResponsiveWrapper showAtOrBelow="small">
                        {(responsiveKey) => (
                            <div className="side-menu-hamburger">
                                <i name="hamburger" className={`icon-menu-${responsiveKey}`} />
                            </div>
                        )}
                    </ResponsiveWrapper>
                </header>
                <ResponsiveWrapper showAtOrAbove="medium">
                    <Content />
                </ResponsiveWrapper>
            </div>
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
