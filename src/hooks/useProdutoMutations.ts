import { useCallback, useState } from 'react'
import api from '../services/api'
import type { ProdutoCreate, ProdutoUpdate } from '../types/Produto'

const getErrorMessage = (error: unknown) => {
  const err = error as any
  return err?.response?.data?.message || err?.message || 'Erro na operação com produto'
}

export function useCreateProduto() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createProduto = useCallback(async (payload: ProdutoCreate) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/produtos', payload)
      return response.data
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, createProduto }
}

export function useUpdateProduto() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProduto = useCallback(async (id: string, payload: ProdutoUpdate) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.put(`/produtos/${id}`, payload)
      return response.data
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, updateProduto }
}

export function useDeleteProduto() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteProduto = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await api.delete(`/produtos/${id}`)
    } catch (error) {
      const message = getErrorMessage(error)
      setError(message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, deleteProduto }
}
