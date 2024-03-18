import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { PUBLIC_API_URL } from '$env/static/public';

import type { AppRouter } from '@Demo-Manufacturing-Kanban/core/router';

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${PUBLIC_API_URL}`
		})
	]
});
