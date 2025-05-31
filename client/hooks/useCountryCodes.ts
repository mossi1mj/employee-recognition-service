import { useEffect, useState } from "react";

export interface CountryCodeOption {
  name: string;
  code: string; // e.g., +1
  iso: string; // e.g., US
}

export function useCountryCodes() {
  const [countryCodes, setCountryCodes] = useState<CountryCodeOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,idd,cca2"
        );
        const data = await res.json();

        const formatted = data
          .filter((c: any) => c.idd?.root)
          .map((c: any) => ({
            name: c.name.common,
            code: c.idd.root,
            iso: c.cca2,
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));

        setCountryCodes(formatted);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryCodes();
  }, []);

  return { countryCodes, isLoading, error };
}
