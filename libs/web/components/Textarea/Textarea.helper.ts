export const textareaHelper = (error: boolean): string => {
  return !error
    ? 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-700 focus:ring-indigo-700 sm:text-sm'
    : 'block w-full rounded-md border-red-300 shadow-sm focus:border-red-700 focus:ring-red-700 sm:text-sm';
};
