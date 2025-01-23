import React, { useState } from 'react';
import './CadastroLivro.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export function CadastroLivro() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [ano_publicacao, setAnoPublicacao] = useState('');
    const [genero, setGenero] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const novoLivro = {
            id: uuidv4(),
            titulo,
            autor,
            ano_publicacao,
            genero
        };

        fetch('http://localhost:3000/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoLivro)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Livro cadastrado com sucesso:', data);
            navigate("/");
        })
        .catch(error => {
            console.error('Erro ao cadastrar livro:', error);
        });
    };

    return (
        <div className="cadastro-container">
            <h1>Cadastrar Livro</h1>
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
                <button type="submit" className="button">Cadastrar</button>
            </form>
        </div>
    );
}