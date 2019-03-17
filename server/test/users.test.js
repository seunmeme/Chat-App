import { expect } from 'chai';

import { Users } from '../utils/users';

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Meme',
            room: 'Training'
        },
        {
            id: 2,
            name: 'Ogbeni',
            room: 'Play'
        },
        {
            id: 3,
            name: 'Arabirin',
            room: 'Training'
        }]
    });

    it('should add new user', () => {
        let users = new Users(),
            user = {
                id: 158,
                name: 'Sol',
                room: 'Nodejs Developers'
            },
            res = users.addUser(user.id, user.name, user.room);

        expect(users.users).to.deep.equal([user]);
    });

    it('should remove a user', () => {
        let res = users.removeUser(2);

        expect(res).to.have.property('name', 'Ogbeni');
        expect(res.id).to.equal(2);
        expect(users.users.length).to.equal(2);
        expect(res).to.deep.equal({
            id: 2,
            name: 'Ogbeni',
            room: 'Play'
        })
    });

    it('should not remove a user', () => {
        let res = users.getUser(18);

        expect(res).to.be.undefined;
        expect(res).to.not.exist;
    });

    it('should find a user', () => {
        let res = users.getUser(1);

        expect(res).to.have.property('name', 'Meme');
        expect(res.id).to.equal(1);
        expect(res).to.deep.equal({
            id: 1,
            name: 'Meme',
            room: 'Training'
        })
    });

    it('should not find user', () => {
        let res = users.getUser(8);

        expect(res).to.be.undefined;
        expect(res).to.not.exist;
    });

    it('should return names for Training room', () => {
        let res = users.getUsersList('Training');

        expect(res.length).to.equal(2);
    });

    it('should return names for Play room', () => {
        let res = users.getUsersList('Play');

        expect(res).to.deep.equal(['Ogbeni']);
        expect(res.length).to.equal(1);
    });
});