const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("success")}).catch((error) => {
    console.error('MongoDB connection error:', error);
});


const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

// 2. Create Model
const Person = mongoose.model('Person', personSchema);

// 3. Implement the function
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "adammosaad03",
    age: 25,
    favoriteFoods: ["pizza"]
  });

  person.save()
    .then(savedData => {
      done(null, savedData);
    })
    .catch(err => {
      done(err);
    });
};
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then(savedPeople => {
      done(null, savedPeople);
    })
    .catch(err => {
      done(err);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName })
    .then(foundPeople => {
      done(null, foundPeople);
    })
    .catch(err => {
      done(err);
    });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food })
    .then(foundPerson => {
      done(null, foundPerson);
    })
    .catch(err => {
      done(err);
    });
};

const findPersonById = (personId, done) => {
  Person.findById(personId)
    .then(foundPerson => {
      done(null, foundPerson);
    })
    .catch(err => {
      done(err);
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId)
    .then(person => {
      if (!person) {
        return done(null, null);
      }
      
      // Add hamburger to favoriteFoods
      person.favoriteFoods.push(foodToAdd);

      // Save the updated person
      return person.save();
    })
    .then(updatedPerson => {
      done(null, updatedPerson);
    })
    .catch(err => {
      done(err);
    });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName }, // condition
    { age: ageToSet },    // update
    { new: true }         // options - return updated document
  )
    .then(updatedPerson => {
      done(null, updatedPerson);
    })
    .catch(err => {
      done(err);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
    .then(removedPerson => {
      done(null, removedPerson);
    })
    .catch(err => {
      done(err);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.deleteMany({ name: nameToRemove })
    .then(result => {
      done(null, result);
    })
    .catch(err => {
      done(err);
    });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec()
    .then(people => {
      done(null, people);
    })
    .catch(err => {
      done(err);
    });
};


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
