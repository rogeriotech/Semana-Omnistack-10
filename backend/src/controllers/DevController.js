const axios = require('axios')
const Dev = require('../models/Dev')

module.exports = {
    async store(req, res) {
        console.log(req.body);
        const { github_username, techs, latitude, longitude } = req.body

        let dev = Dev.findOne({ github_username })

        if(!dev){
            const response = await axios.get(`https://api.github.com/users/${github_username}`)
            let { name = login, avatar_url, bio } = response.data
    
            const techsArray = techs.split(',').map(tech => tech.trim())
            console.log('techsArray', techsArray)
    
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


        // console.log(`name ${name} \ntechs ${techs} \navatar_url ${avatar_url} \nbio ${bio}`)
        return res.json(dev)
    }
}