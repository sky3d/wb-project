export const addMinutes = (minutes: number, from?: Date) => {
  const ms = from ? from.getTime() : Date.now()
  return new Date(ms + minutes * 60e5)
}
