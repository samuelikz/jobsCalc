const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')
const basePath = process.cwd() + "/src/views/" // caminho ./src

module.exports = {

    create(req, res){
        return res.render(basePath + "job")
    },

    async save(req, res) {
        // req.body = {  name: 'SAMUEL NUNES DA SILVA','daily-hours': '3.1','total-hours': '3'}
        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now() // atribuir data de hoje
        });     

        return res.redirect('/')
    },
    async show(req, res){
        const jobId = req.params.id
        const jobs = await Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not fount!')
        }

        const profile = await Profile.get()

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render(basePath + "job-edit", { job })
    },
    async update(req, res){

        const jobId = req.params.id
        
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        await Job.update(updatedJob, jobId)
        res.redirect('/job/' + jobId)
    },
    async delete (req, res){
        
        const jobId = req.params.id
        
        await Job.delete(jobId)

        return res.redirect('/')
    }
}