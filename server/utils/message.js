import moment from 'moment';

const createdAt = moment().valueOf();

export const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt
    };

};

export const generateLocationMessage = (from, latitude, longitude) => {
    return {
      from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`,
      createdAt
    };
  };