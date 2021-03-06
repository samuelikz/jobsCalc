const Profile = require('../model/Profile')
const basePath = process.cwd() + "/src/views/" // caminho ./src

module.exports = {
     async index(req, res) {
        return res.render(basePath + "profile", { profile: await Profile.get() }) // Pegar arquivos do Profile em models
    },

    async update(req, res) {
        // req.body para pegar os dados
        const data = req.body
        // Definir quantas semanas tem um ano
        const weeksPerYear = 52
        // remover as semnas de ferias do ano
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        // quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        // total de horas trabalhadas no mes 
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        //qual sera o valor da minha hora 
        const valueHour = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()

        await Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        }) 
        
        return res.redirect('/profile')
    }
}