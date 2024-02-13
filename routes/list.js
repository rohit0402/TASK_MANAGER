const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const List = require("../models/list.js");

//createtask
router.post("/addtask", async (req, res) => {
  try {
    const { title, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//edittask api
router.put("/editTask/:id", async (req, res) => {
  try {
    const { title, email } = req.body;
    console.log("title", title);
    console.log("email", email);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = await List.findByIdAndUpdate(
        req.params.id,
        { title },
        { new: true }
      );

      res.status(200).json({ message: "Task updated", list });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// isCompleted api
router.put("/isComplete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const existingList = await List.findById(id);

      if (existingList) {
        // Toggle the value of isCompleted
        const newIsCompleted = !existingList.isCompleted;

        // Updating the toggle value with the new value
        const updatedList = await List.findByIdAndUpdate(
          id,
          { isCompleted: newIsCompleted },
          { new: true }
        );

        res.json({ message: "Task status updated", updatedList });
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in isComplete route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// api for isEditing
router.put("/isEditing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const existingList = await List.findById(id);

      if (existingList) {
        // Toggle the value of isEditing
        const newIsEditing = !existingList.isEditing;

        // Updating the isEditing value with the new value
        const updatedList = await List.findByIdAndUpdate(
          id,
          { isEditing: newIsEditing },
          { new: true }
        );

        res.json({ message: "Task status updated", updatedList });
      } else {
        res.status(404).json({ message: "List not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in isEditing route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete
router.delete("/deletetask/:id", async (req, res) => {
  try {
    const { email } = req.query;
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      const list = await List.findByIdAndDelete(req.params.id).then(() =>
        res.status(200).json({ message: " task deleted" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//gettask
router.get("/gettask/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
  if (list.length != 0) {
    res.status(200).json({ list});
  } else {
    res.status(200).json({ message: "NO TASK" });
  }
});

module.exports = router;
