import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import type { ProdutoListResponse } from "../types/Produto";

type UseProdutosParams = {
  limit?: number;
  offset?: number;
  nome?: string;
};

export function useProdutos({ limit = 50, offset = 0, nome }: UseProdutosParams) {
  const [data, setData] = useState<ProdutoListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousOffsetRef = useRef(offset);
  const previousNomeRef = useRef(nome);

  useEffect(() => {
    setLoading(true);

    const isAppending =
      previousNomeRef.current === nome &&
      previousOffsetRef.current < offset &&
      (data?.data?.length ?? 0) > 0;
    previousOffsetRef.current = offset;
    previousNomeRef.current = nome;

    api
      .get<ProdutoListResponse>("/produtos/", {
        params: { limit, offset, nome },
      })
      .then((res) => {
        setData((prevData) => {
          if (isAppending && prevData) {
            return {
              ...res.data,
              data: [...prevData.data, ...res.data.data],
            };
          }

          return res.data;
        });
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar produtos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, offset, nome]);

  return { data, loading, error };
}