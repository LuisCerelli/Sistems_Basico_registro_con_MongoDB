const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/escuela', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modelo de Persona
const Persona = mongoose.model('Persona', {
    nombre: String,
    apellido: String
});

// Ruta para guardar persona
app.post('/api/personas', async (req, res) => {
    try {
        const persona = new Persona(req.body);
        await persona.save();
        res.status(201).json({ mensaje: 'Persona guardada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la persona' });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});