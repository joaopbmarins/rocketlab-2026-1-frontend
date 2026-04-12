import { useState } from 'react'
import api from '../services/api'
import type { AvaliacaoPedidoResponse, AvaliacaoResponse } from '../types/Avaliacao'

export function useProdutoAvaliacoes() {
  const [data, setData] = useState<AvaliacaoResponse[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadAvaliacoes = async (id?: string | null) => {
    if (!id) {
      setData(null)
      setError('ID do produto não informado')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await api.get<AvaliacaoPedidoResponse>(`/avaliacoes/produto/${id}`)
      setData(response.data.avaliacoes ?? [])
    } catch (err) {
      const errorMessage =
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        'Erro ao carregar avaliações'
      setError(errorMessage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, loadAvaliacoes }
}
