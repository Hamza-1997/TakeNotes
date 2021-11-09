const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

console.log(process.argv);
const password = process.argv[2];

// const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;
const url = `mongodb+srv://Hamza123:${password}@cluster0.c8yxe.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Assembly is Easy",
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
