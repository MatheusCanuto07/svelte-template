import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session, user }}) => {
  // Pesquisar o que o locals significa
  // Toda a aplicação consegue ver essas informações
  
  // TODO: Fazer com que o usuario seja redirecionado para o login no caso dele tentar acessar outra página

	return {
		session,
		user
	};
};
