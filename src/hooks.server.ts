import { JWT_SECRET } from '$env/static/private';
import type { JwtPayload } from '$lib/types/auth';
import { type Handle } from '@sveltejs/kit';
import * as jose from 'jose';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session');

	if (token) {
		try {
			const secret = new TextEncoder().encode(JWT_SECRET);
			const { payload } = await jose.jwtVerify(token, secret);
			event.locals.user = payload as unknown as JwtPayload;
		} catch {
			event.locals.user = null;
			event.cookies.delete('session', { path: '/' });
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
