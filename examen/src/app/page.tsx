import GraficoLineal from "./graficos/graficoLineal/page";
import GraficoPie from "./graficos/graficoDePie/page";
import { DataProvider } from "./Provider/DatoProvider";

export default function Home() {
  return (
   <DataProvider>
      <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-12">
        <h1 className="text-2xl font-bold text-center">Productos</h1>
        <GraficoLineal/>
        <GraficoPie/>
      </div>
    </DataProvider>
  );
}