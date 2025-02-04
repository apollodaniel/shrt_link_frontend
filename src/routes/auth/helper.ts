import { parseApiRoute } from '$lib';

export type LoginFields = { email: string; password: string };
export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	creationDate: Date;
};

export type RegisterFields = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export class AuthHelper {
	static async loginUser(
		fields: LoginFields
	): Promise<{ body: any; status: number; ok: boolean }> {
		const response = await fetch(parseApiRoute('/auth/login'), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(fields),
			credentials: 'include'
		});
		return {
			body: !response.ok ? await response.json() : await response.text(),
			status: response.status,
			ok: response.ok
		};
	}
	static async registerUser(
		fields: RegisterFields
	): Promise<{ body: any; status: number; ok: boolean }> {
		const response = await fetch(parseApiRoute('/auth/register'), {
			method: 'POST',
			body: JSON.stringify(fields),
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
		return {
			body: !response.ok ? await response.json() : await response.text(),
			status: response.status,
			ok: response.ok
		};
	}
}

export class UrlHelper {}
