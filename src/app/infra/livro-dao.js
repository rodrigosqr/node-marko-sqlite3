class LivroDao {
    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'select * from livros',
                (erro, resultado) => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível listar os livros!');   
                    }
                    return resolve(resultado);
                }
            );
        });
    }

    adiciona({titulo, preco, descricao}) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                    INSERT INTO livros (
                        titulo,
                        preco,
                        descricao
                    ) values (?,?,?)
                `,
                [
                    titulo,
                    preco,
                    descricao
                ],
                erro => {
                    if (erro) {
                        console.log(erro);
                        return reject('Não foi possível adicionar o livro!');
                    }
 
                    resolve();
                });
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro, livro) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o livro!');
                    }
                    return resolve(livro);
                }
            );
        });
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao;