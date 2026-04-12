import { useEffect, useState } from "react";
import api from "../services/api";
import type { ProdutoListResponse } from "../types/Produto";

type UseProdutosParams = {
  limit?: number;
  offset?: number;
};

export function useProdutos({ limit = 50, offset = 0 }: UseProdutosParams) {
  const [data, setData] = useState<ProdutoListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    api
      .get<ProdutoListResponse>("/produtos/", {
        params: { limit, offset },
      })
      .then((res) => {
        setData(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Erro ao buscar produtos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit, offset]);

  return { data, loading, error };
}