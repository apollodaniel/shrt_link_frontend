// place files you want to import through the `$lib` alias in this folder.
import { PUBLIC_API_URL } from '$env/static/public';
import type { ErrorEntry } from './types';

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
	},
	firstName: {
		regex: /^[A-Z][a-zA-Z]{1,}$/,
		errorMessage: 'First name must start with a capital letter and contain only letters.'
	},
	lastName: {
		regex: /^[A-Z][a-zA-Z]{1,}$/,
		errorMessage: 'Last name must start with a capital letter and contain only letters.'
	},
	newUrl: {
		regex: /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
		errorMessage: 'Invalid url'
	}
};

export const parseRoute = (route: string) => `${PUBLIC_API_URL}${route}`;
export const parseApiRoute = (route: string) => `${PUBLIC_API_URL}/api/v1${route}`;

export function isErrorEntry(err: any): boolean {
	return (
		err &&
		typeof err === 'object' &&
		typeof err.code === 'string' &&
		typeof err.message === 'string' &&
		!(err.field && typeof err.field !== 'string') &&
		typeof err.statusCode === 'number'
	);
}
