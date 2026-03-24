import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <h1>SIBiSC - MVP Inicial</h1>
        <Routes>
          <Route path="/" element={<h2>Página Inicial (Notícias em breve)</h2>} />
          <Route path="/eventos" element={<h2>Página de Eventos</h2>} />
          <Route path="/acervo" element={<h2>Página de Acervo</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
