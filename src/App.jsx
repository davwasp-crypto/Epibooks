import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllTheBooks from './components/AllTheBooks';
import BookDetails from './components/BookDetails';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      {/* Qui puoi aggiungere un componente MyNav se lo hai */}
      <Routes>
        <Route path="/" element={<AllTheBooks />} />
        <Route path="/details/:asin" element={<BookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;