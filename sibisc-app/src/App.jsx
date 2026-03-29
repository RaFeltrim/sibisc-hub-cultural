import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <h1>SIBiSC - MVP Inicial</h1>
        {/* Futuro componente de Header entrará aqui */}
        <Routes>
          <Route path="/" element={<h2>Página Início</h2>} />
          <Route path="/noticias" element={<h2>Página de Notícias</h2>} />
          <Route path="/eventos" element={<h2>Página de Eventos</h2>} />
          <Route path="/acervo" element={<h2>Página de Acervo</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
