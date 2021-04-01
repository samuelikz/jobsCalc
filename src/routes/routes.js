const express = require('express'); // chamar o express
const routes = express.Router();
const basePath = process.cwd() + "/src/views/" // caminho ./src

const Profile = {
    data: {
        name: "Samuel Nunes",
        avatar: "https://avatars.githubusercontent.com/u/62406705?v=4",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 10
    },

    controllers: {
        index(req,res){
            return res.render(basePath + "profile", { profile: Profile.data })
        },

        update(req,res){
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

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            "daily-hours": 2,
            "total-hours": 1,
            created_at: Date.now() // atribuir data de hoje
        },
        {
            id: 2,
            name: "OneTwo Project",
            "daily-hours": 3,
            "total-hours": 47,
            created_at: Date.now() // atribuir data de hoje
        }
    ],
    controllers: {
        index(req, res) {
            // ajustes no jobs
            const updatedJobs = Job.data.map((job) => {
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return res.render(basePath + "index", { profile: Profile.data, jobs: updatedJobs })
        },

        create(req,res){
            return res.render(basePath + "job")
        },

        save(req, res) {

            const lastId = Job.data[Job.data.length - 1]?.id || 0;
             // req.body = {  name: 'SAMUEL NUNES DA SILVA','daily-hours': '3.1','total-hours': '3'}
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuir data de hoje
            })

            return res.redirect('/')
        },
        show(req,res){
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))

            if (!job){
                return res.send('Job not fount!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])

            return res.render(basePath + "job-edit", {job})
        },
        update(req,res){

                const jobId = req.params.id
    
                const job = Job.data.find(job => Number(job.id) === Number(jobId))
    
                if (!job){
                    return res.send('Job not fount!')
                }
            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours" : req.body["total-hours"],
                "daily-hours" : req.body["daily-hours"],
            }

            Job.data = Job.data.map(job => {
                if(Number(job.id) === Number(jobId)){

                    job = updatedJob
                }

                return job
            })
            res.redirect('/job/' + jobId)
        },
        delete(req,res){
            const jobId = req.params.id

            Job.data = Job.data.filter(job => (job.id) !== Number(jobId))

            return res.redirect('/')
        }
    },
    services: {
        remainingDays(job) {

            // calculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed() //Calculo

            const createdDate = new Date(job.created_at)
            const dueDay = createdDate.getDate() + Number(remainingDays) //Dia do Vencimento
            const dueDateInMs = createdDate.setDate(dueDay)

            const timeDiffInMs = dueDateInMs - Date.now()
            // transformar milli em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor(timeDiffInMs / dayInMs)
            // Restam X dias
            return dayDiff
        },
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

//req, res, render renderizar o html

routes.get('/', Job.controllers.index); // buscar no diretorio raiz 

routes.get('/job', Job.controllers.create); // Formulario para criar jobs

routes.post('/job', Job.controllers.save); // Salvar dados rota post /job 

routes.get('/job/:id', Job.controllers.show); // Mostrar jobs 
routes.post('/job/:id', Job.controllers.update); // Salvar dados rota post
routes.post('/job/delete/:id', Job.controllers.delete); // Salvar dados rota post 
routes.get('/profile', Profile.controllers.index ); // Mostrar perfil
routes.post('/profile', Profile.controllers.update ); // Salvar dados rota post 


module.exports = routes; //exportar para fora