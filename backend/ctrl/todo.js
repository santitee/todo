module.exports = function (pool, repo) {
    return {
      async list (ctx) {
          ctx.body = await repo.list(pool)
      },
      async create (ctx) {
        ctx.body = ctx.request.body
        const {content} = ctx.request.body
        // TODO: validate todo
        if(content){
         const id = await repo.create(pool, content)
        }
      },
      async get (ctx) {
        const id = ctx.params.id
        // TODO: validate id
        if(id) {
          const getID = await repo.find(pool, id)
          ctx.body = getID
        }
        // find todo from repo
        // send todo
      },
      async update (ctx) {
        const id = ctx.params.id
        const {content} = ctx.request.body
        if((id) && (content)) {
          const updateID = await repo.changeContent(pool, id, content)
          ctx.body = "Updat Successful"
        }           
      },
      async remove (ctx) {
        const id = ctx.params.id
        // TODO: validate id
        if(id) {
          const getID = await repo.remove(pool, id)
          ctx.body = getID
        }
        // find todo from repo
        // send todo
        },
      async complete (ctx) {
        const id = ctx.params.id
        // TODO: validate id
        if(id) {
          const getID = await repo.markComplete(pool, id)
          ctx.body = getID
        }
        // find todo from repo
        // send todo
  
      },
      async incomplete (ctx) {
        const id = ctx.params.id
        // TODO: validate id
        if(id) {
          const getID = await repo.markIncomplete(pool, id)
          ctx.body = getID
        }
        // find todo from repo
        // send todo
      },
    }
  }
  