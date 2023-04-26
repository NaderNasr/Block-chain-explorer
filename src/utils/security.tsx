
export const sanitizeInput = (input: string) => {
  return input.replace(/<script.*?<\/script>/gi, "");
}