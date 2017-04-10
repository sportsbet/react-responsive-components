import { Responsive, ResponsiveProps, responsiveHoC } from "../../../../js/react-responsive-components"
import { breakpoints } from "../models/breakpoints"

export const ResponsiveWrapper = responsiveHoC<ResponsiveProps>(Responsive, breakpoints)