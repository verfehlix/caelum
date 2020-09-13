import restify, { Response } from 'restify'

const PORT = 5000
const app = restify.createServer()
app.get('/', (_, res: Response) => res.send({ hello: 'World' }))
app.listen(PORT)
