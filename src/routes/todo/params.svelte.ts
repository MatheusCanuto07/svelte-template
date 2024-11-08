import { page, navigating } from "$app/stores";
import { get } from "svelte/store";
import { goto } from "$app/navigation";

class SSRFilters {
  // dentro da store page tem a url
  // Toda vez que a page.url mudar o valor de Filters vai mudar
  Filters = $derived.by(() => get(page).url);

  get(name: string) {
    return this.Filters.searchParams.get(name);
  }

  // Record é parecido com map()
  // this.update({page: "2"})
  update(filters: Record<string, string>) {
    const url = new URL(this.Filters);
    Object.entries(filters).forEach(([name, value]) => {
      if (!value) {
        url.searchParams.delete(name);
      }
      if (value !== "") url.searchParams.set(name, value);
      else url.searchParams.delete(name);
    });

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }

  clear(...params: string[]) {
    const url = new URL(this.Filters);
    params.forEach((p) => url.searchParams.delete(p));

    if (typeof window !== "undefined") {
      goto(url, { keepFocus: true });
    }
  }

  isFiltered(...params: string[]) {
    return (
      params.length > 0 && params.some((p) => this.Filters.searchParams.has(p))
    );
  }
}

export const filters = new SSRFilters();