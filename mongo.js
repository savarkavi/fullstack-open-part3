const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("password is required");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://sushant:${password}@cluster0.4fi4jfa.mongodb.net/phonebookdb?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
} else {
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
