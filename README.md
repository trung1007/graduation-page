# ny-graduation

Next.js port of the invitation page. Replace images in `public/images` with your own photos.

Run locally:

```bash
npm install
npm run dev
```

Setup Google Sheet receiving RSVP via Google Apps Script

1. Create a Google Sheet and name a sheet tab `Responses`.
2. In the Sheet, open Extensions → Apps Script and replace `Code.gs` with:

```javascript
// Your provided doPost (with basic safety checks)
function doPost(e) {
	try {
		if (!e || !e.postData || !e.postData.contents) {
			return ContentService
				.createTextOutput(JSON.stringify({ status: 'error', message: 'No postData (run via web POST or use test function)' }))
				.setMimeType(ContentService.MimeType.JSON);
		}
		var data = JSON.parse(e.postData.contents);
		var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
		var sheet = ss.getSheetByName('Responses');
		if (!sheet) sheet = ss.insertSheet('Responses');
		sheet.appendRow([new Date(), data.full_name || '', data.attendance || '', data.guest_count || '', data.message || '']);
		return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
	} catch (err) {
		Logger.log(err);
		return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message })).setMimeType(ContentService.MimeType.JSON);
	}
}
```

Improved version — append a header if missing, add borders to the header and the newly appended row, and include a test helper you can run inside the Apps Script editor:

```javascript
function doPost(e) {
	try {
		if (!e || !e.postData || !e.postData.contents) {
			return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'No postData' })).setMimeType(ContentService.MimeType.JSON);
		}
		var data = JSON.parse(e.postData.contents);
		var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
		var sheet = ss.getSheetByName('Responses');
		if (!sheet) sheet = ss.insertSheet('Responses');

		// Ensure header exists
		if (sheet.getLastRow() === 0) {
			sheet.appendRow(['Timestamp', 'Full name', 'Attendance', 'Guest count', 'Message']);
			// style header
			var lastCol = sheet.getLastColumn();
			sheet.getRange(1, 1, 1, lastCol).setFontWeight('bold').setHorizontalAlignment('center').setBorder(true, true, true, true, true, true);
		}

		// Append data row
		sheet.appendRow([new Date(), data.full_name || '', data.attendance || '', data.guest_count || '', data.message || '']);

		// Apply borders to newly appended row and wrap text
		var lastRow = sheet.getLastRow();
		var lastCol = sheet.getLastColumn();
		var rowRange = sheet.getRange(lastRow, 1, 1, lastCol);
		rowRange.setBorder(true, true, true, true, true, true);
		rowRange.setWrap(true);

		return ContentService.createTextOutput(JSON.stringify({ status: 'success' })).setMimeType(ContentService.MimeType.JSON);
	} catch (err) {
		Logger.log(err);
		return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.message })).setMimeType(ContentService.MimeType.JSON);
	}
}

// Test helper to run inside the Apps Script editor
function testDoPost() {
	var mock = {
		postData: {
			contents: JSON.stringify({ full_name: 'Nguyen Van A', attendance: 'Có', guest_count: '2', message: 'Chúc mừng!' })
		}
	};
	var res = doPost(mock);
	Logger.log(typeof res.getContent === 'function' ? res.getContent() : res);
}
```

3. Replace `YOUR_SPREADSHEET_ID` with the ID from the Sheet URL.
4. Deploy → New deployment → Select `Web app` as type. Set "Who has access" to "Anyone" (or the level you prefer). Deploy and copy the Web app URL.
5. Locally, create a file `.env.local` at the project root with:

```
GAS_WEBHOOK_URL="https://script.google.com/macros/s/XXXXX/exec"
```

6. Restart your dev server. Submitting the RSVP form will POST to `/api/rsvp`, which forwards the data to your Google Apps Script and appends a row in the `Responses` sheet.

Notes:
- For production, set the `GAS_WEBHOOK_URL` in your hosting provider's environment variables.
- If you prefer a server-side integration using a Google Service Account, I can add that instead (requires creating a service account and giving edit permissions to the sheet).

