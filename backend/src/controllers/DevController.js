const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    //index, show, store, update, destroy 

    async index(req, res) {
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store(req, res) {
        console.log(req.body);
        const { github_username, techs, latitude, longitude } = req.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            try {
                const response = await axios.get(`https://api.github.com/users/${github_username}`)
                let { name = login, avatar_url, bio } = response.data


                // const techsArray = techs.split(',').map(tech => tech.trim())
                const techsArray = parseStringAsArray(techs)

                // console.log('techsArray', techsArray)

                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }


                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                })
            }
            catch (erro) {
                console.log('erro', erro)
            }

        }

        return res.json(dev)
    },

    async update(req, res) {
        const { github_username } = req.params
        const { name, avatar_url, bio, techs } = req.body

        console.log('github_username', github_username)

        const techsArray = parseStringAsArray(techs)

        const dados = {
            name,
            avatar_url,
            bio,
            techs: techsArray
        }

        const dadosFiltrados = JSON.parse(JSON.stringify(dados))

        console.log('dados', dados)

        const result = await Dev.updateOne({ github_username }, { $set: dadosFiltrados })
        console.log('result', result)

        if (result.nModified !== 1) {
            return res.json({
                message: 'Erro ao atualizar'
            })
        }

        const dev = await Dev.findOne({ github_username })

        return res.json({
            dev
        })
    },

    async show(req, res) {
        const { github_username } = req.params
        return res.json(await Dev.findOne({ github_username }))
    },

    async destroy(req, res) {
        const { github_username } = req.params
        const result = await Dev.deleteOne({ github_username })
        console.log('resut', result)
        if (result.n !== 1) {
            return res.json({
                message: `Erro ao excluir o dev: ${github_username}`
            })
        }
        return res.json({
            message: `O dev ${github_username} foi excluido com sucesso!`
        })
    }
}