import { createTRPCProxyClient, TRPCClientError, httpBatchLink } from '@trpc/client';
import { PUBLIC_API_URL } from '$env/static/public';

import type { AppRouter } from '@Demo-Manufacturing-Kanban/core/router';

export function isTRPCClientError(cause: unknown): cause is TRPCClientError<AppRouter> {
	return cause instanceof TRPCClientError;
}

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${PUBLIC_API_URL}`
		})
	]
});
