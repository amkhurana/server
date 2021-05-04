import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages =  await PostMessage.find();
        console.log(postMessages.length);
        res.status(200).json(postMessages);
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    try {
        const newPost = new PostMessage(post);
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(err) {
        res.status(409).json({message: err.message});
    }
}

export const updatePost = async(req,res) => {
    const {id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`no post with that id ${id}`);
    
    const updatePost = await PostMessage.findByIdAndUpdate(id, {...post, id}, {new: true});

    res.json(updatePost);
}

export const deletePost = async(req,res) => {
    const {id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`no post with that id ${id}`);
    
        console.log('DELETE');
    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted'});
}

export const likePost = async(req,res) => {
    const {id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`no post with that id ${id}`);
    
        console.log('DELETE');
    const post = await PostMessage.findById(id);
    console.log(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true});

    res.json(updatePost);
}