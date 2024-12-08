import Constants from "expo-constants";
import { useState, useEffect, useCallback } from "react";

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

console.log({ baseUrl });

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    // Ensure the URL does not double up on the base URL
    const finalUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(`${baseUrl}${url}`, options);
      setData(result.data);
    } catch (err: any) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
