import { createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

// https://material-ui.com/customization/default-theme/?expand-path=$.palette
// https://www.youtube.com/watch?v=Q4o0GmfNpJc
export const lightTheme = createMuiTheme({
	palette: {
		type: "light",
		// primary: {
		// Purple and green play nicely together.
		// main: purple[500],
		// },
	},
});
