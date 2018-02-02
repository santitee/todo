"use strict"

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mysql2 = require('mysql2/promise')
const cors = require('koa2-cors');

const dbConfig = require('./config/db')

const makeTodoCtrl = require('./ctrl/todo')
const todoRepo = require('./repo/todo')

const pool = mysql2.createPool(dbConfig)

const todoCtrl = makeTodoCtrl(pool, todoRepo)

const router = new Router()
  .get('/todo', todoCtrl.list)
  .post('/todo', todoCtrl.create)
  .get('/todo/:id', todoCtrl.get)
  .patch('/todo/:id', todoCtrl.update)
  .delete('/todo/:id', todoCtrl.remove)
  .put('/todo/:id/complete', todoCtrl.complete)  
  .delete('/todo/:id/complete', todoCtrl.incomplete)

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.listen(3002)

