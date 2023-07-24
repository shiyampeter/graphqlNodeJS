const Event = require('../../models/event');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

const events = async(eventIds) => {
    const events = await Event.find({_id:{$in:eventIds}})
    events.map(event => {
        return {
            event,creator:user.bind(this,event.creator)
        }
    });
    console.log(events)
    return events
    
}
const user = async(userId) => {
    const user = await User.findById(userId)    
        return user
   
}

module.exports = {
    events:async()=>{
        const results =  await Event.find().populate('creator');              
        // results.map(event => {
        //     return {
        //         ...event,creator:user.bind(this,event.creator)
        //     }
        // })
        return results
    },
    users:async()=>{
        const results =  await User.find().populate('createdEvents')              
        // results.map(user => {
        //     return {
        //         ...user,createdEvents:events.bind(this,user.createdEvents)
        //     }
        // })
        return results
    },
    createEvent:async(args)=>{
     
        const event = new Event({
            title: args.eventInput.title,
            description:args.eventInput.description,
            price:args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: "64b52b902e0ed88f68a4bab3"
        })
        const result = await event.save()
        const user = await User.findById("64b52b902e0ed88f68a4bab3")
        if(!user){
            throw new Error('user doesnot exist');
        }
           
        user.createdEvents=event;
        await user.save();
            
            return result;
       
    },
    createUser:async(args)=>{
        const userExist = await User.findOne({email:args.userInput.email});
        if(userExist){
            throw new Error('user already exist');
        }
        const hashedpassword = await bcrypt.hash(args.userInput.password,10);
        const user = new User({
            email: args.userInput.email,
            password:hashedpassword,
        })
        return user.save().then(result => {
            console.log(result)
            return result;
        }).catch(err => {
            console.log(err)
            throw err;
        });
        
    }

}