import express from "express";

const app = express();

app.use(express.json())

const books = [
    {id: 1, "titulo": "Senhor dos Aneis"},
    {id: 2, "titulo": "O Hobbit"}
]

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
})

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    res.json(books[index])
})

app.post('/books', (req, res) => {
    books.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso.')
})

app.put('/books/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    books[index].titulo = req.body.titulo;
    res.json(books)
})

app.delete('/books/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    books.splice(index, 1)
    res.send(`Livro para o Id: ${id} removido com sucesso`);
})

function buscaLivro(id){
    return books.findIndex(book => book.id == id)
}

export default app