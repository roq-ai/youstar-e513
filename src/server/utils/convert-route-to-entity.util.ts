const mapping: Record<string, string> = {
  organizations: 'organization',
  purchases: 'purchase',
  stars: 'star',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
