const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId, ref: 'User',
             required: true 

    },
    date: { 
            type: Date, 
            required: true


            },
    taskName: { 
                type: String, 
                required: true
              },
    time: { 
                type: Date, 
              },
    location:{
                type:String
    } ,
  color:{
    type:String,
    default:"#ffffff"
  }
   
},
    
{
    timestamps:true
    });

module.exports = mongoose.model('Task', taskSchema);

