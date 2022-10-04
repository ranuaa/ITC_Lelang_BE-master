
const ProdukModel = require("../models/Produk");
const UploadFile = require("../middleware/upload")

const createProduct = async (req, res) => {

  const fileName = req.files.map((path) => {
    return path.filename
  })
  let {photo_path, ...details} = req.body
  photo_path = `/uploads/${fileName}`
  const dat = {...details, photo_path}
  const newData = new ProdukModel(dat)
try {
  const Data = await newData.save()
  res.status(200).json({
    Data: Data
  })
} catch (error) {
  res.status(500).json(error.message)
}
};


const getProducts = async (req, res) => {
  try {
    const product = await ProdukModel.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProdukModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    cabang,
    nama_produk,
    photo_produk,
    harga,
    no_lot,
    kondisi_mesin,
    kondisi_exterior,
    kondisi_interior,
    kategori_produk,
    merk_produk,
    model_produk,
    tahun_produk,
    transmisi,
    no_rangka,
    no_mesin,
    kapasitas_mesin,
    odometer,
    isActive,
    catatan,
    no_polisi,
    warna,
    stnk,
    exp_stnk,
    faktur,
    ktp,
    kwitansi,
    form_A,
    sph,
    keur,
    bpkb,
    tanggal_mulai,
    tanggal_selesai,
    status_lelang,
  } = req.body;

  try {
    const formUpdateProduk = {
      cabang,
      nama_produk,
      photo_produk,
      harga,
      no_lot,
      kondisi_mesin,
      kondisi_exterior,
      kondisi_interior,
      kategori_produk,
      merk_produk,
      model_produk,
      tahun_produk,
      transmisi,
      no_rangka,
      no_mesin,
      kapasitas_mesin,
      odometer,
      isActive,
      catatan,
      no_polisi,
      warna,
      stnk,
      exp_stnk,
      faktur,
      ktp,
      kwitansi,
      form_A,
      sph,
      keur,
      bpkb,
      tanggal_mulai,
      tanggal_selesai,
      status_lelang,
      _id: id,
    };
    await ProdukModel.findByIdAndUpdate(id, formUpdateProduk, { new: true });
    res.json(formUpdateProduk);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await ProdukModel.findByIdAndRemove(id);
    res.json({ message: "Produk Deleted Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
