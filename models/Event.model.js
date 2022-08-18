const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
   
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required:true
    },
    address:{
      type: String,
      required: true
    },
      image: {
      type: String,
      //default: //poner una imagen por defecto por si no hay foto 
    },
    price: {
       type:Number
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
     creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  }, 
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
