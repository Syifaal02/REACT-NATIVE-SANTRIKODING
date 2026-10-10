const prisma = require("../prisma/client");

const { validationResult } = require("express-validator");

const fs = require("fs");

const path = require("path");


// =================================================
// GET ALL NOVELS
// =================================================
const findPosts = async (req, res) => {

    try {

        const posts = await prisma.post.findMany({

            select: {
                id: true,
                image: true,
                title: true,
                author: true,
                synopsis: true,
                content: true,
                chapter: true,
                totalPages: true,
                rating: true,
                createdAt: true,
                updatedAt: true,
            },

            orderBy: {
                id: "desc",
            },

        });


        return res.status(200).json({

            success: true,

            message: "Get all novels successfully",

            data: posts,

        });


    } catch (error) {

        console.error("ERROR GET NOVELS:", error);

        return res.status(500).json({

            success: false,

            message: "Internal server error",

            error: error.message,

        });

    }

};


// =================================================
// CREATE NOVEL
// =================================================
const createPost = async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        return res.status(422).json({

            success: false,

            message: "Validation error",

            errors: errors.array(),

        });

    }


    try {

        if (!req.file) {

            return res.status(422).json({

                success: false,

                message: "Cover image is required",

            });

        }


        const post = await prisma.post.create({

            data: {

                image: req.file.filename,

                title: req.body.title,

                author: req.body.author,

                synopsis: req.body.synopsis || "",

                content: req.body.content,

                chapter: req.body.chapter,

                totalPages: Number(req.body.totalPages || 1),

                rating: Number(req.body.rating || 4.5),

            },

        });


        return res.status(201).json({

            success: true,

            message: "Novel created successfully",

            data: post,

        });


    } catch (error) {

        console.error("ERROR CREATE NOVEL:", error);

        return res.status(500).json({

            success: false,

            message: "Internal server error",

            error: error.message,

        });

    }

};


// =================================================
// GET NOVEL BY ID
// =================================================
const findPostById = async (req, res) => {

    const id = Number(req.params.id);


    if (Number.isNaN(id)) {

        return res.status(400).json({

            success: false,

            message: "Invalid novel ID",

        });

    }


    try {

        const post = await prisma.post.findUnique({

            where: {
                id,
            },

        });


        if (!post) {

            return res.status(404).json({

                success: false,

                message: `Novel with ID ${id} not found`,

            });

        }


        return res.status(200).json({

            success: true,

            message: `Get novel by ID ${id}`,

            data: post,

        });


    } catch (error) {

        console.error("ERROR GET NOVEL:", error);

        return res.status(500).json({

            success: false,

            message: "Internal server error",

            error: error.message,

        });

    }

};


// =================================================
// UPDATE NOVEL
// =================================================
const updatePost = async (req, res) => {

    const id = Number(req.params.id);


    if (Number.isNaN(id)) {

        return res.status(400).json({

            success: false,

            message: "Invalid novel ID",

        });

    }


    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        return res.status(422).json({

            success: false,

            message: "Validation error",

            errors: errors.array(),

        });

    }


    try {

        const oldPost = await prisma.post.findUnique({

            where: {
                id,
            },

        });


        if (!oldPost) {

            return res.status(404).json({

                success: false,

                message: `Novel with ID ${id} not found`,

            });

        }


        const dataPost = {

            title: req.body.title,

            author: req.body.author,

            synopsis: req.body.synopsis || "",

            content: req.body.content,

            chapter: req.body.chapter,

            totalPages: Number(req.body.totalPages || 1),

            rating: Number(req.body.rating || 4.5),

        };


        if (req.file) {

            dataPost.image = req.file.filename;


            if (oldPost.image) {

                const oldImagePath = path.join(

                    process.cwd(),

                    "uploads",

                    oldPost.image

                );


                if (fs.existsSync(oldImagePath)) {

                    fs.unlinkSync(oldImagePath);

                }

            }

        }


        const post = await prisma.post.update({

            where: {
                id,
            },

            data: dataPost,

        });


        return res.status(200).json({

            success: true,

            message: "Novel updated successfully",

            data: post,

        });


    } catch (error) {

        console.error("ERROR UPDATE NOVEL:", error);

        return res.status(500).json({

            success: false,

            message: "Internal server error",

            error: error.message,

        });

    }

};


// =================================================
// DELETE NOVEL
// =================================================
const deletePost = async (req, res) => {

    const id = Number(req.params.id);


    try {

        const post = await prisma.post.findUnique({

            where: {
                id,
            },

        });


        if (!post) {

            return res.status(404).json({

                success: false,

                message: `Novel with ID ${id} not found`,

            });

        }


        if (post.image) {

            const imagePath = path.join(

                process.cwd(),

                "uploads",

                post.image

            );


            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);

            }

        }


        await prisma.post.delete({

            where: {
                id,
            },

        });


        return res.status(200).json({

            success: true,

            message: "Novel deleted successfully",

        });


    } catch (error) {

        console.error("ERROR DELETE NOVEL:", error);

        return res.status(500).json({

            success: false,

            message: "Internal server error",

            error: error.message,

        });

    }

};


module.exports = {

    findPosts,

    createPost,

    findPostById,

    updatePost,

    deletePost,

};