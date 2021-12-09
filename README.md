## Prerequisites to run
NodeJS - version > 12 should work, but for reference v14.16.0 was used in development.
Install dependencies with `npm install` or `yarn`
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Files
The UI logic is in ./src/App.js \
I've written the task twice in two separate files. I would recommend reading EmployeePairWIthMap.js since it is a cleaner solution. I didn't delete the first variant (EmployeePair.js) since it works fine, albeit being a little messy.

### Known issues
A text file containing a mix of line endings will not produce valid output. The app will accept any line endings (LF or CRLF) if only one of them is present in the file.
