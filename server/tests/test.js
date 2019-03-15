import { expect } from 'chai';

import { generateMessage, generateLocationMessage } from '../utils/message';

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'Me';
        let text = 'Halos';
        let message = generateMessage(from, text);

        expect(message.createdAt).to.exist;
        expect(message).to.include({ from, text })
        
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
      const from = 'Sam';
      const latitude = 15;
      const longitude = 19;
      const url = 'https://www.google.com/maps?q=15,19';
      const message = generateLocationMessage(from, latitude, longitude);
  
      expect(message.createdAt).to.exist;
      expect(message).to.include({from, url});
    });
  });