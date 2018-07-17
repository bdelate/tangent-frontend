export const toggleError = (error) => {
  return {
    type: 'TOGGLE_ERROR',
    error: error
  }
}