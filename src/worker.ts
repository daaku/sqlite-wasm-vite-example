import sqlite3InitModule from '@sqlite.org/sqlite-wasm'

const NAMES = ['yoda', 'luke', 'leia', 'vadar']

const run = async () => {
  const log = (...args: any[]) => console.log(...args)
  const error = (...args: any[]) => console.error(...args)
  const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error,
  })
  console.log(`Running SQLite3 version ${sqlite3.version.libVersion}`)

  const db = new sqlite3.oo1.DB('file:local3?vfs=opfs', 'c')

  try {
    console.time('create table')
    db.exec(`create table if not exists users(
      id integer primary key autoincrement,
      name text
    )`)
    console.timeEnd('create table')
    console.time('insert')
    db.exec({
      sql: `insert into users (name) values ($name)`,
      bind: { $name: NAMES[Math.floor(Math.random() * NAMES.length)] },
    })
    console.timeEnd('insert')
    console.time('select')
    const values = db.exec({
      sql: 'SELECT id, name FROM users',
      rowMode: 'object',
      returnValue: 'resultRows',
    })
    console.timeEnd('select')
    self.postMessage(values)
  } finally {
    db.close()
  }
}

run()
