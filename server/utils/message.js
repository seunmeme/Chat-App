import moment from 'moment';

export const generateMessage = (from, text) => {
  const createdAt = moment().valueOf();
    return {from, text, createdAt};
};

export const generateLocationMessage = (from, latitude, longitude) => {
  const createdAt = moment().valueOf();
    return {
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt
    };
  };