export const SSR_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    browser: false,
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  })
}

export const API_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache, proxy }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24,
    },
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365 * 10,
      staleWhileRevalidateSeconds: 60 * 60 * 24,
    },
  })
  proxy('api', { path: '/api/:path*' })
}

export const ASSET_CACHE_HANDLER = ({ removeUpstreamResponseHeader, cache }) => {
  removeUpstreamResponseHeader('cache-control')
  cache({
    browser: {
      maxAgeSeconds: 0,
      serviceWorkerSeconds: 60 * 60 * 24 * 365,
    },
    edge: {
      maxAgeSeconds: 60 * 60 * 24 * 365,
      forcePrivateCaching: true,
    },
  })
}
