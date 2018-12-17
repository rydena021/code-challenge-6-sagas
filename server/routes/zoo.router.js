const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET ANIMALS
router.get('/', (req, res) => {
  const queryText =   `SELECT "species".*, "class"."class_name"
                      FROM "species" LEFT OUTER JOIN "class" ON "class"."id" = "species"."class_id"
                      ORDER BY "species"."id" ASC;`
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT animals query', err);
      res.sendStatus(500);
    });
});

// POST animal
router.post('/', (req, res) => {
  let newAnimal = req.body;
  // if no class selected on form, set datatype to null for sql handling
  if (newAnimal.class_id === '') { newAnimal.class_id = null }
  const queryText = `INSERT INTO "species" ("species_name", "class_id") VALUES ($1, $2);`;
  pool.query(queryText, [newAnimal.species_name, newAnimal.class_id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing POST animal query', err);
      res.sendStatus(500);
    });
});

// DELETE ANIMAL
router.delete('/:id', (req, res) => {
  let sqlText = `DELETE FROM "species" WHERE "id"=$1;`;
  pool.query(sqlText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('ERROR deleting in DB:', err);
      res.sendStatus(500)
    })
});

// GET classes
router.get('/classes', (req, res) => {
  const queryText = `SELECT * FROM "class" ORDER BY "class_name" ASC;`
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT classes query', err);
      res.sendStatus(500);
    });
});

// POST class
router.post('/classes', (req, res) => {
  const queryText = `INSERT INTO "class" ("class_name") VALUES ($1);`;
  pool.query(queryText, [req.body.class_name])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing POST class query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
