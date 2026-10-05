export function formatDriverName(driver) {
  if (!driver) return ''
  return `${driver.firstName} ${driver.lastName.toUpperCase()}`
}
