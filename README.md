


# Social Network Api
|Javascript  | https://github.com/eogbeide424/Social-Network-API| 
|Walk through link | https://drive.google.com/file/d/1vcWfpuh0R-NM1ITlys7jMTFBrn3osm-B/view?usp=sharing| 

## Description

 In this project we had to create and demonstrate a working Api using mongo Db there were a few challanges I faced like for some reason me and the tutors I approached couldn't figure out why the user route wasn't displaying but the thoughts and all of the the thoughts functionality was there In the walkthrough video I demonstrated how the API functioned I created the models and schema for the users the users thoughts and reactions  the database seeded perfectly even the users  I actually got the all users to respond to the request  when I took off the URI parser but then then rest of the routes stopped responding properly if there was more time I would have taken a deeper look into what happening 

 ```` javascript 
 // this is would be a working get route 

  getAllUsers (req, res) {
        User.find()
         .then((users)=>res.json(users))
            .catch((err)=> res.status(500).json(err));
           
    },
    
    
    // get one user by id

    getSingleUser(req, res){
      
        User.findById({ _id: req.params.userId})
            .select('__v')
            .then((user)=>
              !user
                ? res.status(404).json({message: 'No user found with this id'})
                  : res.json(user)
                    )
                    .catch((err)=> res.status(400).json(err));
    }
````


## Table of Contents (Optional)

If your README is very long, add a table of contents to make it easy for users to find what they need.

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

run npm i to install all the dependencies run npm seed to seed the database and then run npm start to run the server


## Usage 

after installing use insomina to query the database



## Credits

Eugene Ogbeide eogbeide2@gmail.com

## License

MIT

'https://choosealicense.com/licenses/MIT/

undefined



---

🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges


https://img.shields.io/badge/license-MIT-red

## Questions
If any questions on how to use the app you can email me at eogbeide2@gmail.com

© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
