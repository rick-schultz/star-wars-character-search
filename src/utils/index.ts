export const normalizeText = (text: string): string => {
  return text.toLowerCase().trim().replace(/-/g, '');
};