import { useEffect, useState } from "react";
import { publicService } from "../services/publicService";

export function usePublicData(method, argument) {
  const [result, setResult] = useState({
    data: null,
    error: false,
    loading: true,
  });
  const [attempt, setAttempt] = useState(0);
  const serialized = JSON.stringify(argument);
  useEffect(() => {
    let active = true;
    // Loading is tied to this request key, so old responses never flash after filtering.
    publicService[method](
      serialized === undefined ? undefined : JSON.parse(serialized),
    )
      .then((data) => {
        if (active)
          setResult({
            data,
            error: false,
            loading: false,
            requestKey: `${method}:${serialized}:${attempt}`,
          });
      })
      .catch(() => {
        if (active)
          setResult({
            data: null,
            error: true,
            loading: false,
            requestKey: `${method}:${serialized}:${attempt}`,
          });
      });
    return () => {
      active = false;
    };
  }, [method, serialized, attempt]);
  return {
    ...result,
    loading: result.requestKey !== `${method}:${serialized}:${attempt}`,
    retry: () => setAttempt((value) => value + 1),
  };
}
