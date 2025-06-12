import { useState } from "react";
import { motion } from "framer-motion";
import 'react-calendar/dist/Calendar.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, Legend, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import Chatbot from './components/Chatbot';

// --- DATI DI ESEMPIO PER I CLIENTI ---
const clients = [
  {
    id: 1,
    name: "Mario Rossi",
    age: 30,
    location: "Milano",
    avatar: "https://i.pravatar.cc/150?u=mario.rossi",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 80,
        wellness: 50,
        fatMass: "40%",
        height: "1,79",
        adherence: { colazione: 80, pranzo: 95, cena: 87, spuntini: 25 },
        biologicalAge: 27,
    }
  },
  {
    id: 2,
    name: "Laura Bianchi",
    age: 25,
    location: "Palermo",
    avatar: "https://i.pravatar.cc/150?u=laura.bianchi",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 70,
        wellness: 80,
        fatMass: "35%",
        height: "1,65",
        adherence: { colazione: 90, pranzo: 90, cena: 80, spuntini: 60 },
        biologicalAge: 24
    }
  },
   {
    id: 3,
    name: "Laura Bianchi",
    age: 35,
    location: "Roma",
    avatar: "https://i.pravatar.cc/150?u=laura.bianchi.2",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
     details: {
        satisfaction: 90,
        wellness: 85,
        fatMass: "33%",
        height: "1,70",
        adherence: { colazione: 95, pranzo: 95, cena: 90, spuntini: 70 },
        biologicalAge: 32
    }
  },
    {
    id: 4,
    name: "Mario Rossi",
    age: 29,
    location: "Roma",
    avatar: "https://i.pravatar.cc/150?u=mario.rossi.2",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 60,
        wellness: 65,
        fatMass: "42%",
        height: "1,82",
        adherence: { colazione: 70, pranzo: 80, cena: 75, spuntini: 40 },
        biologicalAge: 28
    }
  },
   {
    id: 5,
    name: "Laura Bianchi",
    age: 70,
    location: "Milano",
    avatar: "https://i.pravatar.cc/150?u=laura.bianchi.3",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 75,
        wellness: 70,
        fatMass: "45%",
        height: "1,60",
        adherence: { colazione: 80, pranzo: 85, cena: 80, spuntini: 70 },
        biologicalAge: 68
    }
  },
  {
    id: 6,
    name: "Laura Bianchi",
    age: 25,
    location: "Milano",
    avatar: "https://i.pravatar.cc/150?u=laura.bianchi.4",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 88,
        wellness: 90,
        fatMass: "30%",
        height: "1,68",
        adherence: { colazione: 95, pranzo: 95, cena: 95, spuntini: 80 },
        biologicalAge: 23
    }
  },
  {
    id: 7,
    name: "Laura Bianchi",
    age: 23,
    location: "Catania",
    avatar: "https://i.pravatar.cc/150?u=laura.bianchi.5",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 82,
        wellness: 85,
        fatMass: "31%",
        height: "1,72",
        adherence: { colazione: 90, pranzo: 90, cena: 85, spuntini: 75 },
        biologicalAge: 22
    }
  },
  {
    id: 8,
    name: "Mario Rossi",
    age: 29,
    location: "Roma",
    avatar: "https://i.pravatar.cc/150?u=mario.rossi.3",
    weightChange: "-3.2 kg",
    dietType: "Dieta mediterranea",
    nextVisit: "14 Luglio 2025",
    details: {
        satisfaction: 78,
        wellness: 75,
        fatMass: "38%",
        height: "1,80",
        adherence: { colazione: 85, pranzo: 80, cena: 80, spuntini: 65 },
        biologicalAge: 28
    }
  }
];


// --- COMPONENTI ICONA ---
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const BackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const BackIconSimple = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const ChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>);
const ChevronDownIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path></svg>);
const FilterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>);
const UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>);


// --- COMPONENTE PRINCIPALE APP ---
export default function App() {
  const [activeSection, setActiveSection] = useState("dieta"); // Impostato su 'dieta' per vederlo subito
  const user = { name: "Anna", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" };

  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "dieta", label: "Diete" },
    { key: "consigli", label: "Consigli" },
    { key: "client", label: "Client management" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans text-[#333] p-6">
      <header className="flex justify-between items-center mb-8">
        {/* --- Sezione Sinistra della Navigazione --- */}
        <div className="flex items-center gap-10">
          <img src="/logo.png" alt="Ainana logo" className="h-8 w-auto" />
          <nav className="relative bg-[#fff4cc] rounded-full px-2 py-1 flex gap-2 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`relative z-10 px-4 py-2 font-medium rounded-full transition-colors ${
                  activeSection === tab.key ? "text-black" : "text-gray-600 hover:text-black"
                }`}
              >
                {tab.label}
                {activeSection === tab.key && (
                  <motion.div layoutId="underline" className="absolute inset-0 bg-yellow-400 rounded-full z-[-1]" transition={{ type: "spring", stiffness: 500, damping: 30 }}/>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* --- Sezione Destra della Navigazione --- */}
        <div className="flex items-center gap-4">
            {/* --- PULSANTE CHATBOT (AGGIORNATO CON IMMAGINE E LINK) --- */}
            <button
              onClick={() => window.open('https://nanabot3.vercel.app/', '_blank')}
              className="font-semibold text-black px-4 py-2 rounded-full shadow-sm flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 transition-colors"
            >
                Chatbot 
                {/* NOTA: Sostituisci "/robot-icon.png" con il percorso corretto della tua immagine */}
                <img src="/robot-icon.png" alt="Chatbot icon" className="w-5 h-5" />
            </button>

            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-yellow-500 transition flex items-center gap-2">
                Vai alle diete
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
      </header>

      <main>
        {activeSection === 'dashboard' && <DashboardView user={user} />}
        {activeSection === 'dieta' && <DieteView />}
        {activeSection === 'client' && <ClientManagementView />}
      </main>

      <div className="fixed bottom-6 right-6 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-full shadow-lg flex items-center gap-3">
        <span>💬</span>
        <span>Hai 3 nuovi messaggi</span>
        <span className="font-extrabold">...</span>
      </div>
      <Chatbot />
    </div>
  );
}


// =================================================================
// --- VISTA PER LA SEZIONE DIETE ---
// =================================================================
function DieteView() {
    return (
        <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Colonna Sinistra */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    <p className="font-semibold text-gray-700">Step 1: aggiungi un nuovo profilo paziente</p>
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-6">
                        <div className="flex flex-col items-center justify-center bg-[#FFFBF0] rounded-xl p-6">
                            <UploadIcon />
                        </div>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nome e cognome"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <div>
                               <input
                                    type="text"
                                    placeholder="Altro..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>
                            <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors shadow-md">
                                Aggiungi
                            </button>
                        </form>
                    </div>
                </div>

                {/* Colonna Destra */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <p className="font-semibold text-gray-700">Step 2: carica una nuova dieta</p>
                    <div className="relative border-2 border-dashed border-gray-300 bg-white rounded-2xl h-[500px] flex flex-col items-center justify-center gap-4 p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                             <UploadIcon />
                             <p className="mt-4 font-semibold text-gray-600">Trascina qui</p>
                             <p className="text-sm text-gray-400 my-2">o</p>
                        </div>
                         <button className="w-2/3 max-w-xs bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors shadow-md">
                            Carica dieta (pdf)
                        </button>
                        <div className="absolute bottom-6 right-6 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-orange-500">
                           <ChatIcon />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer con pulsante Indietro */}
             <div className="mt-8 flex justify-between items-center">
                <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-yellow-200 px-4 py-2 rounded-lg shadow-sm border border-yellow-300 hover:bg-yellow-300">
                    <BackIconSimple />
                    Indietro
                </button>
            </div>
        </div>
    );
}

// =================================================================
// --- VISTA GESTIONE CLIENTI ---
// =================================================================
function ClientManagementView() {
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    if (selectedClient) {
        return <ClientDetailView client={selectedClient} onBack={() => setSelectedClient(null)} />
    }

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-end mb-6">
                <div className="relative w-full max-w-xs">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cerca per nome o località..."
                        className="w-full pl-10 pr-4 py-2 text-sm font-semibold text-gray-700 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredClients.map(client => (
                    <ClientCard key={client.id} client={client} onClick={() => setSelectedClient(client)} />
                ))}
            </div>
        </div>
    )
}

function ClientCard({ client, onClick }) {
    return(
        <div onClick={onClick} className="bg-white rounded-2xl p-4 shadow-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <img src={client.avatar} alt={client.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3" />
            <h3 className="font-bold text-lg">{client.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{client.age} anni - {client.location}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">{client.weightChange}</span>
                <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{client.dietType}</span>
            </div>
            <div className="mt-auto pt-3 border-t border-gray-100 w-full">
                <p className="text-xs text-gray-400">Prossima visita</p>
                <p className="text-sm font-semibold text-gray-600">{client.nextVisit}</p>
            </div>
        </div>
    )
}

// =================================================================
// --- COMPONENTI RESTANTI (INVARIATI) ---
// =================================================================
function AdherenceItem({ meal, value, isOpen, onClick }) {
    return (
        <div>
            <div onClick={onClick} className="flex justify-between items-center text-sm mb-1 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                <span className="font-semibold capitalize">{meal}</span>
                <span className="text-gray-500 flex items-center gap-2">
                    {value}%
                    <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        <ChevronDownIcon />
                    </span>
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
            </div>
            {isOpen && (
                <div className="mt-2 text-xs p-3 rounded-lg bg-gray-50 text-gray-600">
                    {meal === 'spuntini' ? (
                         <div className="text-red-600 bg-red-50 flex items-center gap-2">
                           <span>⚠️</span>
                           Nell'ultimo mese il paziente ha registrato problemi di digestione dopo lo spuntino della mattina.
                        </div>
                    ) : (
                        `Dettagli per ${meal}...`
                    )}
                </div>
            )}
        </div>
    );
}

function GaugeChart({ value, color, label }) {
  const data = [{ name: 'value', value: value }, { name: 'remaining', value: 100 - value }];
  return (
      <div className="relative w-36 h-36 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                  <Pie data={data} dataKey="value" innerRadius={45} outerRadius={60} startAngle={90} endAngle={-270} cornerRadius={50}>
                      <Cell fill={color} />
                      <Cell fill="#f0f0f0" />
                  </Pie>
              </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center -mt-2">
              <span className="text-3xl font-bold" style={{ color: color }}>{value}%</span>
              <span className="text-xs text-gray-500 max-w-[80px] leading-tight">{label}</span>
          </div>
      </div>
  );
}

function ClientDetailView({ client, onBack }) {
  const weightData = [
      { name: 'Gen', kg: 0 }, { name: 'Feb', kg: -1.5 }, { name: 'Mar', kg: -2.2 },
      { name: 'Apr', kg: -3 }, { name: 'Mag', kg: -4 }, { name: 'Giu', kg: -3.8 },
      { name: 'Lug', kg: -3.2 }, { name: 'Ago', kg: -2.5 },
  ];

  const [openMeal, setOpenMeal] = useState('spuntini');

  const handleMealClick = (meal) => {
      setOpenMeal(openMeal === meal ? null : meal);
  };

  return(
      <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
               <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
                  <BackIcon />
                  Tutti i clienti
              </button>
              <button className="text-sm font-semibold text-black bg-yellow-300 px-4 py-2 rounded-lg shadow-sm hover:bg-yellow-400">
                  Modifica widget
              </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

              {/* --- COLONNA SINISTRA --- */}
              <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start gap-5">
                          <img src={client.avatar} alt={client.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-grow">
                              <h2 className="text-2xl font-bold text-left">{client.name}</h2>
                              <p className="text-gray-500 text-left mb-4">{client.age} anni - {client.location}</p>
                              <div className="flex flex-wrap justify-start gap-2">
                                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1.5 rounded-full">{client.weightChange}</span>
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1.5 rounded-full">Prossima visita: {client.nextVisit}</span>
                                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">{client.dietType}</span>
                                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">Massa grassa: {client.details.fatMass}</span>
                                  <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">Altezza: {client.details.height}</span>
                              </div>
                          </div>
                      </div>
                      <div className="flex justify-end mt-4">
                          <button className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 shadow-md">
                             <ChatIcon />
                          </button>
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                          <h3 className="font-bold mb-2 text-sm">Soddisfazione</h3>
                          <GaugeChart value={client.details.satisfaction} color="#FF7300" label="Del suo percorso" />
                          <div className="text-center mt-2">
                              <button className="text-xs text-gray-500 font-semibold hover:underline">Dettagli</button>
                          </div>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
                          <h3 className="font-bold mb-2 text-sm">Benessere</h3>
                          <GaugeChart value={client.details.wellness} color="#FFC107" label="Buono" />
                          <div className="text-center mt-2">
                              <button className="text-xs text-gray-500 font-semibold hover:underline">Dettagli</button>
                          </div>
                      </div>
                  </div>

                   <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold mb-4">Biomarcatori</h3>
                       <div className="space-y-4">
                          <div>
                              <div className="flex justify-between text-sm mb-1 font-semibold"><span>Microbioma</span><span>Buono</span></div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-green-500 h-2.5 rounded-full" style={{ width: `85%` }}></div></div>
                          </div>
                           <div>
                              <div className="flex justify-between text-sm mb-1 font-semibold"><span>Indice-glicemico</span><span>Media</span></div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `55%` }}></div></div>
                          </div>
                       </div>
                  </div>
              </div>

              {/* --- COLONNA DESTRA --- */}
              <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold mb-2">Andamento peso corporeo</h3>
                      <ResponsiveContainer width="100%" height={250}>
                           <AreaChart data={weightData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#FF7300" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#FF7300" stopOpacity={0}/>
                                  </linearGradient>
                              </defs>
                              <XAxis dataKey="name" stroke="#b0b0b0" fontSize={12} />
                              <YAxis stroke="#b0b0b0" fontSize={12} />
                              <Tooltip />
                              <Area type="monotone" dataKey="kg" stroke="#FF7300" strokeWidth={3} fill="url(#colorWeight)" />
                           </AreaChart>
                      </ResponsiveContainer>
                  </div>
                   <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold mb-4">Aderenza ai pasti</h3>
                      <div className="space-y-2">
                          {Object.entries(client.details.adherence).map(([meal, value]) => (
                              <AdherenceItem
                                  key={meal}
                                  meal={meal}
                                  value={value}
                                  isOpen={openMeal === meal}
                                  onClick={() => handleMealClick(meal)}
                              />
                          ))}
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="font-bold mb-4">Età biologica</h3>
                      <div className="space-y-3">
                         <div>
                              <p className="text-sm font-semibold">Età anagrafica</p>
                              <div className="w-full bg-gray-200 rounded-lg h-6 flex items-center px-2 text-sm">{client.age} anni</div>
                         </div>
                          <div>
                              <p className="text-sm font-semibold">Età biologica</p>
                              <div className="bg-green-200 rounded-lg h-6 flex items-center px-2 text-sm text-green-800 font-semibold" style={{width: `${(client.details.biologicalAge / client.age) * 100}%`}}>{client.details.biologicalAge} anni</div>
                         </div>
                      </div>
                       <p className="text-xs text-gray-500 mt-4">In base allo stile attuale, l'età biologica del paziente è di {client.details.biologicalAge} anni &gt;</p>
                   </div>
              </div>
          </div>
      </div>
  )
}

function DashboardView({ user }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState({[new Date().toDateString()]: ["10:00: prima visita Mario Rossi"]});
  const [newAppt, setNewAppt] = useState("");
  const [weekOffset, setWeekOffset] = useState(0);

  function getWeekDays(baseDate = new Date(), offset = 0) {
    const start = new Date(baseDate);
    start.setDate(start.getDate() + offset * 7);
    const dayOfWeek = start.getDay();
    const diff = start.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(start.setDate(diff));
    const days = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        days.push({
            label: d.toLocaleDateString("it-IT", { weekday: "short" }),
            fullDate: d,
        });
    }
    return days;
  }

  const weekDays = getWeekDays(new Date(), weekOffset);
  const currentMonthYear = weekDays[0].fullDate.toLocaleDateString("it-IT", { month: "long", year: "numeric" });

  const ageData = [{ group: '13-18', value: 30 }, { group: '19-25', value: 80 }, { group: '26-30', value: 50 }, { group: '31-40', value: 70 }, { group: '<40', value: 40 }];
  const visitsData = Array.from({ length: 14 }, (_, i) => ({ day: `G${i + 1}`, prime: Math.floor(Math.random() * 50 + 50), check: Math.floor(Math.random() * 50) }));
  const pieData = [{ name: 'Empatico', value: 400 }, { name: 'Altri', value: 400 }];
  const adherenceData = [{ day: 'L', value: 60 }, { day: 'M', value: 80 }, { day: 'M', value: 40 }, { day: 'G', value: 90 }, { day: 'V', value: 75 }, { day: 'S', value: 90 }, { day: 'D', value: 60 }];
  const COLORS = ['#FFCE00', '#F1F1F1'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-200 overflow-hidden shadow-inner">
            <img src={user.avatar} alt="Profilo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-xl font-semibold text-[#333] leading-tight">
            <span>Ciao {user?.name},</span>
            <span>bentornata!</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold capitalize">{currentMonthYear}</h3>
                <div className="flex gap-2 text-gray-400">
                    <button onClick={() => setWeekOffset(prev => prev - 1)} className="hover:text-black">{'<'}</button>
                    <button onClick={() => setWeekOffset(prev => prev + 1)} className="hover:text-black">{'>'}</button>
                </div>
            </div>
            <div className="flex justify-between gap-1">
                {weekDays.map(({ label, fullDate }) => {
                    const isActive = selectedDate.toDateString() === fullDate.toDateString();
                    return (
                        <button
                            key={fullDate.toISOString()}
                            onClick={() => setSelectedDate(fullDate)}
                            className={`text-center p-1 rounded-lg w-full transition-colors ${
                                isActive ? 'bg-yellow-400 text-white shadow-md' : 'hover:bg-yellow-50'
                            }`}
                        >
                            <div className={`text-xs capitalize ${isActive ? 'text-white' : 'text-gray-500'}`}>{label}</div>
                            <div className="font-bold text-base">{fullDate.getDate()}</div>
                        </button>
                    )
                })}
            </div>
          </div>
          <div>
              {(appointments[selectedDate.toDateString()] || []).map((appt, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 text-sm mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-800 flex-grow">{appt}</span>
                      <button onClick={() => {/* Logica di cancellazione */}} className="text-gray-400 hover:text-red-500 font-bold">{'>'}</button>
                  </div>
              ))}
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 mt-4">
                  <input type="text" value={newAppt} onChange={(e) => setNewAppt(e.target.value)} placeholder="Nuovo appuntamento..." className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"/>
              </form>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold px-2">Ultime ricette caricate</h3>
          <div className="bg-white p-2 rounded-lg flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1540420773420-2366e2c88c24?q=80&w=400&auto=format&fit=crop" alt="Pokè" className="w-16 h-16 rounded-md object-cover" />
              <div>
                  <p className="font-semibold text-sm">Pokè di quinoa, ceci e verdure</p>
                  <a href="#" className="text-xs text-yellow-600 font-semibold">Modifica ricetta</a>
              </div>
          </div>
           <div className="bg-white p-2 rounded-lg flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&auto=format&fit=crop" alt="Salmone" className="w-16 h-16 rounded-md object-cover" />
              <div>
                  <p className="font-semibold text-sm">Salmone scottato con limone</p>
                  <a href="#" className="text-xs text-yellow-600 font-semibold">Modifica ricetta</a>
              </div>
          </div>
          <button className="bg-yellow-400 text-black font-semibold px-4 py-3 rounded-lg mt-2 w-full shadow-md hover:bg-yellow-500 transition-all">Vai alle ricette</button>
        </div>
      </div>
      <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFF9E6] rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-yellow-400/50 p-3 rounded-full">
                  <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">800</h3>
                <p className="text-sm text-gray-500">Contatti</p>
              </div>
          </div>
           <div className="bg-[#FFF5F5] rounded-2xl p-4 flex items-center gap-4">
               <div className="bg-red-400/50 p-3 rounded-full">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
               </div>
              <div>
                <h3 className="font-bold text-xl">10 mila</h3>
                <p className="text-sm text-gray-500">Visualizzazioni</p>
              </div>
          </div>
           <div className="bg-[#EBF8FF] rounded-2xl p-4 flex items-center gap-4">
              <div className="bg-blue-400/50 p-3 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-xl">200</h3>
                <p className="text-sm text-gray-500">Apprezzamenti</p>
              </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-4 border border-gray-100">
            <h3 className="font-bold mb-2">Media età</h3>
            <ResponsiveContainer width="100%" height={200}><BarChart data={ageData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}><XAxis dataKey="group" axisLine={false} tickLine={false} /><Tooltip cursor={{fill: 'rgba(255, 206, 0, 0.1)'}} /><Bar dataKey="value" fill="#FFB400" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer>
          </div>
          <div className="rounded-2xl p-4 border border-gray-100">
            <h3 className="font-bold mb-2">Prime visita VS check</h3>
            <ResponsiveContainer width="100%" height={200}><AreaChart data={visitsData}><defs><linearGradient id="colorPrime" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#d61414" stopOpacity={0.4} /><stop offset="95%" stopColor="#d61414" stopOpacity={0} /></linearGradient><linearGradient id="colorCheck" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3FA9F5" stopOpacity={0.4} /><stop offset="95%" stopColor="#3FA9F5" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false}/><Tooltip /><Legend /><Area type="monotone" dataKey="prime" name="Media prima visita" stroke="#d61414" fill="url(#colorPrime)" /><Area type="monotone" dataKey="check" name="Media check" stroke="#3FA9F5" fill="url(#colorCheck)" /></AreaChart></ResponsiveContainer>
          </div>
          <div className="rounded-2xl p-4 border border-gray-100 relative">
            <h3 className="font-bold mb-2">Giugno 2025</h3>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><p className="font-bold text-2xl">800</p><p className="text-sm text-gray-500">Contatti</p></div>
            <ResponsiveContainer width="100%" height={200}><PieChart><Tooltip /><Pie data={pieData} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">{pieData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}</Pie></PieChart></ResponsiveContainer>
            <p className="text-sm mt-2 text-center text-gray-600">400 contatti hanno scelto un approccio empatico</p>
          </div>
          <div className="rounded-2xl p-4 border border-gray-100">
            <h3 className="font-bold mb-2">Adesione piani alimentari</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><span className="w-2 h-2 bg-red-500 rounded-full"></span><p>Molti utenti preferiscono concedersi lo sgarro il sabato</p></div>
            <ResponsiveContainer width="100%" height={200}><BarChart data={adherenceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}><XAxis dataKey="day" axisLine={false} tickLine={false} /><Tooltip cursor={{fill: 'rgba(255, 206, 0, 0.1)'}} /><Bar dataKey="value" fill="#FFCE00" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}