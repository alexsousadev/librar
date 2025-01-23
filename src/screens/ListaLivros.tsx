import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Livro {
  id: number;
  titulo: string;
}

export function ListaLivros() {
  const navigate = useNavigate();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/livros")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na rede");
        }
        return response.json();
      })
      .then((data) => {
        setLivros(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/livros/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao deletar livro");
        }
        // Atualiza a lista de livros após a exclusão
        setLivros(livros.filter((livro) => livro.id !== id));
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="home">
      <div className="actions">
        <button className="button" onClick={() => navigate("/cadastrar")}>
          Cadastrar Livro
        </button>
      </div>
      <hr />
      <h1>Lista de Livros</h1>
      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        <ul className="livros-lista">
          {livros.map((livro) => (
            <li key={livro.id} className="livro-item">
              <div className="livro-detalhes">
                <span>{livro.titulo}</span>
                <button
                  className="button"
                  onClick={() => navigate(`/editar/${livro.id}`)}
                >
                  Editar
                </button>
                <button
                  className="button"
                  onClick={() => handleDelete(livro.id)}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
