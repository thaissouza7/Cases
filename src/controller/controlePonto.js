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


export const updatePonto = async (req, res) => {
  try {
    const db = await openDb();
    const id = parseInt(req.params.id);
    const { funcionario, dia, entrada, saida } = req.body;

    // verifica se o ponto existe
    const pontoExiste = await db.get('SELECT * FROM Ponto WHERE id = ?', [id]);
    if (!pontoExiste) {
      return res.status(404).json({ mensagem: "Ponto não encontrado" });
    }

    // atualiza o ponto na base de dados
    await db.run('UPDATE Ponto SET funcionario = ?, dia = ?, entrada = ?, saida = ? WHERE id = ?', [funcionario, dia, entrada, saida, id]);

    res.status(200).json({ mensagem: "Ponto atualizado com sucesso" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ mensagem: "Erro ao atualizar o ponto" });
  }
};


export async function deletePonto(req, res) {
  let id = req.params.id
  openDb().then(db => {
    db.get('DELETE from Ponto WHERE id=?', [id])
  });
  res.json({
    "statusCoode": 200
  })
}

