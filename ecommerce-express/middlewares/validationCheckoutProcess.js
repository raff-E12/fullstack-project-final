const validator = require("validator");
const countries = require("../data/countries"); // Assuming this file exports an array of country names

const validationCheckoutProcess = (req, res, next) => {
  const { name, surname, email, phone, amount, billing_address, shipping_address, country } = req.body;
  console.log(req.body);

  // Name and Surname
  if (!name || !surname || name.length < 3 || surname.length < 3) {
    return res.status(400).json({ msg: "Insert a valid name and surname (at least 3 characters each).", code: 400 });
  }

  // Email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ msg: "Mail Error: Format is not valid.", code: 400 });
  }

  // Phone
  const parsedPhone = parseInt(phone);
  if (isNaN(parsedPhone) || phone.length < 7 || phone.length > 20) {
    return res.status(400).json({ msg: "Phone Number Error: Must be valid and respect standard format (7-20 digits).", code: 400 });
  }

  // Amount
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ msg: "Amount Error: You must provide a valid positive price.", code: 400 });
  }

  // Billing Address
  if (!billing_address || typeof billing_address !== 'string' || validator.isEmpty(billing_address.trim())) {
    return res.status(400).json({ msg: "Billing Address Error: Insert a valid address.", code: 400 });
  }
  if (!validator.isLength(billing_address.trim(), { min: 10, max: 200 })) {
    return res.status(400).json({ msg: "Billing Address Error: Must be between 10 and 200 characters.", code: 400 });
  }

  // Shipping Address
  if (!shipping_address || typeof shipping_address !== 'string' || validator.isEmpty(shipping_address.trim())) {
    return res.status(400).json({ msg: "Shipping Address Error: Insert a valid address.", code: 400 });
  }
  if (!validator.isLength(shipping_address.trim(), { min: 10, max: 200 })) {
    return res.status(400).json({ msg: "Shipping Address Error: Must be between 10 and 200 characters.", code: 400 });
  }

  // Country
  // Assuming 'countries' array contains lowercase country names
  if (!country || !countries.includes(country.toLowerCase())) {
    return res.status(400).json({ msg: `Country Error: "${country}" is not a valid country.`, code: 400 });
  }

  // If all validations pass, proceed to the next middleware/route handler
  next();
};

module.exports = validationCheckoutProcess;