import HomeComponent from "./components/HomeComponent";

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-center">CONTROL DE INGRESOS Y EGRESOS</h1>
      </div>
      <HomeComponent />
    </div>
  );
}
