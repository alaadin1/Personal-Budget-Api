const express = require('express')
const app = express()
const apiRouter = express.Router()
const {envelopes} = require('./envelopes')

app.use('/api/envelopes', apiRouter)


//get all the envelopes
apiRouter.get('/', (req,res) =>{
    res.status(200).send(envelopes)
})

//get total budget
apiRouter.get('/totalBudget', (req,res)=>{
    //first we have to iterate through all of the objs in the arr
    //then we have to have a running count of the budgetAmount variable
    // const totalBudeget = envelopes.reduce((total,currentVal)=>{
    //     console.log(total.budgetAmount)
    //     console.log(currentVal.budgetAmount)
    //     return total.budgetAmount + currentVal.budgetAmount
    // })
    // console.log(totalBudeget)
    let total = 0
    for(let i = 0; i<envelopes.length; i++){
        total += envelopes[i].budgetAmount
    }
    res.status(200).send(total.toString())
})

//add an enevelope 
apiRouter.post('/:category/:budgetAmount', (req,res)=>{
    //create a new ID for the envelope
    //We first need to determine what IDs we have
    //Then we take the last ID number and add one. this will be the new ID.
    const allIds = envelopes.map((envelope)=>{
        const {id} = envelope
        return id
    })
    let newId = allIds[allIds.length-1] + 1 

    //get the category and budget specfied by the person (can be req.body if using front end)
    const {category, budgetAmount} = req.params

    //check to see if a category and budget was inputted
    if(!category || !budgetAmount){
        return res.send('Please input appropriate information : Category & Budget amount')
    }
    
    //check to see if the category already exisits 
    const checkingCategory = envelopes.find((envelope)=> {return envelope.category === category})
    if (checkingCategory != undefined){
        return res.send("Category already present")
    }

    //create a new envelope with the given information and put it into the data base
    const newEnvelope = {
        id:newId,
        category:category,
        budgetAmount: Number(budgetAmount),
        budgetUsed:0,
        budgetLeft: function(){
            return this.budgetAmount-this.budgetUsed
        }
    }
    envelopes.push(newEnvelope)
    

    res.status(201).send(envelopes)

})

//get a specific envelope based on id name
apiRouter.get('/:id', (req,res)=>{
    ///first get the id
    const {id} = req.params

    //then search for the id in the envelopes (this returns the first instance of the id and undefindded if not)
    const envelopeId = envelopes.find((envelope)=>envelope.id === Number(id))

    //determine if the id exists
    if (envelopeId === undefined){
        res.status(404).send("Envelope Not Found")
    }

    //if the ID exisits, send that object to the server
    res.send(envelopeId)

})

//update a specfic envelope when money is being taken out
apiRouter.put('/:amountTaken', (req,res)=>{
    //find the specific envelope to update (use the id)
    const {id} = req.query
    const {amountTaken} = req.params

    //return an error if no ID is provided
    if(!id){
        return res.status(404).send('Please Provide an Envelope to Update')
    }

    //we must find the index of that ID
    const enevelopeIndex = envelopes.findIndex((envelope) => envelope.id === Number(id))
    if(enevelopeIndex === -1){
        return res.status(404).send('Not found')
    }

    //now that we have the index of the item we are trying to update, we can now update it
    envelopes[enevelopeIndex].budgetAmount -= Number(amountTaken)
    

    //let users know if they went over budget
    if(envelopes[enevelopeIndex].budgetAmount < 0){
        const absValue = Math.abs(envelopes[enevelopeIndex].budgetAmount)
        return res.status(201).send(`You've gone over your limit by ${absValue} Dollars!`)
    }

    
    //console.log(envelopeId)
    // console.log(enevelopeIndex)
    res.send(envelopes[enevelopeIndex])
})

apiRouter.delete('/:id', (req,res)=>{
    
})



const PORT = 5001
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})