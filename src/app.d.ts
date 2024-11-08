import type {User} from "$lib/server/schema"
import type {Session} from "$lib/server/schema";
declare global {
	namespace App {
    // Variaveis universais da request
    interface Locals {
      user: User | null
      session: Session | null
    }
    // interface Error {}
		// interface PageData {}

    // shallow routing
		// interface PageState {}
    
		// interface Platform {}
	}
}

export {};
