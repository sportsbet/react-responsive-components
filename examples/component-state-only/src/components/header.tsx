import * as React from "react"
import { ResponsiveChildProps, Breakpoint } from "../../../../js/react-responsive-components"
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
					<ResponsiveWrapper maxSize="small" currentBreakpoint={this.props.currentBreakpoint}>
						<div className="side-menu-hamburger"><i name="hamburger" className="icon-menu" /></div>
					</ResponsiveWrapper>
					<div className="brand-label"><a href="/">Hello World</a></div>
					<ResponsiveWrapper maxSize="small" currentBreakpoint={this.props.currentBreakpoint}>
						{(responsiveKey: string) => (
							<ShoppingBasket responsiveKey={responsiveKey}/>
						)}
					</ResponsiveWrapper>
				</div>
				<div>
					<ResponsiveWrapper minSize="medium" currentBreakpoint={this.props.currentBreakpoint}>
						<nav className="nav-container">
							<div className="nav-item">HOME</div>
							<div className="nav-item">ABOUT</div>
							<div className="nav-item">PRODUCTS</div>
							<div className="nav-item">SEARCH</div>
							<div className="nav-item">CONTACT US</div>
						</nav>
					</ResponsiveWrapper>
				</div>
				<ResponsiveWrapper minSize="medium" currentBreakpoint={this.props.currentBreakpoint}>
					{(responsiveKey: string) => (
						<ShoppingBasket responsiveKey={responsiveKey}/>
					)}
				</ResponsiveWrapper>
			</header>
		)
	}
}