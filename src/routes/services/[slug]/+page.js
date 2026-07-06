import { error } from '@sveltejs/kit';
import { getService, services } from '$lib/data/services.js';

export function load({ params }) {
  const service = getService(params.slug);
  if (!service) throw error(404, 'Service not found');

  const index = services.indexOf(service);
  const prev = services[(index - 1 + services.length) % services.length];
  const next = services[(index + 1) % services.length];
  return { service, prev, next };
}
