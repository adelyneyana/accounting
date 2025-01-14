const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/vat_calculation', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const VatSchema = new mongoose.Schema({
  sales: Number,
  purchases: Number,
  vatRate: Number,
  outputVAT: Number,
  inputVAT: Number,
  vatPayable: Number,
});

const Vat = mongoose.model('Vat', VatSchema);

app.post('/api/calculate', async (req, res) => {
  const { sales, purchases, vatRate } = req.body;
  const outputVAT = (sales * vatRate) / 100;
  const inputVAT = (purchases * vatRate) / 100;
  const vatPayable = outputVAT - inputVAT;

  const vatData = new Vat({
    sales,
    purchases,
    vatRate,
    outputVAT,
    inputVAT,
    vatPayable,
  });
  await vatData.save();

  res.json({ outputVAT, inputVAT, vatPayable });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
