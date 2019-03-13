import { expect } from 'chai';

import { generateMessage } from '../utils/message';

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        let from = 'Me';
        let text = 'Halos';
        let message = generateMessage(from, text);

        expect(message.createdAt).to.exist;
        expect(message).to.include({ from, text })
        
    });
});