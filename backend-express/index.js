const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;


// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));


// static uploads (path absolut supaya aman dari folder mana pun server dijalankan)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// routes
const router = require("./routes");

app.use("/api", router);


// test root
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend Express API is running",
    });
});


// start server (0.0.0.0 = bisa diakses dari HP lewat Wi-Fi)
app.listen(port, "0.0.0.0", () => {
    console.log(`Server started on port ${port}`);
    console.log(`Akses dari HP: http://192.168.101.9:${port}/api/posts`);
});