import { useEffect} from 'react';

export default function useStorage() {

  useEffect(() => {
    const storageDict = {
      UID: '1234567890',
      COMPANY_NAME: 'Dark Photon Consulting, LLC.',
      COMPANY_ADDRESS: '123 Main Street, Anytown, USA',
      COMPANY_PHONE: '555-555-5555',
      COMPANY_EMAIL: ''

    }
    const storage = window.localStorage;

    for (const [key, value] of Object.entries(storageDict)) {
      storage.setItem(key, value);
    }
  },)

  return window.localStorage;
}