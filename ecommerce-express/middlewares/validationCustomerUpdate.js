const validator = require("validator");
const countries = require("../data/countries"); // Assuming this file exports an array of country names

const validationCustomerUpdate = (req, res, next) => {
   const { name, surname, email, billing_address, shipping_address, phone, country}  = req.body;
 //Validazioni
//NOme e Cognome
  if (!name || !surname) {
    return res.status(400).json({ msg: "Insert a valid name and surname", code: 400 });
  }

 //Email controllo con validator
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ msg: "Mail Error: Formato email non valido.", code: 400 });
  }

//Telefono: controllo lunghezza e esistenza
const parsedPhone = parseInt(phone)
  if (!phone || phone.length < 7 || phone.length > 20 || isNaN(parsedPhone)) {
    return res.status(400).json({ msg: "Number Error: Phone number must be valid and respect standard format (7-20 digits).", code: 400 });
  }

  //controllo billing address

   if (!billing_address || typeof billing_address !== 'string' || validator.isEmpty(billing_address.trim())) {
        return res.status(400).json({ msg: "Billing Address: Insert a Valid Address", code: 400 }); // L'indirizzo non deve essere vuoto o solo spazi bianchi
    }

  // Lunghezza minima e massima ragionevole
    if (!validator.isLength(billing_address, { min: 10, max: 200 })) { // Esempio: 10 a 200 caratteri
        res.status(400).json({ msg: "Billing Address: Insert a Valid Address", code: 400 });
    }

  //controllo shipping_adress

   if (!shipping_address || typeof shipping_address !== 'string' || validator.isEmpty(shipping_address.trim())) {
        res.status(400).json({ msg: "Shipping Address: Insert a Valid Address", code: 400 });
    }

  // Lunghezza minima e massima ragionevole
    if (!validator.isLength(shipping_address, { min: 10, max: 200 })) { // Esempio: 10 a 200 caratteri
        res.status(400).json({ msg: "Shipping Address: Insert a Valid Address", code: 400 });
    }

  // Country control (array con countries importato from data)
  if (!country || !countries.includes(country.toLowerCase())) {
    return res.status(400).json({ msg: `Country Error: ${country} is not a valid country`, code: 400 });
  }

  // If all validations pass, proceed to the next middleware/route handler
  next();
  console.log(req.body);
};

module.exports = validationCustomerUpdate;