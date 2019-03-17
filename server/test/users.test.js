import { expect } from 'chai';

import { Users } from '../utils/users';

describe('Users', () => {
    it('should add new user', () => {
        let users = new Users(),
            user = {
                id: 158,
                name: 'Sol',
                room: 'Nodejs Developers'
            },
            res = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.deep.equal([user]);
    })
});