const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const methodOverride = require('method-override'); // Add this line

// Middleware to support PUT and DELETE methods
router.use(methodOverride('_method')); // This line allows overriding methods in forms

// INDEX ROUTE
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.render('index', { title: 'All Blog Posts', blogs: blogs });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});


// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('new', { title: 'Create New Blog' });
});

// CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        await Blog.create(req.body.blog);
        res.redirect('/blogs');
    } catch (err) {
        res.render('new', { title: 'Create New Blog' });
    }
});

// SHOW ROUTE
router.get('/:id', async (req, res) => {
    try {
        const foundBlog = await Blog.findById(req.params.id);
        res.render('show', {
            title: foundBlog.title,
            blog: foundBlog,
            success: req.query.success === 'true'
        });
    } catch (err) {
        res.redirect('/blogs');
    }
});

// EDIT ROUTE
router.get('/:id/edit', async (req, res) => {
    try {
        const foundBlog = await Blog.findById(req.params.id);
        res.render('edit', { title: 'Edit Blog Post', blog: foundBlog });
    } catch (err) {
        res.redirect('/blogs');
    }
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
        res.redirect(`/blogs/${req.params.id}?success=true`);
    } catch (err) {
        res.redirect(`/blogs/${req.params.id}?success=false`);
    }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.findByIdAndDelete(id);
        console.log(`Blog with ID ${id} deleted`);
        res.redirect('/blogs'); // Redirect to the list of blogs after deletion
    } catch (err) {
        console.error(err);
        res.redirect('/blogs'); // Redirect even if an error occurs
    }
});





module.exports = router;
