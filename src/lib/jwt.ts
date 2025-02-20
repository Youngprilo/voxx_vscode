import { KJUR } from 'jsrsasign';
import { useAppStore } from './stores/app';

export function encodeJWT(username: string, room: string) {
	const appStore = useAppStore();

	const kid = import.meta.env.VITE_APP_JAAS_API_KEY;
	const tenant = import.meta.env.VITE_APP_JAAS_TENANT;

	const header = {
		alg: 'RS256',
		typ: 'JWT',
		kid
	};

	const now = KJUR.jws.IntDate.getNow();
	const exp = KJUR.jws.IntDate.get('now + 1hour');

	const payload = {
		aud: 'jitsi',
		nbf: now,
		exp,
		iss: 'chat',
		context: {
			user: {
				name: username
			}
		},
		sub: tenant,
		room
	};

	const sheader = JSON.stringify(header);
	const spayload = JSON.stringify(payload);

	const secret = import.meta.env.VITE_APP_JAAS_SECRET;
	const sJWT = KJUR.jws.JWS.sign('RS256', sheader, spayload, secret);

	return sJWT;
}
