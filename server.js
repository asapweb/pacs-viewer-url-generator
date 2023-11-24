const express = require('express');
const { Pool } = require("pg");
require('dotenv').config();

const app = express();

const pool = new Pool({
    host: process.env.POSTGRES_HOST || '',
    database: process.env.POSTGRES_DB || '',
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_USER || '',
    port: 5432
});

function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
  }

async function getStudyUID(an = null) {
    const rows = await pool.query(
      'SELECT patient.pk as patientID, study.study_iuid as studyUID FROM study inner join patient on patient.pk = study.patient_fk where study.accession_no = $1', 
      [an]
    );
    const data = emptyOrRows(rows);
  
    return {
      data
    }
  }
  
app.get('/api/study/urlByAccessionNumber', async function(req, res, next) {
    // El parametro an (accession number) es requerido
    if (!req.query.an) {
        return res.status(422).json({ error: 'Param an (Accession Number) is required' });
    }
    try {
        const r = (await getStudyUID(req.query.an));
        if (r.data.rowCount) {
            data = {
                success: true,
                url: process.env.VIEWER_URL + r.data.rows[0].studyuid,
                message: ''
            }
        } else {
            data = {
                success: false,
                url: '',
                message: 'Imágenes no encontradas'
            }
        }
        res.json(data);
    } catch (err) {
        console.error(`Error while getting quotes `, err.message);
      next(err);
    }
  });

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
    console.log(process.env.POSTGRES_HOST);
});

