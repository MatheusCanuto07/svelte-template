import { dev } from '$app/environment';

import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';

import { db } from './db';
import { user, session } from './schema';
// Lucia cuida mais da sessão e da autenticação do usuário

// Cria o adaptador do banco de dados
const dbAdapter = new DrizzleSQLiteAdapter(db, session, user);

//Configura o lucia
export const lucia = new Lucia(dbAdapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},

	getUserAttributes: (attributes) => {
    // quando um usuário tiver autenticado o acesso vai ser liberado a esses dois campos
		return {
			name: attributes.name,
			email: attributes.email
		};
	}
});

//Para funcionar bem com typescript
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			name: string;
			email: string;
		};
	}
}