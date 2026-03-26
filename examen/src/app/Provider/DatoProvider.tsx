'use client';
import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const DataContext = createContext<any>(null)
const API_URL = "http://localhost:5000"

const fetchPromedioValor=async () => {
    const response =await axios.get(`${API_URL}/valor-promedio-por-categoria`)
    return response.data.data;
}

const fetchConteoProductos= async () =>{
    const response=await axios.get(`${API_URL}/cantidad-productos-por-marca`);
    return response.data.data
};

export const DataProvider =({ children }: { children: React.ReactNode }) =>{
    const [promedioValorData, setPromedioValorData] = useState<any[] |null>(null)
    const [conteoProductosData, setConteoProductosData] = useState<any[] |null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const [promedioData, conteoData] =await Promise.all([
                    fetchPromedioValor(),
                    fetchConteoProductos()
                ])
                setPromedioValorData(promedioData);
                setConteoProductosData(conteoData);
            } catch (err) {
                setError('Error al cargar datos')
            } finally {
                setLoading(false)
            }
        };
        fetchData()
    },[])

    return (
        <DataContext.Provider value={{ promedioValorData, conteoProductosData, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () =>useContext(DataContext);