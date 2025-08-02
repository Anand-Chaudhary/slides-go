import http from 'http'
import app from './src/app'

const server = http.createServer(app)
const PORT = process.env.PORT

server.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})