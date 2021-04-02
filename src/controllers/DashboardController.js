const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
const basePath = process.cwd() + "/src/views/" // caminho ./src


module.exports = {
    
    index(req, res) {
        // ajustes no jobs
        const jobs = Job.get(); // Trazer jobs
        const profile = Profile.get();
        
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