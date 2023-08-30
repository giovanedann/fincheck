export function formatCurrency(value: number) {
  return Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
