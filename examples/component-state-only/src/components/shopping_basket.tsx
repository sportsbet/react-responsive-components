import * as React from "react"
import { ResponsiveChildProps, Breakpoint } from "react-responsive-components"
import * as classNames from "classnames"
import { ResponsiveWrapper } from "./responsive_wrapper"

interface ShoppingBasketProps extends ResponsiveChildProps {}

export class ShoppingBasket extends React.Component<ShoppingBasketProps, void> {
	render() {
        const key = this.props.responsiveKey
		return (
			<div className={classNames("shopping-basket", { [`shopping-basket-${key}`]: !!key })}><i className="icon-basket" /></div>
		)
	}
}
