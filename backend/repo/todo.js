module.exports = {
    create,
    list,
    find,
    changeContent,
    remove,
    markComplete,
    markIncomplete
  }
  
  async function create (db, content) {
    await db.execute(`
    insert into todos (content)
      values (?)
      `, [content])
      return
  }
  
  async function list (db) {
    const [rows] = await db.execute(`
    select
      *
    from todos
    `)
    return rows
  }
  
  async function find (db, id) {
    const [rows] = await db.execute(`
    select
      *
    from todos
    where id=?
    `,[id])
    return rows
  }
  
  async function changeContent (db, id, content) {
    const result = await db.execute(`
    update todos
    set content= ?
    where id = ?
    `,[content, id])
    return 
  }
  
  async function remove (db, id) {
    const result = await db.execute(`
    delete from todos
    where id=?
    `,[id])
    return 
  }
  
  async function markComplete (db, id) {
    const result = await db.execute(`
    update todos
    set status_completed= 1
    where id = ?
    `,[id])
    return 
  }
  
  async function markIncomplete (db, id) {
    const result = await db.execute(`
    update todos
    set status_completed= 0
    where id = ?
    `,[id])
    return 
  }
  