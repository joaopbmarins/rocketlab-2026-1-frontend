export type AvaliacaoResponse = {
  id_avaliacao: string;
  id_pedido: string;
  avaliacao: number;
  titulo_comentario?: string | null;
  comentario?: string | null;
  data_comentario?: string | null; // datetime -> string (ISO)
  data_resposta?: string | null;   // datetime -> string (ISO)
};

export type AvaliacaoPedidoResponse = {
  produto_id: string;
  total_avaliacoes: number;
  limit: number;
  offset: number;
  avaliacoes: AvaliacaoResponse[];
};

export type AvaliacaoPedidoMedia = {
  produto_id: string;
  media: number;
  total_avaliacoes: number;
};