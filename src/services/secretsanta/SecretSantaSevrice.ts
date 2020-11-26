import { v4 as uuid } from 'uuid';
import Participant from '../../entities/Participant';
import SecretSanta from '../../entities/SecretSanta';

const API_URL = 'https://ukjxr5f9jg.execute-api.sa-east-1.amazonaws.com/prod/secret_santa';

const convertObjectToBody = (event: SecretSanta) => ({
  id: uuid(),
  name: event.name,
  date: event.date,
  participants: event.participants.map((participant: Participant) => ({
    id: participant.id,
    name: participant.name,
    language: participant.language,
    contact_method: participant.contactMethod,
    contact: participant.contact,
  })),
});

const run = (event: SecretSanta): Promise<Response> => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Method': 'POST,OPTIONS',
      'Access-Control-Request-Headers': 'Content-Type,x-requested-with,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods',
    },
    body: JSON.stringify(convertObjectToBody(event)),
  };
  return fetch(API_URL, requestOptions);
};

export default { run };
