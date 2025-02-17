import express from 'express';
import itemRoutes from './routes/itemRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota de health check
app.get('/health', (req, res) => {
  res.send('API está funcionando');
});

// Rotas para os itens de estoque
app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
