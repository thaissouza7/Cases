import { openDb } from '../configDB.js';

export async function createTable() {
  openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS Ponto (id INTEGER PRIMARY KEY, funcionario TEXT, dia DATE NOT NULL, entrada TIME DEFAULT NULL, saida TIME DEFAULT NULL)')
    console.log('Tabela criada com sucesso');
  }).catch((error) => {
    console.error(error);
  });
}

export async function selectAllPontos(req, res) {
  openDb().then(db => {
    db.all('SELECT * from Ponto')
      .then(Pontos => res.json(Pontos))
  });
}

export async function selectPonto(req, res) {
  let id = req.params.id
  openDb().then(db => {
    db.get('SELECT * from Ponto WHERE id=?', [id])
      .then(Ponto => res.json(Ponto))
      .catch(err => {
        console.error(err);
        throw err;
      });
  });
}

export async function insertPonto(req, res) {
  let Ponto = req.body;
  openDb().then(db => {
    db.run('INSERT INTO Ponto (funcionario, dia, entrada, saida) VALUES (?,?,?,?)', [Ponto.funcionario, Ponto.dia, Ponto.entrada, Ponto.saida]);
  }).then(() => {
    console.log("Registro inserido com sucesso!");
  }).catch((err) => {
    console.log("Erro ao inserir registro: ", err);
  });
  res.json({
    "statusCoode": 200
  })
}

export async function updatePonto(req, res) {
  let Ponto = req.body;
  openDb().then(db => {
    db.run('UPDATE Ponto SET funcionario=?, dia=?, entrada=?, saida=? WHERE id=?', [Ponto.funcionario, Ponto.dia, Ponto.entrada, Ponto.saida, Ponto.id]);
  }).then(() => {
    console.log('Registro atualizado com sucesso');
    return true;
  })
    .catch(err => {
      console.error(err);
      return false;
    });
  res.json({
    "statusCoode": 200
  })
}

export async function deletePonto(req, res) {
  let id = req.body.id
  openDb().then(db => {
    db.get('DELETE from Ponto WHERE id=?', [id])
  });
  res.json({
    "statusCoode": 200
  })
}

