import * as React from "react"
import { ResponsiveChildProps, Breakpoint } from "react-responsive-components"
import * as classNames from "classnames"
import { ResponsiveWrapper } from "./responsive_wrapper"
import { ShoppingBasket } from "./shopping_basket"

interface HeaderProps extends ResponsiveChildProps {
    currentBreakpoint: Breakpoint
}

export class Header extends React.Component<HeaderProps, void> {
	render() {
        const key = this.props.responsiveKey
		return (
			<header className={classNames("header", { [`header-${key}`]: !!key })}>
	            <div className={classNames("upper-row", { [`upper-row-${key}`]: !!key })}>
					<ResponsiveWrapper showAtOrBelow="small" currentBreakpoint={this.props.currentBreakpoint}>
						{() => (
							<div className="side-menu-hamburger"><i name="hamburger" className="icon-menu" /></div>
						)}
					</ResponsiveWrapper>
					<div className="brand-label"><a href="/">Hello World</a></div>
					<ResponsiveWrapper showAtOrBelow="small" currentBreakpoint={this.props.currentBreakpoint}>
						<ShoppingBasket />
					</ResponsiveWrapper>
				</div>
				<div>
					<ResponsiveWrapper showAtOrAbove="medium" currentBreakpoint={this.props.currentBreakpoint}>
						{(responsiveKey: string) => (
                            <nav className="nav-container">
                                <div className="nav-item">HOME</div>
								<div className="nav-item">ABOUT</div>
								<div className="nav-item">PRODUCTS</div>
								<div className="nav-item">SEARCH</div>
								<div className="nav-item">CONTACT US</div>
                            </nav>
                        )}
					</ResponsiveWrapper>
				</div>
				<ResponsiveWrapper showAtOrAbove="medium" currentBreakpoint={this.props.currentBreakpoint}>
					<ShoppingBasket />
				</ResponsiveWrapper>
			</header>
		)
	}
}