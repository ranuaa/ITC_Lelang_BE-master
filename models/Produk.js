const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    cabang: {
      type: String,
      enum: [
        "Jakarta",
        "Bandung",
        "Medan",
        "Pekanbaru",
        "Pangkal Pinang",
        "Kalimantan",
      ],
      default: "Jakarta",
    },
    nama_produk: {
      type: String,
      required: true,
    },
    photo_path: [],
    harga: {
      type: Number,
      required: true,
    },
    no_lot: {
      type: Number,
      required: true,
    },
    kondisi_mesin: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
    },
    kondisi_exterior: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F"],
    },
    kondisi_interior: {
      type: String,
      enum: ["A", "B", "C", "D", "E", "F", "-"],
    },
    kategori_produk: {
      type: String,
      enum: ["Mobil", "Motor"],
    },
    merk_produk: {
      type: String,
      required: true,
    },
    model_produk: {
      type: String,
      required: true,
    },
    tahun_produk: {
      type: Number,
      required: true,
    },
    transmisi: {
      type: String,
      enum: ["Manual", "Otomatis"],
    },
    no_rangka: {
      type: String,
      required: true,
    },
    no_mesin: {
      type: String,
      required: true,
    },
    kapasitas_mesin: {
      type: Number,
      required: true,
    },
    odometer: {
      type: Number,
      required: true,
    },
    isActive: {
      type: String,
      enum: ["0", "1"],
      default: "1",
    },
    catatan: {
      type: String,
      required: false,
    },
    no_polisi: {
      type: String,
      required: true,
    },
    warna: {
      type: String,
      required: true,
    },
    stnk: {
      type: String,
      enum: ["Ada", "Tidak Ada"],
    },
    exp_stnk: {
      type: String,
      required: true,
    },
    faktur: {
      type: String,
      enum: ["Ada", "Tidak Ada"],
    },
    ktp: {
      type: String,
      enum: ["Ada", "Tidak Ada"],
    },
    kwitansi: {
      type: String,
      enum: ["Ada", "Tidak Ada"],
    },
    form_A: {
      type: String,
      enum: ["Ada", "Tidak Ada"],
    },
    sph: {
      type: String,
      enum: ["Ada", "Tidak Ada", "-"],
    },
    keur: {
      type: String,
      enum: ["Ada", "Tidak Ada", "-"],
    },
    bpkb: {
      type: String,
      enum: ["Ready", "14 hari kerja", "30 hari kerja"],
    },
    mulai: { type: String, required: true },
    selesai: { type: String },
    status_lelang: {
      type: String,
      enum: ["0", "1"],
    },
    favorite: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    bid: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        nominal_bid: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
