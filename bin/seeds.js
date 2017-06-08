// bin/seeds.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dev_recipe');
const Recipe = require('../models/recipe-model');

const recipes = [
    {
        creator      : 'Chef John',
        title        : 'No-Fuss Snack Mix Chicken',
        photoAddres  : '/img-recipes/Little Lamb Meatballs in a Spicy Eggplant Tomato Sauce.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Lunch and Dinner',
        calories     : 426,
        minutes      : 120
    },
    {
        creator      : 'Dolce Cuoco',
        title        : 'Greek Island Chicken Shish Kebabs',
        photoAddres  : '/img-recipes/Greek Island Chicken Shish Kebabs.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Lunch and Dinner',
        calories     : 526,
        minutes      : 90
    },
    {
        creator      : 'MARBALET',
        title        : 'Asian Beef with Snow Peas',
        photoAddres  : '/img-recipes/Asian Beef with Snow Peas.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Lunch and Dinner',
        calories     : 326,
        minutes      : 45
    },
    {
        creator      : 'DEBNJAMES',
        title        : 'Pasta Pomodoro',
        photoAddres  : '/img-recipes/Pasta Pomodoro.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Lunch and Dinner',
        calories     : 226,
        minutes      : 20
    },
    {
        creator      : 'Skoo',
        title        : 'Grilled Chicken with Rosemary and Bacon',
        photoAddres  : '/img-recipes/Grilled Chicken with Rosemary and Bacon.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Lunch and Dinner',
        calories     : 255,
        minutes      : 55
    },
    {
        creator      : 'CHEDDAR97005',
        title        : 'Lemon Rosemary Salmon',
        photoAddres  : '/img-recipes/Lemon Rosemary Salmon.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Lunch and Dinner',
        calories     : 300,
        minutes      : 70
    },
    {
        creator      : 'alycimo',
        title        : 'Eggs Benedict Casserole',
        photoAddres  : '/img-recipes/Eggs Benedict Casserole.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Breakfast and Brunch',
        calories     : 281,
        minutes      : 100
    },
    {
        creator      : 'dakota kelly',
        title        : 'Good Old Fashioned Pancakes',
        photoAddres  : '/img-recipes/Good Old Fashioned Pancakes.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Breakfast and Brunch',
        calories     : 158,
        minutes      : 20
    },
    {
        creator      : 'JOYCE',
        title        : 'Bacon for the Family or a Crowd',
        photoAddres  : '/img-recipes/Bacon for the Family or a Crowd.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Breakfast and Brunch',
        calories     : 203,
        minutes      : 20
    },
    {
        creator      : 'Bonnie',
        title        : 'Fluffy French Toast',
        photoAddres  : '/img-recipes/Fluffy French Toast.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Breakfast and Brunch',
        calories     : 123,
        minutes      : 30
    },
    {
        creator      : 'Matt D',
        title        : 'Black Bean Breakfast Bowl',
        photoAddres  : '/img-recipes/Black Bean Breakfast Bowl.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Breakfast and Brunch',
        calories     : 625,
        minutes      : 15
    },
    {
        creator      : 'M.K. Meredith',
        title        : 'Christmas Breakfast Sausage Casserole',
        photoAddres  : '/img-recipes/Christmas Breakfast Sausage Casserole.jpg',
        description  : 'Lorem ipsum dolor sit amet, duo fugit sapientem ea. Sit mutat aliquam an, idque argumentum cu eum. Ex eum veniam lucilius. An vim gubergren quaerendum.',
        ingredients  : [
                         '1 eggplant',
                         '1/3 cup finely minced onion' ,
                         '1 1/2 cups chicken broth' ,
                         '1 tablespoon chopped fresh mint' 
                       ],
        instructions : [
                          'Preheat the oven to 450 degrees F (230 degrees C).',
                          'Mix in minced onion and red pepper flakes. Reduce heat to medium; cook and stir until onion softens, 4 minutes.',
                          'Crumble lamb into bread crumb spice mixture; stir in cayenne pepper.',
                          'Garnish with chopped fresh mint.'
                       ],
        category     : 'Breakfast and Brunch',
        calories     : 377,
        minutes      : 360
    }
    
]; //end recipies

//******************************************************
// SAVING RECIPE TO DATABASE
//******************************************************
Recipe.create(recipes, (err, recipeDocs) => {
  if (err) {
    throw err;
  }

  // console the result
  recipeDocs.forEach( (oneRecipe) => {
      console.log(`NEW RECIPE SAVED => ${oneRecipe.title} -> ${oneRecipe._id}`);
  }, this);
  // close connection to db
  mongoose.connection.close();
});