const express = require("express");
const router = express.Router();
const multer = require('multer')
const up = multer({dest: 'public/uploads/', })

const { check, validationResult } = require("express-validator");

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const User = require("../models/users");
const Profile = require("../models/profile");
const Produk = require("../models/Produk");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/Produk");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
// router.post(
//   "/",
//   [
//     auth,
//     [
//       check("cabang", "Cabang is required").not().isEmpty(),
//       check("nama_produk", "Nama Produk is required").not().isEmpty(),
//       check("harga", "Harga is required").not().isEmpty(),
//       check("no_lot", "No Lot is required").not().isEmpty(),
//       check("kategori_produk", "Kategori Produk is required").not().isEmpty(),
//       check("kondisi_mesin", "Kondisi Mesin is required").not().isEmpty(),
//       check("kondisi_exterior", "Kondisi Exterior is required").not().isEmpty(),
//       check("kategori_produk", "Kategori is required").not().isEmpty(),
//       check("merk_produk", "Merk Produk is required").not().isEmpty(),
//       check("model_produk", "Model Produk is required").not().isEmpty(),
//       check("tahun_produk", "Tahun Produk is required").not().isEmpty(),
//       check("transmisi", "Transmisi is required").not().isEmpty(),
//       check("no_rangka", "No Rangka is required").not().isEmpty(),
//       check("no_mesin", "No Mesin is required").not().isEmpty(),
//       check("kapasitas_mesin", "Kapasitas Mesin is required").not().isEmpty(),
//       check("odometer", "Odometer is required").not().isEmpty(),
//       check("no_polisi", "Nomor Polisi is required").not().isEmpty(),
//       check("warna", "Warna is required").not().isEmpty(),
//       check("stnk", "STNK is required").not().isEmpty(),
//       check("exp_stnk", "Expired STNK is required").not().isEmpty(),
//       check("faktur", "Faktur STNK is required").not().isEmpty(),
//       check("ktp", "KTP is required").not().isEmpty(),
//       check("kwitansi", "Kwitansi is required").not().isEmpty(),
//       check("form_A", "Form A is required").not().isEmpty(),
//       check("sph", "SPH is required").not().isEmpty(),
//       check("keur", "KEUR is required").not().isEmpty(),
//       check("bpkb", "BPKB is required").not().isEmpty(),
//     ],
//   ],
//   upload.single("photo_path"),
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     createProduct(req, res);

//     try {
//       const user = await User.findById(req.user.id).select("-password");

//       const newProduk = {
//         user: req.user.id,
//         cabang: req.body.cabang,
//         nama_produk: req.body.nama_produk,
//         harga: req.body.harga,
//         no_lot: req.body.no_lot,
//         kondisi_mesin: req.body.kondisi_mesin,
//         kondisi_exterior: req.body.kondisi_exterior,
//         kondisi_interior: req.body.kondisi_interior,
//         kategori_produk: req.body.kategori_produk,
//         merk_produk: req.body.merk_produk,
//         model_produk: req.body.model_produk,
//         tahun_produk: req.body.tahun_produk,
//         transmisi: req.body.transmisi,
//         no_rangka: req.body.no_rangka,
//         no_mesin: req.body.no_mesin,
//         kapasitas_mesin: req.body.kapasitas_mesin,
//         odometer: req.body.odometer,
//         isActive: req.body.isActive,
//         catatan: req.body.catatan,
//         no_polisi: req.body.no_polisi,
//         warna: req.body.warna,
//         stnk: req.body.stnk,
//         exp_stnk: req.body.exp_stnk,
//         faktur: req.body.faktur,
//         ktp: req.body.ktp,
//         kwitansi: req.body.kwitansi,
//         form_A: req.body.form_A,
//         sph: req.body.sph,
//         keur: req.body.keur,
//         bpkb: req.body.bpkb,
//         mulai: req.body.mulai,
//         selesai: req.body.selesai,
//         status_lelang: req.body.status_lelang,
//         photo_path: req.body.image,
//       };

//       // if (req.file) {
//       //   newProduk.photo_path = req.file.path;
//       // }

//       const produk = new Produk(newProduk);
//       res.json(produk);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );
router.post("/", upload.any('photo_path'), createProduct);

module.exports = router;
