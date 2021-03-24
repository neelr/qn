const Airtable = require("airtable");
Airtable.configure({
  apiKey: process.env.AIRTABLE,
});

export default Airtable.base(process.env.BASE);
