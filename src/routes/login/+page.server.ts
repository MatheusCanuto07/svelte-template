import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

import { Argon2id } from 'oslo/password';
import { createAndSetSession } from '$lib/server/authUtils';
import { lucia } from '$lib/server/lucia';
import { userQueries } from '$lib/server/controller/user';

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    
    if(!locals.session?.id){
      console.log()
    }
    
    if (!email || !password) {
      throw redirect(303, '/login?error=Missing+email+or+password');
    }
    
    const [existingUser] = await userQueries.getUserByEmail(email.toString());
    
    if (existingUser == null) {
      throw redirect(303, '/login?error=invalidCredentials');
    }
    
    const validPassword = await new Argon2id().verify(existingUser.password, password.toString());
    
    if (!validPassword) {
      throw redirect(303, '/login?error=invalidCredentials');
    }
    
    await createAndSetSession(lucia, existingUser.id, cookies);
    
    throw redirect(303, `/`);
  }
};
