import { set, get } from "idb-keyval";

const DB_NAME = "isModernApp";

export default {
	setApplication: async function (choice) {
		try {
			set(DB_NAME, choice);
		} catch (err) {
			console.error(err);
		}
	},

	getAppChoice: async function () {
		try {
			return get(DB_NAME);
		} catch (err) {
			console.error(err);
		}
	},
};
