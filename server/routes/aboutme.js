const express = require('express');
const router = express.Router();
const pool = require('../db');
const { checkUser } = require('./userAuth');
const { checkAdmin } = require('./auth');

router.get('/', async(req, res) => {
  try {
    
    const result = await pool.query("SELECT * FROM about_me");
    console.log(result.rows);

    res.status(200).json(result.rows);
    

  } catch (error) {

    console.error("Error fetching About Me info:", error);
    res.status(500).json({ error: 'Error GETTING AboutMe info!' });
    
  }
});


router.post('/', checkAdmin ,async(req,res) => {
  try {

    const {name, bio, skills} = req.body;

    if(!name || !bio || !skills){
      res.status(400).json({
        error: "All Fields are required!"
      })
    }

    const result = await pool.query("INSERT INTO about_me (name, bio, skills) VALUES ($1, $2, $3) RETURNING *", [name, bio, skills]);

    res.status(201).json({
      message: "New About me info added!",
      addedAdmin: result.rows[0]
    })
    
  } catch (error) {

    console.error("Error POSTING About Me info!");
    res.status(500).json({ error: 'Error POSTING AboutMe info!' });
    
  }
})


router.put('/:id', checkAdmin, async(req,res) => {
  try {

    const {id} = req.params;
    const {name, bio, skills} = req.body;

    const result = await pool.query("UPDATE about_me SET name = $1, bio = $2, skills = $3 WHERE id = $4 RETURNING *", [name, bio, skills, id]);

    if(!name || !bio || !skills){
      return res.status(400).json({ error: 'All fields (name, bio, skills) are required!' });
    }

    if(result.rowCount === 0){
      return res.status(404).json({
        error: "About Me Info Not found! Update kya karu gawar?"
      })
    }

    res.status(200).json({
      message: 'Project updated successfully',
      updateAboutME: result.rows[0]
    })

    
  } catch (error) {

    console.error("Eror Updating Aboutme. Row Hai bhi ya nhi");
    res.status(500).json({ error: 'Error UPDATING AboutMe info!' });
    
  }
})


router.delete('/:id', checkAdmin, async(req,res) => {
  try {

    const {id} = req.params;
    
    const result = await pool.query("DELETE FROM about_me WHERE id = $1 RETURNING *", [id]);

    if(result.rowCount === 0){
      return res.status(404).json({
        error: "About Me Info Not found! DELETE kya karu gawar?"
      })
    }

    res.status(200).json({
      message: 'Project deleted successfully',
      deletedAboutME: result.rows[0]
    })

  } catch (error) {
    
    console.error("Eror DELETING Aboutme. Row Hai bhi ya nhi");
    res.status(500).json({ error: 'Error DELETING AboutMe info!' });

  }
})

module.exports = router;
