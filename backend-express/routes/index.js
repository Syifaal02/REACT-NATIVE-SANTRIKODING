const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");

const { validatePost } = require("../utils/validators/post");

const postController = require("../controllers/PostController");


// GET ALL
router.get(
    "/posts",
    postController.findPosts
);


// CREATE
router.post(
    "/posts",
    upload.single("image"),
    validatePost,
    postController.createPost
);


// GET BY ID
router.get(
    "/posts/:id",
    postController.findPostById
);


// UPDATE
router.put(
    "/posts/:id",
    upload.single("image"),
    validatePost,
    postController.updatePost
);


// DELETE
router.delete(
    "/posts/:id",
    postController.deletePost
);


module.exports = router;