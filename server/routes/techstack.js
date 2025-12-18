const express = require('express');
const router = express.Router();
const pool = require('../db');
const { checkAdmin } = require('./auth'); 
const { checkUser } = require('./userAuth');

// Getting technologies used in tech stack

router.get('/', checkUser, async (req, res) => {
    try {

        const result = await pool.query('SELECT * FROM tech_stack');

        console.log(result.rows);

        res.status(200).json(result.rows);
        
    } catch (error) {
        
        console.error('❌ Error fetching technologies used:', error);
        res.status(500).json({ error: 'Error Fetching Technologies used!' });

    }
})


// Adding technologies used in tech stack only by admin

router.post('/', checkAdmin ,async (req, res) => {
    try {

        const {name, category, description} = req.body;

        if (!name || !category || !description) {
            return res.status(400).json({ error: 'All fields (name, category, description) are required!' });
        }

        const result = await pool.query('INSERT INTO tech_stack (name, category, description) VALUES ($1, $2, $3) RETURNING *', [name, category, description]);

        res.status(201).json({
            message: 'Technology added successfully',
            addedTechStack: result.rows[0]
        });

    } catch (error) {

        console.error('❌ Error Updating technologies used:', error);
        res.status(500).json({ error: 'Error Updating Technologies used!' });
        
    }
})


// Deleting a technology from tech stack only by admin

router.delete('/:id', checkAdmin , async (req, res) => {
    try {

        const {id} = req.params;

        const result = await pool.query('DELETE FROM tech_stack WHERE id = $1 RETURNING *', [id]);

        res.status(200).json({
            message: 'Technology deleted successfully',
            
        })
        
    } catch (error) {

        console.error('❌ Error Deleting technologies used:', error);
        res.status(500).json({ error: 'Error Deleting Technologies used!' });
        
    }
})


// edit a technology in tech stack only by admin

router.put('/:id', checkAdmin,  async(req,res) => {
    try {

        const {id} = req.params;

        const {name, category, description} = req.body;

        if(!name || !category || !description){
            return res.status(400).json({ error: 'All fields (name, category, description) are required!' });
        }
        
        const result = await pool.query('UPDATE tech_stack SET name = $1, category = $2, description = $3 WHERE id = $4 RETURNING *', [name, category, description, id]);

        if(result.rowCount === 0){
            return res.status(404).json({ error: 'Technology not found! Update kya karu gawar?' });
        }

        res.status(200).json({
            message: 'Technology updated successfully',
            updatedTech: result.rows[0]
        })

    } catch (error) {
        
        console.error('Error Updating Technology : ', error);
        res.status(500).json({ error: 'Error Updating Technology!' });
        
    }
})

module.exports = router;