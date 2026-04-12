export type ProdutoResponse = {
  id_produto: string;
  nome_produto: string;
  categoria_produto: string;
  peso_produto_gramas?: number | null;
  comprimento_centimetros?: number | null;
  altura_centimetros?: number | null;
  largura_centimetros?: number | null;
};

export type ProdutoListResponse = {
  total: number;
  limit: number;
  offset: number;
  data: ProdutoResponse[];
};