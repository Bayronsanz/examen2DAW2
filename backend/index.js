const express = require('express')
const sequelize = require('./Conexion/database')
const Product = require('./Models/productos')
var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json())


app.get('/valor-promedio-por-categoria', async (req, resp) => {
    try {
        const resultado = await Product.findAll({
            attributes: [
                'categorycode',
                [sequelize.fn('AVG', sequelize.col('value')), 'promedio_valor']
            ],
            group: ['categorycode']
        });

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontrados', data: resultado });
        } else {
            resp.status(404).json({ 'Mensaje': 'Datos No Encontrados', data: [] });
        }
    } catch (error) {
        resp.status(500).json({ 'Mensaje': 'Ocurrió un error', data: error });
    }
});

app.get('/cantidad-productos-por-marca', async (req, resp) => {
    try {
        const resultado = await Product.findAll({
            attributes: [
                'brandcode',
                [sequelize.fn('COUNT', sequelize.col('*')), 'total_productos']
            ],
            group: ['brandcode']
        });

        if (resultado.length > 0) {
            resp.json({ 'Mensaje': 'Datos Encontrados', data: resultado });
        } else {
            resp.status(404).json({ 'Mensaje': 'Datos No Encontrados', data: [] });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({ 'Mensaje': 'Ocurrió un error', data: error });
    }
});
app.listen(5000, () => {
    console.log('Aplicación corriendo en puerto 5000');
});