const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const recipeSchema = new Schema({
    owner: {
      type     : Schema.Types.ObjectId,
    },
    creator: {
      type     : String,
    },
    title: {
      type     : String, 
      required : [ true, 'Please, enter title' ]
    },
    photoAddres: {
      type     : String,
    },
    description: {
      type     : String,
      required : [ true, 'Please, enter a brief description'] 
    },
    ingredients: {
      type     : [ String ],
      required : [ true, 'Please, enter an ingredient'] 
    },
    instructions: {
      type     : [ String ],
      required : [ true, 'Please, enter an instruction' ]
    },
    category: {
      type     : String,
      enum     : [ 'Breakfast and Brunch', 'Lunch and Dinner',
                   'Fancy dessert', 'Light super ideas',
                   'Appetizers and Snacks', 'Season Salad' ],
      required : [ true, 'Please, enter a category' ]
    },
    calories: {
      type     : Number,
    },
    minutes: {
      type     : Number,
    }
},
    {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" 
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;