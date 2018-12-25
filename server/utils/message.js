const moment = require('moment');
const date = moment();

const generateMessage =(from, text) => {
  return {
    from,
    text,
    createdAt: date.valueOf()
  }
};

const generateLocationMessage = (from, lat, lng) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${lat},${lng}`,
    createdAt: date.valueOf()
  };
}

module.exports = {
  generateMessage,
  generateLocationMessage
};