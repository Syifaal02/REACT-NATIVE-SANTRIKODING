const { body, check } = require("express-validator");

const validatePost = [

    check("image")
        .custom((value, { req }) => {

            // image wajib hanya ketika membuat novel baru
            if (req.method === "POST" && !req.file) {
                throw new Error("Cover image is required");
            }

            return true;
        }),

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Novel content is required"),

    body("chapter")
        .trim()
        .notEmpty()
        .withMessage("Chapter is required"),
];

module.exports = {
    validatePost,
};