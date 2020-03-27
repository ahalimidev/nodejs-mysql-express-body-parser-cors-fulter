const express = require("express");
const db = require("./db.config.js");
const router = express.Router();

router.get("/", (req, res, next) => {
    db.query("SELECT * FROM users", (err, data) => {
        if (!err) {
            res.status(200).json({
                value: "1",
                message: "Berhasil",
                result: data
            });
        } else {
            res.status(404).json({
                value: "0",
                message: "Tidak di temukan"
            });
        }
    })
});

router.get("/:id_user", (req, res, next) => {
    let id = req.params.id_user;
    db.query("SELECT * FROM users where id = ? ", [id], (err, data) => {
        if (!err) {
            if (data && data.length > 0) {
                res.status(200).json({
                    value: "1",
                    message: "Berhasil",
                    result: data
                });
            } else {
                res.status(404).json({
                    value: "0",
                    message: "Tidak di temukan"
                });
            }

        }
    })
});

router.post("/", (req, res, next) => {

    let simpan = {
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        alamat: req.body.alamat
    }

    db.query("INSERT INTO users SET ?", [simpan], (err, data) => {
        if (!err) {
            res.status(200).json({
                value: "1",
                message: "Berhasil"
            });
        } else {
            res.status(404).json({
                value: "0",
                message: "Tidak di tersimpan"
            });
        }
    })
});

router.put("/:id_user", (req, res, next) => {
    let update = {
        nama: req.body.nama,
        jenis_kelamin: req.body.jenis_kelamin,
        alamat: req.body.alamat
    }
    let id = req.params.id_user;

    db.query("UPDATE users SET ? where id = ?", [update, id], (err, data) => {
        if (!err) {
            res.status(200).json({
                value: "1",
                message: "Berhasil"
            });
        } else {
            res.status(404).json({
                value: "0",
                message: "Tidak di terupdate"
            });
        }
    })
});

router.delete("/:id_user", (req, res, next) => {
    let id = req.params.id_user;

    db.query("DELETE FROM users where id = ?", [id], (err, data) => {
        if (!err) {
            res.status(200).json({
                value: "1",
                message: "Berhasil"
            });
        } else {
            res.status(404).json({
                value: "0",
                message: "Tidak terhapus"
            });
        }
    })
});

module.exports = router;