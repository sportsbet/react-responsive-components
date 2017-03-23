import { Responsive, ResponsiveProps, responsiveHoC, MixedInHoCProps } from "../../../../js/react-responsive-components"
import { breakpoints } from "../models/breakpoints"

export const ResponsiveWrapper = responsiveHoC<ResponsiveProps>(Responsive, { breakpoints, widthUnits: "px" })