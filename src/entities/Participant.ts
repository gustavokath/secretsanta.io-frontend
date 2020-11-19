import { v4 as uuid } from 'uuid';

export enum ContactType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

class Participant {
  id: string;

  name: string;

  contactMethod: ContactType;

  contact: string;

  language: string;

  constructor(name = '', contactMethod = ContactType.SMS, contact = '', language = '') {
    this.id = uuid();
    this.name = name;
    this.contactMethod = contactMethod;
    this.contact = contact;
    this.language = language;
  }
}

export default Participant;
