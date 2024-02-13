const mongoose=require("mongoose");
const listSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false, // Default value is set to false if not provided
    },
    isEditing: {
      type: Boolean,
      default: false, // Default value is set to false if not provided
    },
  });
  

module.exports= mongoose.model("List",listSchema);
