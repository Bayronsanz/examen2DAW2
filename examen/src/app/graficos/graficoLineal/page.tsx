'use client';
import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { useData } from '@/app/Provider/DatoProvider'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const GraficoLineal = () => {
    const { promedioValorData, loading, error} = useData()

    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    if (!promedioValorData || promedioValorData.length=== 0) return <p>No hay datos de productos para mostrar</p>

    const data = {
        labels: promedioValorData.map((item: { categorycode: any; }) =>item.categorycode),
        datasets: [{
            label: 'Valor Promedio',
            data: promedioValorData.map((item: { promedio_valor: string; })=> parseFloat(item.promedio_valor)),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
        }]
    };

    return(
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
            <h2>Valor Promedio de Productos por Categoriua</h2>
            <Line data={data}/>
        </div>
    );
};

export default GraficoLineal