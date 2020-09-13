import restify, { Response, Request } from 'restify'
import { Sequelize } from 'sequelize'

import { WeatherData, weatherDataModelDefiner } from './model/WeatherData'

const DB_FILE_NAME = './db/weather_db.sqlite3'
const PORT = 5000

const main = async () => {
    // Setup Web Server
    console.log('Starting Web Server...')
    const server = restify.createServer()
    server.use(restify.plugins.bodyParser())

    // Setup DB
    console.log('Setting up database...')
    const sequelize = new Sequelize(`sqlite:${DB_FILE_NAME}`)
    weatherDataModelDefiner(sequelize)
    await sequelize.sync()
    console.log('Database setup done.')

    // GET Route
    server.get('/weatherdata', async (_, res: Response) => {
        console.log('\nReceived GET request for /weatherdata... Fetching...')

        const allWeatherData = await WeatherData.findAll()

        console.log(
            `Found ${allWeatherData.length} entries... Sending Response...`
        )

        res.send(allWeatherData)
    })

    // POST Route
    server.post('/weatherdata', async (req: Request, res: Response) => {
        const { timestamp, temperature, humidity, co2 } = req.body
        console.log(
            `\nReceived POST request for /weatherdata: ${timestamp}, ${temperature}, ${humidity}, ${co2}... Inserting...`
        )

        await WeatherData.create({
            timestamp,
            temperature,
            humidity,
            co2
        })

        console.log(`Done inserting... Sending Response...`)

        res.send(200)
    })

    // Start Webserver
    server.listen(PORT)
    console.log(`Web Server started on port ${PORT}`)
}

main()
