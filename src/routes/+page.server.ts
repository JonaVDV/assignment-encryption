import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import crypto from 'crypto';

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

function encrypt(text: string) {
	const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
	let encrypted = cipher.update(text, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}

function decrypt(encryptedText: string) {
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
	let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}

export const actions: Actions = {
	encrypt: async ({ request }) => {
		const formData = Object.fromEntries((await request.formData()).entries());

		const data = formData.message as string;
		const encrypted = encrypt(data);
		return {
			encrypted
		};
	},
	decrypt: async ({ request }) => {
		const formData = Object.fromEntries((await request.formData()).entries());

		const data = formData.encrypted as string;
		const decrypted = decrypt(data);

		return {
			decrypted
		};
	}
};
