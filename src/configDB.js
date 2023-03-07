//Instanciando o sqlite3 
import sqlite3 from 'sqlite3'

//Abrindo o método open dentro do sqlite
import { open } from 'sqlite'
//open = método do Sqlite

// you would have to import / invoke this in another file
//Exportando a função openDb()
export async function openDb () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  })
}