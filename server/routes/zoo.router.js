const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
  const queryText =   `SELECT "species".*, "class"."class_name"
                      FROM "species" LEFT OUTER JOIN "class" ON "class"."id" = "species"."class_id"
                      ORDER BY "species"."id" ASC;`
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT project query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
