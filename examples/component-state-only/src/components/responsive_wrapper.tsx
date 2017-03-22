import {
	Responsive,
	ResponsiveProps,
	responsiveHoC
} from "react-responsive-components"
import { breakpoints } from "../models/breakpoints"

export const ResponsiveWrapper = responsiveHoC<ResponsiveProps>(Responsive, breakpoints)