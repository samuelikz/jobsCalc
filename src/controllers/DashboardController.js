const Job = require('../model/Job') // importar modelo Jobs
const JobUtils = require('../utils/JobUtils') // importar calculos jobs
const Profile = require('../model/Profile') // importar profile
const basePath = process.cwd() + "/src/views/" // caminho ./src

module.exports = {
    
    async index(req, res) {
        // ajustes no jobs
        const jobs = await Job.get(); // Trazer informações de Trabalhos
        const profile = await Profile.get(); // Trazer informações do Perfil
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // Total de horas por dia de cada job em progress
        let jobTotalHours = 0
        
        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
            //somando a quantidade de status
            statusCount[status] += 1;

            // Total de horas por dia de cada job em progress com ternario 
            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours

            // Calculo de horas por dia 
            // if(status == 'progress'){
            //     jobTotalHours += Number(job['daily-hours'])
            // }

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // quantidade de horas que quero trabalhar profile
        const freeHours = profile["hours-per-day"] - jobTotalHours;
        //menos 

        // a quantidade de horas/dia em cada job em progress

        return res.render(basePath + "index", { profile: profile, jobs: updatedJobs, statusCount: statusCount, freeHours: freeHours })
    }
}