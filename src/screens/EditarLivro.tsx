import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CadastroLivro.css';

export function EditarLivro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [ano_publicacao, setAnoPublicacao] = useState('');
    const [genero, setGenero] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch book details when component mounts
        fetch(`http://localhost:3000/livros/${id}`)
            .then(response => response.json())
            .then(data => {
                setTitulo(data.titulo);
                setAutor(data.autor);
                setAnoPublicacao(data.ano_publicacao);
                setGenero(data.genero);
            })
            .catch(error => {
                console.error('Erro ao buscar livro:', error);
            });
    }, [id]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const livroAtualizado = {
            titulo,
            autor,
            ano_publicacao,
            genero
        };

        fetch(`http://localhost:3000/livros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livroAtualizado)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.error('Erro ao atualizar livro:', error);
        });
    };

    return (
        <div className="cadastro-container">
            <h1>Editar Livro</h1>
            <form className="cadastro-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo">Título do Livro</label>
                    <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="autor">Autor do Livro</label>
                    <input type="text" id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="ano_publicacao">Ano de Publicação</label>
                    <input type="text" id="ano_publicacao" value={ano_publicacao} onChange={(e) => setAnoPublicacao(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="genero">Gênero do Livro</label>
                    <input type="text" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required />
                </div>
                <button type="submit" className="button">Atualizar</button>
            </form>
        </div>
    );
}