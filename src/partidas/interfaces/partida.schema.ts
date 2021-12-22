import * as mongoose from 'mongoose';

export const PartidaSchema = new mongoose.Schema(
  {
    categoria: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }],
    jogadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' }],
    def: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    resultado: [{ set: { type: String } }],
  },
  { timestamps: true, collection: 'partidas' },
);
