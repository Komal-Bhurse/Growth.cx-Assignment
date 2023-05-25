const User = require("../models/user");
const { setUser } = require("../service/auth");
const axios = require('axios')
const cheerio = require('cheerio')

const handleSignUp = async (req, res) => {
  const data = req.body;

    const result = await User.create({
      UserName: data.name,
      Email: data.email,
      Password: data.password,
    });

    return res.status(201).json({ massage: "sucsess" });
};

const handleSignIn = async (req, res) => {
  const { Email, Password } = req.body;
  
    const user = await User.matchPassword(Email, Password);
    if (!user) {
      return res.json({ massage: "plese enter valid email or password" });
    }

    const token = setUser(user);
  
    res.cookie("uuid",token);
    return res.json({user});
};

const handleLogout = (req, res) => {
  res.clearCookie("uuid");
  res.send({ massage: "logout successfull" });
};

const handleGetUrlInsights = async(req,res) =>{
     const url = req.body.url
      let response;
     try {
       response = await axios.get(url)
     } catch (error) {
      return res.json({massage:"please enter a correct URl exp:https://example.com"})
     }
     const html = response.data;
    // Load the HTML into Cheerio
    const $ = cheerio.load(html);
    // Extract the text content from the HTML
    const text = $('body').text();
    // Count the words
    const wordCount = text.trim().split(/\s+/).length;
     //store data from the database
     const resp = await User.updateMany(
      {
        _id: req.user._id,
      },
      {
        $push: {
          domain: {
            name:url,
            wordCount,
          },
        },
      }
    );
   return res.end()
}

const handleGetUrls = async(req,res)=>{
    const data = await User.find({_id:req.user._id})
    return res.send(data)
}

const handleDelete = async(req,res)=>{
      const response = await User.updateMany(
        {
          _id: req.user._id,
        },
        {
          $pull: {
            domain: {
              _id:req.params.id,
            },
          },
        }
      );
      return res.json({ massage: "removed" });
}

const handleUpdateFavouriteStatus = async(req,res)=>{
  const response = await User.findOneAndUpdate(
    {
       _id: req.user._id, 
       'domain._id': req.params.id
    }, 
    { 
      $set: { 
        'domain.$.favourite': 'true' 
        } 
    }, 
    { new: true } 
  )
 res.json({massage:"update"})
}

module.exports = {
  handleSignUp,
  handleSignIn,
  handleLogout,
  handleGetUrlInsights,
  handleGetUrls,
  handleDelete,
  handleUpdateFavouriteStatus,
};