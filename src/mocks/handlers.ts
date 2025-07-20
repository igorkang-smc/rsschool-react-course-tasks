import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'error') {
      return HttpResponse.text('Internal Server Error', { status: 500 });
    }

    return HttpResponse.json({
      results: [
        {
          id: 1,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          image: 'morty.png',
        },
      ],
    });
  }),
];
