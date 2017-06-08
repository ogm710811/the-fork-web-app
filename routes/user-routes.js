const express       = require('express');
const ensure        = require('connect-ensure-login');
const bcrypt        = require('bcrypt');
const User          = require('../models/user-model.js');
const Recipe        = require('../models/recipe-model');
const multer        = require('multer');
const multerS3      = require('multer-s3');
const AWS           = require('aws-sdk');
const path          = require('path');
const userRouter    = express.Router();

//************************************************************
// GET USER PROFILE
//************************************************************

userRouter.get('/my-profile',
    ensure.ensureLoggedIn('/login'),

    (req, res, next) => {
        Recipe
        .find({ owner : req.user._id },
          (err, recipeList) => {
            if (err) {
                next(err);
                return;
            }

            let categories          = [];
            let breakfastBrunch     = 0;
            let lunchDinner         = 0;
            let fancyDessert        = 0;
            let lightIdeas          = 0;
            let appetizersSnacks    = 0;
            let seasonSalad         = 0;

            recipeList.forEach(function(oneRecipe) {
                switch (oneRecipe.category) {
                    case 'Breakfast and Brunch':
                        breakfastBrunch++;
                        break;
                    case 'Lunch and Dinner':
                        lunchDinner++;
                        break;
                    case 'Fancy dessert':
                        fancyDessert++;
                        break;
                    case 'Light super ideas':
                        lightIdeas++;
                        break;
                    case 'Appetizers and Snacks':
                        appetizersSnacks++;
                        break;
                    case 'Season Salad':
                        seasonSalad++;
                        break;
                    default:
                        break;
                    }
                categories.push(breakfastBrunch, lunchDinner, fancyDessert, lightIdeas, appetizersSnacks, seasonSalad);
            }, this);

            console.log('\n');
            console.log('************* THE RECIPE AT PROFILE **************');
            console.log(`recipe length  => ${recipeList.length}`);
            console.log(`category array => ${categories}`);
            console.log('\n');

            res.render('users/user-profile-view.ejs',
                { 
                    successMessage: req.flash('success'),
                    recipeList : recipeList,
                    categories : categories
                }
            );               
          }
        );      
    }
);


//************************************************************
// GET && POST EDIT USER PROFILE
//************************************************************
userRouter.get('/edit-profile',
    ensure.ensureLoggedIn('/login'),

    (req, res, next) => {
        res.render('users/user-edit-profile-view.ejs',
           { successMessage: req.flash('success') }
        );
    }
);

// multer to upload profile user picture
// const myUploader = multer({
//   dest: path.join(__dirname, '../public/upload-users')
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
        var fullPath = 'users/' + newFileName;
        ab_callback(null, fullPath);
    },
});

var myUploader = multer({
    storage: cloudStorage
});

// ends config multers3
//************************************************************

userRouter.post('/edit-profile',
    ensure.ensureLoggedIn('/login'),

    // get picture from the form
    myUploader.single('profilePicture'),
    //myUploader.array('profilePicture', 1),

    (req, res, next) => {
        // log for picture profile object
        // console.log('\n');
        // console.log('*********** FILE UPLOAD PROFILE PICTURE');
        // console.log(req.file);
        // console.log('\n');

        const profileFullName       = req.body.updateFullName;
        const profileUsername       = req.body.updateUsername;
        const currentPassword       = req.body.currentPassword;
        const newPassword           = req.body.updatePassword;
        const introProfile          = req.body.updateIntro;

        // update req.user photAddress with the file uploaded by Multer-s3
        //*******IMPORTANT : since the upload picture is save in AWS 3
        // we doesn't need save it in a file
        //req.user.photoAddress       = `/upload-users/${req.file.key}`; 
        //

        // Don't let users submit blank usernames or passwords
        if (profileFullName === '' || profileUsername === '' || 
            currentPassword === '' || newPassword === '') {
            res.render('users/user-edit-profile-view.ejs', {
                errorMessage: 'Please provide your credentials.'
            });
            return;
        }
        
        User.findOne(
            { username : profileUsername },
            { username : 1 },

            (err, foundUser) => {
                if (err) {
                  next(err);
                  return;
                }

                if (foundUser) {
                  res.render('users/user-edit-profile-view.ejs',
                    { errorMessage: 'User not Available, Try again' ,
                      errorMessageLogin: ''
                  });
                  return;
                }

                // if both passwords are filled and the current password is correct
                if ( currentPassword && newPassword &&
                     bcrypt.compareSync(currentPassword, req.user.encryptedPassword)) {
                    // add new encryptedPassword to the updates
                    const salt = bcrypt.genSaltSync(10);
                    const hashPass = bcrypt.hashSync(newPassword, salt);
                    
                    // update user with new profile info
                    req.user.fullName           = profileFullName;
                    req.user.username           = profileUsername;
                    req.user.encryptedPassword  = hashPass; 
                    req.user.introProfile       = introProfile;  
                    req.user.photoAddress       = req.file.location;                 
                }
                console.log('\n');
                console.log('************* REQ.USER UPDATED ******************');
                console.log(req.user);
                console.log('\n');
                
                
                console.log('************* REQ.FILE UPLOAD TO AWS3 ******************');
                console.log(req.file.location);
                console.log(req.user.photoAddress);
                let file = req.file;
                
                req.user.save((err) => {
                    if (err) {
                      next(err);
                      return;
                    }

                    req.flash('success', 'Your Profile was updated succesfully');

                    res.redirect('/user/my-profile');
                });
            }
        );// end User.findOne querry
        
    }// end callback
    
);// end router.post

module.exports = userRouter;