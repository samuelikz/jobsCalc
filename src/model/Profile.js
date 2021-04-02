let data = {
    name: "Samuel Nunes",
    avatar: "https://avatars.githubusercontent.com/u/62406705?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 10
};

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }
}