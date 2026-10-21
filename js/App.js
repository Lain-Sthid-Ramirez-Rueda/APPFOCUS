const { useState, useMemo, useEffect } = React;

const STORAGE_KEY = 'appfocus.blocks.v1';
const DEFAULT_BLOCKS = [
    { id: 1, title: 'Trabajo Profundo: Programación', category: 'Deep Work', completed: false },
    { id: 2, title: 'Lectura 30 min', category: 'Hábito', completed: true },
];

// Carga los bloques guardados en el navegador; si no hay datos válidos, usa los de ejemplo.
const loadBlocks = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : DEFAULT_BLOCKS;
    } catch {
        return DEFAULT_BLOCKS;
    }
};
// Icon está disponible globalmente en window.Icon gracias al orden de los scripts

const App = () => {
    // 1. ESTADO GLOBAL
    const [blocks, setBlocks] = useState(loadBlocks);

    // Persistencia local: los bloques se guardan en el navegador del usuario, sin servidor.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
        } catch {
            // Almacenamiento no disponible (modo privado): la app sigue funcionando en memoria.
        }
    }, [blocks]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBlockTitle, setNewBlockTitle] = useState('');
    const [newBlockCategory, setNewBlockCategory] = useState('Deep Work');

    // 2. LÓGICA DERIVADA (Performance optimizado con useMemo)
    const totalBlocks = blocks.length;
    const completedBlocks = blocks.filter(b => b.completed).length;
    const efficiency = totalBlocks === 0 ? 0 : Math.round((completedBlocks / totalBlocks) * 100);

    const filteredBlocks = useMemo(() => {
        return blocks.filter(block => 
            block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            block.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [blocks, searchQuery]);

    // 3. MANEJADORES DE EVENTOS
    const handleAddBlock = (e) => {
        e.preventDefault();
        if (!newBlockTitle.trim()) return;
        
        setBlocks([...blocks, {
            id: Date.now(),
            title: newBlockTitle,
            category: newBlockCategory,
            completed: false
        }]);
        
        setNewBlockTitle('');
        setIsModalOpen(false);
    };

    const toggleBlockStatus = (id) => {
        setBlocks(blocks.map(block => 
            block.id === id ? { ...block, completed: !block.completed } : block
        ));
    };

    // 4. RENDERIZADO DEL COMPONENTE
    return (
        <div className="min-h-screen">
            {/* HEADER */}
            <header className="flex items-center justify-between px-6 py-5 border-b border-[#1a1f35]/50 bg-[#060813]/90 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="font-black text-xl">C</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl tracking-tight flex items-center gap-2">
                            CORE <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30 font-black">v3.0</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Sistema Operativo Local</span>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-indigo-300 mb-1">
                            <span>RECLUTA</span>
                            <span className="text-white">0 XP</span>
                        </div>
                        <div className="w-40 h-1 bg-[#131624] rounded-full overflow-hidden border border-[#1a1f35]">
                            <div className="h-full bg-indigo-500 w-[5%]"></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#131624] border border-[#1a1f35] px-4 py-2 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                        <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Online</span>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* COLUMNA IZQUIERDA (Estadísticas) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-[#0e1224] border border-[#1a1f35] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="w-10 h-10 rounded-xl bg-[#161b30] border border-[#232a45] flex items-center justify-center text-gray-500"><window.Icon name="square" size={16}/></div>
                            <div className="text-center">
                                <h2 className="text-[10px] font-black tracking-[0.2em] text-indigo-400 mb-2 uppercase">Día Operativo</h2>
                                <div className="flex gap-1.5 justify-center">
                                    {[1,2,3].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>)}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[#161b30] border border-[#232a45] flex items-center justify-center text-gray-500"><window.Icon name="play" size={16}/></div>
                        </div>
                        <div className="mt-10">
                            <div className="flex justify-between items-end mb-4">
                                <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">Eficiencia</span>
                                <span className="text-5xl font-black">{efficiency}%</span>
                            </div>
                            <div className="h-3 w-full bg-[#161b30] rounded-full overflow-hidden border border-[#232a45] p-0.5">
                                <div className="h-full bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: `${efficiency}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0e1224] border border-[#1a1f35] rounded-[2rem] p-8 shadow-2xl flex items-center justify-between group hover:border-orange-500/30 transition-colors">
                        <div>
                            <h2 className="text-[10px] font-black tracking-[0.2em] text-orange-500 mb-2 uppercase">Disciplina</h2>
                            <div className="text-4xl font-black mb-1">0 DÍAS</div>
                            <p className="text-xs text-gray-500 font-medium">Racha de inactividad evitada</p>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-[#161b30] border-t-orange-500 flex items-center justify-center bg-[#131624] shadow-lg">
                            <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">🔥</span>
                        </div>
                    </div>

                    <div className="bg-[#0e1224] border border-[#1a1f35] rounded-[2rem] p-8 shadow-2xl">
                        <p className="text-sm text-gray-400 italic leading-relaxed font-medium">
                            "La diferencia entre un profesional y un amateur es la constancia en los días que no hay motivación."
                        </p>
                    </div>
                </div>

                {/* COLUMNA DERECHA (Agenda) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="bg-[#0e1224] border border-[#1a1f35] rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <h2 className="text-4xl font-black tracking-tight mb-3">Agenda de Impacto</h2>
                            <p className="text-sm text-gray-400 font-medium">Gestiona tus bloques de trabajo profundo y hábitos de élite.</p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="bg-white text-black hover:bg-gray-200 font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl whitespace-nowrap text-xs tracking-widest">
                            <window.Icon name="plus" size={16} className="bg-black text-white rounded-full p-0.5" />
                            NUEVO BLOQUE
                        </button>
                    </div>

                    {/* BUSCADOR */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <window.Icon name="search" size={20} className="text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Filtrar por nombre o categoría..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-14 pr-6 py-5 bg-[#0e1224] border border-[#1a1f35] rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-lg font-medium"
                        />
                    </div>

                    {/* LISTA DE BLOQUES */}
                    <div className="space-y-4 custom-scrollbar overflow-y-auto max-h-[600px] pr-2">
                        {filteredBlocks.length > 0 ? (
                            filteredBlocks.map(block => (
                                <div 
                                    key={block.id} 
                                    className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${
                                        block.completed 
                                        ? 'bg-[#0e1224]/40 border-[#1a1f35] opacity-50' 
                                        : 'bg-[#0e1224] border-[#1a1f35] hover:border-indigo-500/30 glow-indigo'
                                    }`}
                                >
                                    <div className="flex items-center gap-5">
                                        <button onClick={() => toggleBlockStatus(block.id)} className="focus:outline-none transition-transform active:scale-90">
                                            {block.completed 
                                                ? <window.Icon name="check-circle-2" className="text-indigo-400" size={28}/> 
                                                : <window.Icon name="circle" className="text-gray-600 hover:text-indigo-400" size={28}/>
                                            }
                                        </button>
                                        <div>
                                            <h3 className={`font-bold text-lg ${block.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                                {block.title}
                                            </h3>
                                            <span className="text-[10px] text-indigo-400 font-black tracking-[0.2em] uppercase">
                                                {block.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <window.Icon name="more-vertical" className="text-gray-700" size={20} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-24 border-2 border-dashed border-[#1a1f35] rounded-[2rem] bg-[#0e1224]/30">
                                <p className="text-gray-600 font-black tracking-[0.3em] text-xs uppercase">Sin sectores activos</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* MODAL PARA NUEVO BLOQUE */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                    <div className="bg-[#0e1224] border border-[#1a1f35] rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-8 border-b border-[#1a1f35]">
                            <h3 className="text-2xl font-black">Nuevo Bloque</h3>
                            <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform">
                                <window.Icon name="x" size={24} className="text-gray-500 hover:text-white" />
                            </button>
                        </div>
                        <form onSubmit={handleAddBlock} className="p-8 space-y-8">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 mb-3 tracking-[0.2em] uppercase">Nombre del Bloque</label>
                                <input 
                                    type="text" 
                                    autoFocus 
                                    required 
                                    value={newBlockTitle} 
                                    onChange={(e) => setNewBlockTitle(e.target.value)}
                                    className="w-full bg-[#060813] border border-[#1a1f35] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500 transition-colors font-bold"
                                    placeholder="Ej: Programación CORE"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 mb-3 tracking-[0.2em] uppercase">Categoría</label>
                                <select 
                                    value={newBlockCategory} 
                                    onChange={(e) => setNewBlockCategory(e.target.value)}
                                    className="w-full bg-[#060813] border border-[#1a1f35] rounded-xl px-5 py-4 text-white focus:outline-none appearance-none font-bold"
                                >
                                    <option value="Deep Work">Deep Work</option>
                                    <option value="Hábito">Hábito</option>
                                    <option value="Aprendizaje">Aprendizaje</option>
                                    <option value="Operativo">Operativo</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-white text-black font-black py-5 rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-[0.2em] text-[10px] shadow-xl">
                                Iniciar Bloque
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// Exportar globalmente para que main.js pueda usarlo
window.App = App;
