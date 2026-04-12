import { useEffect, useState } from 'react'
import api from '../services/api'
import type { ProdutoDetalheResponse } from '../types/Produto'

export function useProdutosDetails(id?: string | null) {
  const [data, setData] = useState<ProdutoDetalheResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setData(null)
      setError('ID do produto não informado')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    api
      .get<ProdutoDetalheResponse>(`/produtos/${id}`)
      .then((res) => {
        setData(res.data)
        setError(null)
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message || 'Erro ao buscar produto')
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  return { data, loading, error }
}
