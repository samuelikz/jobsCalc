module.exports = {
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