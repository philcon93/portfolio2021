import { useEffect } from 'react';

export default function Replace ({ url }) {
  useEffect(() => {
    location.replace(url);
  }, [])

  return null;
}