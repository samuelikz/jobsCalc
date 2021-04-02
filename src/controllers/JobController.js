const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
const basePath = process.cwd() + "/src/views/" // caminho ./src


module.exports = {

    create(req, res){
        return res.render(basePath + "job")
    },

    save(req, res) {
        const jobs = Job.get()
        const lastId = jobs[jobs.length - 1]?.id || 0;
        // req.body = {  name: 'SAMUEL NUNES DA SILVA','daily-hours': '3.1','total-hours': '3'}
        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuir data de hoje
        })

        return res.redirect('/')
    },
    show(req, res){
        const jobId = req.params.id
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not fount!')
        }

        const profile = Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render(basePath + "job-edit", { job })
    },
    update(req, res){

        const jobId = req.params.id
        const jobs = Job.get()
        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not fount!')
        }
        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

       const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {

                job = updatedJob
            }

            return job
        })

        Job.update(newJobs)
        res.redirect('/job/' + jobId)
    },
    delete (req, res){
        
        const jobId = req.params.id
        
        Job.delete(jobId)

        return res.redirect('/')
    }
}