import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';

import pokemonsResultPage1 from './pokemon-result-limit-5-offset-0.json';
import pokemonsResultPage2 from './pokemon-result-limit-5-offset-5.json';
import pokemonsResultPage3 from './pokemon-result-limit-5-offset-10.json';

const getPokemonsMock = vi.fn();

const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', async ({ request }) => {
    const url = new URL(request.url);

    console.log(`Pokemons API was called with ${url.searchParams.toString()}`);

    const offset = parseInt(url.searchParams.get('offset'));
    const limit = parseInt(url.searchParams.get('limit'));
    getPokemonsMock({ offset, limit });

    if (offset === 0) {
      return HttpResponse.json(pokemonsResultPage1);
    } else if (offset === 5) {
      return HttpResponse.json(pokemonsResultPage2);
    } else if (offset === 10) {
      // Mocked data is different from real world:
      // total count was changed to 12, to pretend this is the last page
      return HttpResponse.json(pokemonsResultPage3);
    } else {
      return HttpResponse.json({ count: 0, results: [] });
    }
  }),
];

export { handlers, getPokemonsMock };
