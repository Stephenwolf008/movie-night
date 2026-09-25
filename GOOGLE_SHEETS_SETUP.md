# Optional anonymous choice tracking

Tracking is disabled until you add a Google Apps Script web app URL to `src/config/personalization.js` as `CHOICE_ENDPOINT`. The app sends only the timestamp, random session ID, movie ID, movie title, whether a trailer was opened, and the selected mood filter. It does not collect contact details or location. With an empty endpoint, the request is skipped. A failed request never blocks the movie picker.

## Set up the sheet

Create a Google Sheet and put these headers in row 1, in this order:

`Timestamp | Session ID | Movie ID | Movie Title | Trailer Opened | Mood Filter`

In the sheet, open **Extensions → Apps Script** and use this script, replacing `SHEET_ID` with the ID from the sheet URL:

```js
const SHEET_ID = 'SHEET_ID';
const TAB_NAME = 'Choices';

function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME);
  sheet.appendRow([
    payload.timestamp || new Date().toISOString(),
    payload.sessionId || '',
    payload.movieId || '',
    payload.movieTitle || '',
    Boolean(payload.trailerOpened),
    payload.moodFilter || 'All',
  ]);
  return ContentService.createTextOutput('ok');
}
```

Create a tab named `Choices`, then choose **Deploy → New deployment → Web app**. Set **Execute as** to yourself and access to **Anyone**. Deploy and copy the web app URL ending in `/exec` into `CHOICE_ENDPOINT`. The URL is public, so only use this for the limited, anonymous fields listed above. Redeploy after changing the Apps Script.

The site sends the JSON body as `text/plain` in a fire-and-forget request to avoid a browser preflight. The browser cannot read the response in `no-cors` mode; verify new rows in the sheet after deployment.
