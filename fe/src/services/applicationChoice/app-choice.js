import { set, get } from "idb-keyval";

const DB_NAME = "isModernApp";
const BASIC = "/basic";
const FULL = "/full";


/**
 * This is setting the application choice
 * @param choice The endpoint you want to set as default app
 */
export const setAppChoice = async (choice) => {
	try {
		set(DB_NAME, choice);
	} catch (err) {
		console.error(err);
	}
}

/**
 * Swapps from Basic and Full app. If something breaks
 * it sets the default to home '/'
 */
export const swapApp = async () => {
	const currAppChoice = await getAppChoice();
	if (currAppChoice === BASIC) {
		setAppChoice(FULL);
		return FULL
	} else if (currAppChoice === FULL) {
		setAppChoice(BASIC);
		return BASIC
	} else {
		// If something breaks, just reset them to select again
		setAppChoice('/')
		return "/"
	}

}

/**
 * Gets the current default app choice
 */
export const getAppChoice = async function () {
	try {
		return get(DB_NAME);
	} catch (err) {
		console.error(err);
	}
}