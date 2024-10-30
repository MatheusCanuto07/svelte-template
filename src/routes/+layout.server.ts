import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session, user } }) => {
  // Pesquisar o que o locals significa
  // Toda a aplicação consegue ver essas informações
	return {
		isUserLoggedIn: session !== null,
		user,
	};
};
