import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export const generateToken = (req: FastifyRequest, reply: FastifyReply) => {
  const server: FastifyInstance = req.server
  // @ts-ignore
  const { id, provider } = req.params

  // const payload = {
  //   id,
  //   provider
  // }
  // const token = req..jwt.sign({ payload })
  reply.send({ token: null })
}

export const verifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    //await req.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
}
