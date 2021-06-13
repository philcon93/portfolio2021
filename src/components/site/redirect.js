import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirect ({ url, as, options }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(url, as, options)
  }, [])

  return null;
}