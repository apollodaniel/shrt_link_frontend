// place files you want to import through the `$lib` alias in this folder.

export const REGEX_VALIDATORS = {
	email: {
		regex: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
		errorMessage: 'Invalid Email format'
	},
	password: {
		hasSymbols: {
			regex: /[!@#$%^&*(),.?":{}|<>]/,
			errorMessage: 'Add a symbol (e.g., @, #, &).'
		},
		hasNumbers: {
			regex: /\d/,
			errorMessage: 'Add a number (0-9).'
		},
		hasLetters: {
			regex: /[a-zA-Z]/,
			errorMessage: 'Add a letter (a-z, A-Z).'
		},
		hasEightDigits: {
			regex: /.{8,}/,
			errorMessage: 'Use at least 8 characters.'
		},
		startsCapitalized: {
			regex: /^[A-Z]/,
			errorMessage: 'Start with a capital letter.'
		}
	}
};

export type UrlSummary = {
	url: {
		id: string;
		originalUrl: string;
		creationDate: Date;
	};
	countByCountry: { country: string; count: string }[];
	countByDevice: { device: string; count: string }[];
	countByBrowser: { browser: string; count: string }[];
	countByDay: { day: Date; count: string }[];
	countByTimeOfDay: { hour: string; count: string }[];
	totalClicks: number;
};

export type UrlGeneralSummary = {
	countByUrl: { id: string; count: string }[];
	countByCountry: { country: string; count: string }[];
	countByDevice: { device: string; count: string }[];
	countByBrowser: { browser: string; count: string }[];
	countByDay: { day: Date; count: string }[];
	countByTimeOfDay: { hour: string; count: string }[];
	totalClicks: number;
};
