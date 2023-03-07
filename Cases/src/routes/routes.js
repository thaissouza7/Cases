import {Router} from 'express';
import { createTable, insertPonto, updatePonto, selectAllPontos, selectPonto, deletePonto } from '../controller/controlePonto.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        statusCode:200,
        "msg": "Api rodando"
    })
})

router.get('/Pontos', selectAllPontos);
router.get('/Ponto/:id', selectPonto);
router.post('/Ponto', insertPonto);
router.put('/Ponto/:id', updatePonto);
router.delete('/Ponto', deletePonto);

export default router