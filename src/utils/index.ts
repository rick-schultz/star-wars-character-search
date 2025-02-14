export const normalizeText = (text: string): string => {
  return text.toLowerCase().trim().replace(/-/g, '');
};

export const formatAttribute = (value: string): string => {
	return value === 'n/a' || value === 'none'
		? 'Unknown'
		: value.split('_').map(word =>
			word.charAt(0).toUpperCase() + word.slice(1)
		).join(' ');
};