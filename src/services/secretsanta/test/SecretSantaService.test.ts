import '@testing-library/react';
import SecretSantaSevrice from '../SecretSantaSevrice';
import SecretSanta from '../../../entities/SecretSanta';
import Participant from '../../../entities/Participant';

jest.mock('js-cookie', () => jest.fn());

describe('run', () => {
  describe('when run secret santa succeeeds', () => {
    const participant1 = new Participant();
    const participant2 = new Participant();
    const event = new SecretSanta('Name', new Date(), [participant1, participant2]);

    it('should return success promise', () => {
      const mockFetchPromise = jest.fn();
      const mockFetch = jest.fn().mockImplementation(() => mockFetchPromise);
      global.fetch = mockFetch;

      expect(SecretSantaSevrice.run(event)).toEqual(mockFetchPromise);
    });
  });
});
