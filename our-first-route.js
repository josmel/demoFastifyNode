async function routes(fastify, options) {
  const database = fastify.mongo.db('db')
  const collection = database.collection('test')

  const opts1 = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            hello: { type: 'string' }
          }
        }
      }
    }
  }
  fastify.get('/', opts1, async (request, reply) => {
    return { hello: 'world' }
  })

  fastify.get('/search/:id', async (request, reply) => {
    const result = await collection.findOne({ id: request.params.id })
    if (result.value === null) {
      throw new Error('Invalid value')
    }
    return result.value
  })

  const opts = {
    schema: {
      body: {
        type: 'object',
        properties: {
          someKey: { type: 'string' },
          someOtherKey: { type: 'number' }
        }
      }
    }
  }

  fastify.post('/', opts, async (request, reply) => {
    return { hello: 'world' }
  })
}

module.exports = routes
