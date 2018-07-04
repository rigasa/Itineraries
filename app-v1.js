/*
 * YABE - Yet Another Blog Engine
 */
"use strict";

// require the module we need
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// create our application
const app = express();

const Post = require('./models/post.js');
const Prefs = require('./models/prefs.js');
// configuration

// we can require() json files too
app.locals.name = require("./package.json").name; // the application's name
app.locals.port = 3000; // the port our server will listen too

app.locals.connect = function() {
    return mongoose.connect('mongodb://localhost/yabe-dev');
}

// mongoose stuff
mongoose.Promise = global.Promise;

/*app.locals.posts = [ // static array of posts
    { _id: 1, title: "Bacon Avocado Salad", body: "Place bacon in a large..." },
    { _id: 2, title: "Crispy Orange Beef", body: "Lay beef strips out in..." },
    { _id: 3, title: "Simple BBQ Ribs", body: "Place ribs in a large..." },
];*/

// setup

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// callback(err, index, post)
function find_post_with_index_by_id(_id, callback) {
    const i = app.locals.posts.findIndex(post => post._id == _id);
    if (i == -1) {
        const err = new Error("no post with _id=" + _id);
        return callback(err);
    } else {
        const post = app.locals.posts[i];
        return callback( /* no error */ null, i, post);
    }
}

// create a post
app.post("/api/posts", function(req, res) {
    const post_to_create = req.body;
    /* add the given post_to_create to our posts array */
    app.locals.posts.push(post_to_create);
    /* send the newly created post with a 201 Created HTTP status */
    res.status(201 /* Created */ ).send(post_to_create);
});

// read all the posts
app.get("/api/posts", (req, res, next) => {
    /* send all posts with an explicit 200 OK HTTP status */
    //res.status(200 /* OK */ ).send(app.locals.posts);

    Post.find({}).catch(next).then(result => {
        return res.send(result);
    });

});

// read one post
app.get("/api/posts/:id", (req, res, next) => {
    const req_id = req.params.id;
    /* find the requested post in our post array */
    find_post_with_index_by_id(req_id, function(err, index, post_to_read) {
        if (err) {
            /* no post is matching the requested id, return a 404 Not Found HTTP
               status */
            res.status(404 /* Not Found */ ).send();
        } else {
            /* we found the requested post, send it. If we don't set the HTTP
               status explicitely, the default value is 200 OK. */
            res.send(post_to_read);
        }
    });
});

// update
app.put("/api/posts/:id", (req, res) => {
    const req_id = req.params.id;
    const updated_post = req.body;
    find_post_with_index_by_id(req_id, function(err, index, post_to_read) {
        if (err) {
            res.status(404 /* Not Found */ ).send();
        } else if (updated_post._id != req_id) {
            /* here the client sent a suspicious request, providing an id on the
               path that doesn't match the id from the request body. */
            res.status(400 /* Bad Request */ ).send();
        } else {
            /* replace the "old post" by updated_post and send the updated version */
            app.locals.posts[index] = updated_post;
            res.send(updated_post);
        }
    });
});

// partial update
app.patch("/api/posts/:id", (req, res) => {
    const req_id = req.params.id;
    const partial = req.body;
    const post_to_update = app.locals.posts.find(post => post._id == req_id);
    if (!post_to_update) {
        res.status(404 /* Not Found */ ).send();
    } else if ('_id' in partial && partial._id != req_id) {
        res.status(400 /* Bad Request */ ).send();
    } else {
        /* replace each values from post_to_update with the requested ones */
        for (let key in partial)
            post_to_update[key] = partial[key];
        res.send(post_to_update);
    }
});

// destroy
app.delete("/api/posts/:id", (req, res) => {
    const req_id = req.params.id;
    const index = app.locals.posts.findIndex(post => post._id == req_id);
    if (index === -1)
        res.status(404 /* Not Found */ ).send();
    else {
        /* we save the post in a variable, so that we can send it after it has
           been deleted */
        const victim = app.locals.posts[index];
        /* remove 1 item from the array at the index `index' */
        app.locals.posts.splice(index, 1);
        res.send(victim);
    }
});
//----------------------------
// PREFS
//----------------------------
app.get("/api/prefs", (req, res, next) => {
    /* send prefs */
    //res.status(200 /* OK */ ).send(app.locals.posts);

    Prefs.find({}).catch(next).then(result => {
        return res.json(result);
    });

});
//----------------------------
// expose our application to require
//----------------------------
module.exports = app;