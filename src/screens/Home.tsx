
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./Home.css";
import { CadastroLivro } from './CadastroLivro';
import { ListaLivros } from './ListaLivros';
import { EditarLivro } from './EditarLivro';

export function Home() {
        return(
            <Router>
            <Routes>
                    <Route path="/" element={<ListaLivros></ListaLivros>} />
                    <Route path="/cadastrar" element={<CadastroLivro></CadastroLivro>} />
                    < Route path="/editar/:id" element={<EditarLivro></EditarLivro>} />
            </Routes>
        </Router>
        )
    
}
