import * as mongoose from 'mongoose';

export const CategoriaSchema = new mongoose.Schema({
  categoria: { type: String, unique: true },
  descriacao: String,
  eventos: [
    {
      nome: String,
      operacao: String,
      valor: Number,
    },
  ],
  jogadores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jogador',
    },
  ],
});
