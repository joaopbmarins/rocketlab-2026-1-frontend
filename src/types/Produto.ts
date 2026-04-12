export type ProdutoResponse = {
  id_produto: string;
  nome_produto: string;
  categoria_produto: string;
  link_categoria_imagem: string;
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

export type ProdutoDetalheResponse = {
  id: string;
  nome: string;
  categoria: string | null;
  link_categoria_imagem: string;

  peso_gramas?: number | null;
  comprimento_centimetros?: number | null;
  altura_centimetros?: number | null;
  largura_centimetros?: number | null;

  total_vendas: number;
  total_avaliacoes: number;
  media_avaliacoes: number;
};

export type ProdutoUpdate = {
  nome_produto?: string | null;
  categoria_produto?: string | null;
  peso_produto_gramas?: number | null;
  comprimento_centimetros?: number | null;
  altura_centimetros?: number | null;
  largura_centimetros?: number | null;
};

export type ProdutoCreate = {
  nome_produto: string;
  categoria_produto: string;
  peso_produto_gramas?: number | null;
  comprimento_centimetros?: number | null;
  altura_centimetros?: number | null;
  largura_centimetros?: number | null;
};