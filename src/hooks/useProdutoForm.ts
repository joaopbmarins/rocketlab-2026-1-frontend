import { useMemo, useState } from 'react'
import type { ProdutoCreate, ProdutoUpdate } from '../types/Produto'

export type ProdutoFormValues = {
  nome_produto: string
  categoria_produto: string
  peso_produto_gramas?: number | null
  comprimento_centimetros?: number | null
  altura_centimetros?: number | null
  largura_centimetros?: number | null
}

type ProdutoFormMode = 'create' | 'update'

type UseProdutoFormOptions = {
  mode?: ProdutoFormMode
  initialValues?: ProdutoUpdate
}

export function useProdutoForm({ mode = 'create', initialValues }: UseProdutoFormOptions = {}) {
  const [values, setValues] = useState<ProdutoFormValues>({
    nome_produto: initialValues?.nome_produto ?? '',
    categoria_produto: initialValues?.categoria_produto ?? '',
    peso_produto_gramas: initialValues?.peso_produto_gramas ?? null,
    comprimento_centimetros: initialValues?.comprimento_centimetros ?? null,
    altura_centimetros: initialValues?.altura_centimetros ?? null,
    largura_centimetros: initialValues?.largura_centimetros ?? null,
  })

  const setField = <K extends keyof ProdutoFormValues>(key: K, value: ProdutoFormValues[K]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }))
  }

  const createPayload = useMemo<ProdutoCreate>(() => ({
    nome_produto: values.nome_produto.trim(),
    categoria_produto: values.categoria_produto.trim(),
    peso_produto_gramas: values.peso_produto_gramas ?? undefined,
    comprimento_centimetros: values.comprimento_centimetros ?? undefined,
    altura_centimetros: values.altura_centimetros ?? undefined,
    largura_centimetros: values.largura_centimetros ?? undefined,
  }), [values])

  const updatePayload = useMemo<ProdutoUpdate>(() => {
    const payload: ProdutoUpdate = {}

    if (values.nome_produto.trim()) {
      payload.nome_produto = values.nome_produto.trim()
    }

    if (values.categoria_produto.trim()) {
      payload.categoria_produto = values.categoria_produto.trim()
    }

    if (values.peso_produto_gramas != null) {
      payload.peso_produto_gramas = values.peso_produto_gramas
    }

    if (values.comprimento_centimetros != null) {
      payload.comprimento_centimetros = values.comprimento_centimetros
    }

    if (values.altura_centimetros != null) {
      payload.altura_centimetros = values.altura_centimetros
    }

    if (values.largura_centimetros != null) {
      payload.largura_centimetros = values.largura_centimetros
    }

    return payload
  }, [values])

  const isCreateValid =
    mode === 'create' &&
    values.nome_produto.trim().length > 0 &&
    values.categoria_produto.trim().length > 0

  return {
    mode,
    values,
    setField,
    createPayload,
    updatePayload,
    payload: mode === 'create' ? createPayload : updatePayload,
    isCreateValid,
  }
}
