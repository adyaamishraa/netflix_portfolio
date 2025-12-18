const express = require('express');
const router = express.Router();
const pool = require('../db');
const { checkAdmin } = require('./auth');
const { checkUser } = require('./userAuth');

// Get all projects

router.get('/', checkUser, async (req, res) => {
    try {
        
        const result = await pool.query('SELECT * FROM projects');
        console.log(result.rows);
        
        res.status(200).json(result.rows);

    } catch (error) {
        
        console.error('❌ Error fetching projects:', error);
        res.status(500).json({ error: 'Error Getting Projects info!' });
        
    }
})


// Add a new project only by admin

router.post('/', checkAdmin ,async (req, res) => {
    try {

        const {title, description, tech_used, github_link} = req.body;

        if (!title || !description || !tech_used || !github_link) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        const result = await pool.query('INSERT INTO projects (title, description, tech_used, github_link) VALUES ($1, $2, $3, $4) RETURNING *', [title, description, tech_used, github_link]);

        res.status(201).json({
            message: 'Project added successfully',
            addedProj : result.rows[0],
        });
        
    } catch (error) {
        
        console.error('❌ Error fetching projects:', error);
        res.status(500).json({ error: 'Error Adding Project!' });


    }
})


// Delete a project by id only by admin

router.delete('/:id', checkAdmin ,async (req,res) => {
    try {

        const {id} = req.params;

        const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Project not found!' });
        }

        res.status(200).json({
          message: 'Project deleted successfully',
          deleted: result.rows[0],
        });
        
    } catch (error) {

        console.error('Error Deleting Project : ', error);
        res.status(500).json({ error: 'Error Deleting Project!' });
        
    }
})



// Update a project by id only by admin

router.put('/:id', checkAdmin,async (req,res) => {
    try {

        const {id} = req.params;

        const {title, description, tech_used, github_link} = req.body;

        const result = await pool.query('UPDATE projects SET title = $1, description = $2, tech_used = $3, github_link = $4 WHERE id = $5 RETURNING *', [title, description, tech_used, github_link, id]);

        if (!title || !description || !tech_used || !github_link) {
            return res.status(400).json({ error: 'All fields are required!' });
        }

        if(result.rowCount === 0){
            return res.status(404).json({ error: 'Project not found!' });
        }

        res.status(200).json({
            message: 'Project updated successfully',
            updatedProj: result.rows[0],
        })
        
    } catch (error) {

        console.error('Error Updating Project : ', error);
        res.status(500).json({ error: 'Error Updating Project!' });
        
    }
})

module.exports = router;