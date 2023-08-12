// https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch

// https://docs.docker.com/compose/networking/
// NAME_ON_NETWORK is the container name, can be confirmed with :
// docker ps
// docker network ls
// docker network inspect NETWORK_NAME
// These docs are so frustrating. Connect within network using http://{NAME_ON_NETWORK}:{CONTAINER_PORT}

// https://stackoverflow.com/questions/37063822/econnrefused-nodejs-with-express-inside-docker-container
// https://github.com/sveltejs/kit/issues/1198

import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	if (request.url.startsWith('http://localhost:8000/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace(
				'http://localhost:8000/',
				'http://demo-manufacturing-kanban-web-backend-1:8000/'
			),
			request
		);

		// cookie forwarding
		// let cookie = event.request.headers.get('cookie');
		// if (cookie) {
		// 	request.headers.set('cookie', cookie);
		// }

		// console.log(request.headers);
	}

	return fetch(request);
};

// export async function handleFetch({ event, request, fetch }) {
// 	if (request.url.startsWith('http://localhost:8000/')) {
// 		// clone the original request, but change the URL
// 		request = new Request(
// 			request.url.replace(
// 				'http://localhost:8000/',
// 				'http://demo-manufacturing-kanban-web-backend-1:8000/'
// 			),
// 			request
// 		);

// 		// cookie forwarding
// 		// let cookie = event.request.headers.get('cookie');
// 		// if (cookie) {
// 		// 	request.headers.set('cookie', cookie);
// 		// }

// 		// console.log(request.headers);
// 	}

// 	return fetch(request);
// }
