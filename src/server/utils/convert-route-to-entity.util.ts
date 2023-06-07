const mapping: Record<string, string> = {
  companies: 'company',
  employees: 'employee',
  'mobility-providers': 'mobility_provider',
  transactions: 'transaction',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
