envelopes = [
    {

        id:1,
        category:'rent',
        budgetAmount: 2000,
        budgetUsed:10,
        budgetLeft: function(){
            return this.budgetAmount-this.budgetUsed
        }
    },

    {
        id:2,
        category:'groceries',
        budgetAmount: 4000,
        budgetUsed:30,
        budgetLeft: function(){
            return this.budgetAmount-this.budgetUsed
        }
    },
    {
        id:3,
        category:'gym',
        budgetAmount: 200,
        budgetUsed:30,
        budgetLeft: function(){
            return this.budgetAmount-this.budgetUsed
        }
    }  

]

module.exports = {envelopes}