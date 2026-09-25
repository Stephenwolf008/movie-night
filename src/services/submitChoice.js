import { CHOICE_ENDPOINT } from '../config/personalization';

export const submitChoice = async (data) => {
  if (!CHOICE_ENDPOINT) {
    return;
  }
  
  try {
    // text/plain is a CORS safelisted content type, avoiding a preflight for Apps Script.
    await fetch(CHOICE_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to submit choice:', error);
  }
};
