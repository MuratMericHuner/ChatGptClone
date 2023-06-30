const PORT = 8000
const express = require('express')
const cors = require('cors')
const {Configuration, OpenAIApi} = require('openai')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

const config = new Configuration({
    apiKey : process.env.API_KEY
})
const openAI = new OpenAIApi(config)

app.post('/completion', async (req,res) => {
    try {
        const aiResponse = await openAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [{role:'user', content: req.body.message}],
            max_tokens : 100
        })
        const parsedResponse= aiResponse.data.choices[0].message
        res.send(parsedResponse)
    } catch (error) {
        console.error(error)
    }
})

app.post('/images', async (req,res) => {
    try {
        const aiResponse = await openAI.createImage({
            prompt : req.body.prompt,
            n : 5,
            size: "1024x1024"
        })
        res.send(aiResponse.data.data)
    } catch (error) {
        console.error(error)
    }
})

app.post('/completionsql', async (req,res) => {
    try {
        const aiResponse = await openAI.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages : [{role:'user', content: `Create SQL request to` + req.body.message}],
            max_tokens : 100
        })
        const parsedResponse= aiResponse.data.choices[0].message
        res.send(parsedResponse)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, ()=> console.log("server is runninng on port 8000"))