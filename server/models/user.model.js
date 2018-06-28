const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoicesSchema = new Schema({
    year: String,
    month: String
}, { collection: 'invoices' });

module.exports = mongoose.model('invoices', invoicesSchema);