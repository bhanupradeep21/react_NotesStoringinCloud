const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const User  = require('../models/User');
const {body,validationResult} = require('express-validator');

// Route 1: Get all the notes using: Get "/api/auth/getuser".  login Required

router.get('/fetchallnotes',fetchUser,async (req,res)=>{
    try {
    const notes = await Notes.find({user:req.user.id})
    res.json(notes)
    } 
    catch (err) {
        console.log(err)
        res.status(500).send('Internal server error occured')
    }
    
})

// Route 2: Add a new note using: Post "/api/auth/addnote". Login required

router.post('/addnotes',fetchUser,[

    body('title','enter a valid title').isLength({min:3}),
    body('password','password must contains atleast 5 characters').isLength({min:5})
],async (req,res)=>{
    try {
    const {title,description,tag} = req.body;
    const note = new Notes({title,description,tag,user:req.user.id})
    const savedNote = await note.save()
    console.log("New Note Added Succesfully")
    res.json(savedNote)
    
}
catch (err) {console.log(err)
    res.status(500).send('Internal server error occured')}

})

// Route 3: update a note using: put "/api/auth/updatenote". Login required

router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    const {title,description,tag} = req.body
    const newNote = {}
    if (title){
        newNote.title = title
     }
    if (description){
        newNote.description = description
    }
    if (tag){
        newNote.tag = tag
    }
    let note = await Notes.findById(req.params.id);

    console.log(note)

    if (!note){
        return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    note.save()
    res.json({note})
})

// Route 4: delete a note using: put "/api/auth/deletenote". Login required

router.delete('/deletenote/:id',fetchUser,async (req,res)=>{

     let note = await Notes.findById(req.params.id);

     if (!note){
        return res.status(404).send('nothing to delete');
     }
     if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    try {
     note = await Notes.findByIdAndDelete(req.params.id)
     res.json({"Success":"Successfully deleted the note"});
    } catch (err) {console.log(err)
        res.status(500).send('Internal server error occured')}
    
})


module.exports = router;