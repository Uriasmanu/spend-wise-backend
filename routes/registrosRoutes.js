// routes/registrosRoutes.js
const express = require('express');
const Registro = require('../models/Registro');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Registros
 *   description: Operações relacionadas a registros
 */

/**
 * @swagger
 * /api/registros:
 *   post:
 *     tags: [Registros]
 *     summary: Adicionar um novo registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *                 example: null
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-19"
 *               descricao:
 *                 type: string

 *               identificador:
 *                 type: string
 *  
 *               valor:
 *                 type: number

 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/', async (req, res) => {
    try {
        const novoRegistro = new Registro(req.body);
        await novoRegistro.save();
        res.status(201).json(novoRegistro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/registros:
 *   get:
 *     tags: [Registros]
 *     summary: Listar todos os registros
 *     responses:
 *       200:
 *         description: Lista de registros
 */
router.get('/', async (req, res) => {
    try {
        const registros = await Registro.find();
        res.json(registros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/registros/{id}:
 *   get:
 *     tags: [Registros]
 *     summary: Buscar um registro pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do registro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: Registro não encontrado
 */
router.get('/:id', async (req, res) => {
    try {
        const registro = await Registro.findById(req.params.id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.json(registro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/registros/{id}:
 *   put:
 *     tags: [Registros]
 *     summary: Atualizar um registro
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do registro
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria:
 *                 type: string
 *                 example: null
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-19"
 *               descricao:
 *                 type: string
 *                 example: "Transferência atualizada"
 *               identificador:
 *                 type: string
 *                 example: "6713a2c2-cdaf-4ede-a406-b8ee7fad4daf"
 *               valor:
 *                 type: number
 *                 example: 450.00
 *     responses:
 *       200:
 *         description: Registro atualizado com sucesso
 *       404:
 *         description: Registro não encontrado
 *       400:
 *         description: Erro de validação
 */
router.put('/:id', async (req, res) => {
    try {
        const registro = await Registro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!registro) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.json(registro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/registros/{id}:
 *   delete:
 *     tags: [Registros]
 *     summary: Deletar um registro
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do registro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registro deletado com sucesso
 *       404:
 *         description: Registro não encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const registro = await Registro.findByIdAndDelete(req.params.id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.json({ message: 'Registro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
