export const fetcher = async <T,>(
  ...parameters: Parameters<typeof fetch>
): Promise<T> => {
  return fetch(...parameters).then(async (response) => {
    return response.json();
  });
};
