const express        = require('express');
const ensure         = require('connect-ensure-login');
const multer         = require('multer');
const multerS3       = require('multer-s3');
const AWS            = require('aws-sdk');
const path           = require('path');
const Recipe         = require('../models/recipe-model');
const User           = require('../models/user-model');
const recipesRouter  = express.Router();

//************************************************************
// GET LIST OF RECIPES for CATEGORIES
//************************************************************

// get a list of recipes of category Appetizers and Snacks
recipesRouter.get('/salads', 
  // ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  // find all recipe which category Appetizers and Snacks
  Recipe
  .find( { category : 'Season Salad' })
  .limit(4)
  .exec( ( err, recipeList ) => {
    if (err) {
      next(err);
      return;
    }

    // console.log('\n');
    // console.log('************ CATEGORY Season Salad LIST **************');
    // console.log(recipeList);
    // console.log('\n');

    res.render('recipes/salad-list-view.ejs', {
      recipes : recipeList
    });

  });
});

// get a list of recipes of category Appetizers and Snacks
recipesRouter.get('/appetizers-snacks', 
  // ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  // find all recipe which category Appetizers and Snacks
  Recipe
  .find( { category : 'Appetizers and Snacks' })
  .limit(4)
  .exec( ( err, recipeList ) => {
    if (err) {
      next(err);
      return;
    }

    // console.log('\n');
    // console.log('************ CATEGORY Appetizers and Snacks LIST **************');
    // console.log(recipeList);
    // console.log('\n');

    res.render('recipes/appetizer-snack-list-view.ejs', {
      recipes : recipeList
    });

  });
});

// get a list of recipes of category Light super ideas
recipesRouter.get('/light-ideas', 
  // ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  // find all recipe which category Light super ideas
  Recipe
  .find( { category : 'Light super ideas' })
  .limit(4)
  .exec( ( err, recipeList ) => {
    if (err) {
      next(err);
      return;
    }

    // console.log('\n');
    // console.log('************ CATEGORY Light super ideas LIST **************');
    // console.log(recipeList);
    // console.log('\n');

    res.render('recipes/light-ideas-list-view.ejs', {
      recipes : recipeList
    });

  });
});

// get a list of recipes of category Fancy dessert
recipesRouter.get('/fancy-desserts', 
  // ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  // find all recipe which category Fancy dessert
  Recipe
  .find( { category : 'Fancy dessert' })
  .limit(4)
  .exec( ( err, recipeList ) => {
    if (err) {
      next(err);
      return;
    }

    // console.log('\n');
    // console.log('************ CATEGORY FANCY DESSERT LIST **************');
    // console.log(recipeList);
    // console.log('\n');

    res.render('recipes/fancy-desserts-list-view.ejs', {
      recipes : recipeList
    });

  });
});

// get a list of recipes of category Breakfast and Bruch
recipesRouter.get('/breakfast-brunch', 
  // ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  // find all recipe which category Lunch and Dinner
  Recipe
  .find( { category : 'Breakfast and Brunch' })
  .limit(4)
  .exec( ( err, recipeList ) => {
    if (err) {
      next(err);
      return;
    }

    // console.log('\n');
    // console.log('************ CATEGORY BREAKFAST AND BRUNCH LIST **************');
    // console.log(recipeList);
    // console.log('\n');

    res.render('recipes/breakfast-brunch-list-view.ejs', {
      recipes : recipeList
    });

  });
});

// get a list of recipes of category Lunch and Dinner
recipesRouter.get('/lunch-dinner', 
  // ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  // find all recipe which category Lunch and Dinner
  Recipe
  .find( { category : 'Lunch and Dinner' })
  .limit(4)
  .exec( ( err, recipeList ) => {
    if (err) {
      next(err);
      return;
    }

    // console.log('\n');
    // console.log('************ CATEGORY LUNCH AND DINNER LIST **************');
    // console.log(recipeList);
    // console.log('\n');

    res.render('recipes/lunch-dinner-list-view.ejs', {
      recipes : recipeList
    });

  });
});



//************************************************************
// GET && POST NEW RECIPES
//************************************************************
// get new recipe form
recipesRouter.get('/new', 
  ensure.ensureLoggedIn('/login'),

  (req, res, next) => {
    res.render('recipes/new-recipe-view.ejs');
  }
);

// multer to upload profile user picture change to multer s-3
// const myUploader = multer({
//   dest: path.join(__dirname, '../public/upload-recipes')
// });
//************************************************************
// Streaming multer storage engine for AWS S3.
//************************************************************
const accessKeyId       =  process.env.AWS_ACCESS_KEY;
const secretAccessKey   =  process.env.AWS_SECRET_KEY;

AWS.config.update({
    signatureVersion: 'v4',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

const s3 = new AWS.S3();

var cloudStorage = multerS3({
    s3: s3,
    bucket: "the-fork-app-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(request, file, ab_callback) {
        ab_callback(null, {fieldname: file.fieldname});
    },
    key: function(request, file, ab_callback) {
        var newFileName = Date.now() + "-" + file.originalname;
        var fullPath = 'recipes/' + newFileName;
        ab_callback(null, fullPath);
    },
});

var myUploader = multer({
    storage: cloudStorage
});
// ends config multers3
//************************************************************

// post new recipe form
recipesRouter.post('/new', 
  ensure.ensureLoggedIn('/login'),
  // <input type="file" class="filestyle" name="recipePhoto">
  myUploader.single('recipePhoto'),
   
  (req, res, next) => {
    console.log('\n');
    console.log('*********** FILE UPLOAD NEW RECIPE PHOTO');
    console.log(req.file);
    console.log('\n');
    
    console.log('\n');
    console.log('*********** REQ.BODY *************');
    console.log(req.body);
    console.log('\n');

    let categoryInput = '';
    if ( req.body['category-breakfast-brunch'] === 'on' ) {
      categoryInput = 'Breakfast and Brunch';
    } 
    else if ( req.body['category-lunch-dinner'] === 'on') {
      categoryInput = 'Lunch and Dinner';
    }
    else if ( req.body['category-fancy-dessert'] === 'on') {
      categoryInput = 'Fancy dessert';
    }
    else if ( req.body['category-light-ideas'] === 'on') {
      categoryInput = 'Light super ideas';
    }
    else if ( req.body['category-appetizers-snacks'] === 'on') {
      categoryInput = 'Appetizers and Snacks';
    }
    else {
      categoryInput = 'Season Salad';
    }

    //create the new recipe
    const theRecipe = new Recipe({
      owner         :   req.user._id,
      creator       :   req.user.fullName,
      title         :   req.body.recipeTitle,
      photoAddres   :   req.file.location,
      description   :   req.body.recipeDescription,
      ingredients   :   req.body.ingredient,
      instructions  :   req.body.instruction,
      category      :   categoryInput,
      calories      :   req.body['slider-calories'],
      minutes       :   req.body['slider-minutes'],    
    });
    console.log('\n');
    console.log('*********** NEW RECIPE READY TO BE CREATED *************');
    console.log(theRecipe);
    console.log('\n');
    console.log(req.user._id);
    console.log('\n');

    theRecipe.save( (err) => {
      if (err) {
        res.render('recipes/new-recipe-view.ejs', {
        validationErrors: theRecipe.errors
        });
        return;      
      }

      res.redirect('/');

    });

  }
);

//************************************************************
// GET USER recipe list
//************************************************************
recipesRouter.get('/my-recipes',
  ensure.ensureLoggedIn('/login'),

  (req, res, next) => {
    Recipe.find(
      { owner : req.user._id },

      (err, recipeList) => {
        if (err) {
          next(err);
          return;
        }

        res.render('users/my-recipes-list-view.ejs',
          { recipes : recipeList  ,
            successMessage: req.flash('success')
          }
        );
      }
    );
  }
);

//************************************************************
// GET RECIPE DETAILS from recipe list
//************************************************************
/*
  !!IMPORTANT:
  This routes display the details of the recipe, in order to 
  show the picture of the recipe's creator I made a double
  query to the DB the first one to find the recipe and 
  from that one using the "recipe.creator" value then make
  a second query over the User model to match 
  fullName = recipe.creator. Then I get the user that created
  that recipe and access his/her profile picture if exists.
*/
recipesRouter.get('/:id', (req, res, next) => {

  const recipeId = req.params.id;
  var theRecipe = '';
  var theUser = '';

  Recipe.findById(recipeId, (err, theRecipe) => {
    if (err) {                        
      next(err);              
      return;                                             
    }      

    User.findOne(
      { fullName : theRecipe.creator },

      (err, theUser) => {
        if (err) {                        
          next(err);              
          return;                                             
        }      

        // theUser = theUser;
        console.log('\n');
        console.log('************* OUTPUT THE RECIPE **********');
        console.log(theRecipe.creator);
        console.log('\n');
        console.log('************* OUTPUT THE USER **********');
        console.log(theUser.photoAddress);
        console.log('\n');
        
        res.render('recipes/recipe-details-view.ejs',
          { 
            recipe        : theRecipe,
            recipeCreator : theUser,
          }
        );
      }
    );    
  }); 
});

//************************************************************
// POST TO DELETE A RECIPE from the user list
//************************************************************
recipesRouter.post('/:id/delete', (req, res, next) => {
  const recipeId = req.params.id;

  // db.products.deleteOne({ _id: productId })
  Recipe.findByIdAndRemove(recipeId, (err, theRecipe) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/recipes/my-recipes');
  });
});










module.exports = recipesRouter;