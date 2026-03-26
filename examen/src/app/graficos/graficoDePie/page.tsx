'use client';
import React from 'react';
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useData } from '@/app/Provider/DatoProvider'

ChartJS.register(ArcElement, Tooltip, Legend)

const GraficoPie = ()=>{
    const { conteoProductosData, loading, error } = useData()

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    if (!conteoProductosData || conteoProductosData.length === 0) return <p>No hay datos de productos para mostrar.</p>

    const data = {
        labels: conteoProductosData.map((item: { brandcode: any; })=> item.brandcode),
        datasets:[{
            label: 'Cantidad de Productos',
            data: conteoProductosData.map((item: { total_productos: string; })=> parseInt(item.total_productos)),
            backgroundColor:[
                'rgba(7, 1, 3, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
            borderColor:[
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }],
    }

    return (
        <div style={{ maxWidth:'600px', margin:'auto'}}>
            <h2>Cantidad de Productos por Marca</h2>
            <Pie data={data}/>
        </div>
    );
};

export default GraficoPie