# Analysis Tool API Documentation

## Overview

The analysis tool provides a JavaScript execution environment in the browser. It can be used for complex mathematical calculations and analyzing user-uploaded files.

## Runtime Environment

- **Type**: Browser-based JavaScript execution environment
- **Not a Node.js environment**: Uses browser APIs and React-style imports
- **Execution Mode**: Asynchronous
- **Output Handling**: Returns console output and error traces

## Available Libraries

The following libraries are available for import:

| Library   | Import Syntax                      | Purpose                 |
| --------- | ---------------------------------- | ----------------------- |
| Lodash    | `import _ from 'lodash';`          | Utility functions       |
| PapaParse | `import Papa from 'papaparse';`    | CSV parsing             |
| SheetJS   | `import * as XLSX from 'sheetjs';` | Excel file processing   |
| MathJS    | `import * as math from 'mathjs';`  | Mathematical operations |

## Core Methods

### Console Output Methods

Only the following console methods are supported:

```javascript
console.log(); // Primary output method
console.warn(); // Warning output
console.error(); // Error output
```

**Note**: Other console methods such as `console.assert()` or `console.table()` are NOT supported.

## File System API

### Reading Files

```javascript
// Asynchronous file reading
await window.fs.readFile(filename, options);
```

**Parameters**:

- `filename` (String): Exact filename as provided in the source tags
- `options` (Object, optional):
  - `encoding` (String, optional): Specify 'utf8' to receive a string response

**Returns**:

- Default: uint8Array
- With utf8 encoding: String

**Example**:

```javascript
// Read as uint8Array
const binaryData = await window.fs.readFile('data.csv');

// Read as utf8 string
const textData = await window.fs.readFile('data.csv', { encoding: 'utf8' });
```

### Working with Excel Files (SheetJS)

Recommended reading options:

```javascript
const workbook = XLSX.read(response, {
  cellStyles: true, // Colors and formatting
  cellFormulas: true, // Formulas
  cellDates: true, // Date handling
  cellNF: true, // Number formatting
  sheetStubs: true, // Empty cells
});
```

## Usage Patterns

### CSV Analysis Pattern

```javascript
// Read file
const fileContent = await window.fs.readFile('data.csv', { encoding: 'utf8' });

// Parse with PapaParse
import Papa from 'papaparse';
const parsedData = Papa.parse(fileContent, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
});

// Log results
console.log(parsedData.data);
```

### Excel Analysis Pattern

```javascript
// Read file
const response = await window.fs.readFile('data.xlsx');

// Parse with SheetJS
import * as XLSX from 'sheetjs';
const workbook = XLSX.read(response, {
  cellStyles: true,
  cellFormulas: true,
  cellDates: true,
  cellNF: true,
  sheetStubs: true,
});

// Explore structure
console.log(workbook.Workbook);
```

## Limitations and Constraints

### Performance Considerations

- Incurs a reasonably large latency penalty
- Should be avoided for simple queries that don't require computational analysis

### Language Support

- JavaScript only
- Does not support other programming languages (e.g., Python)

### Environment Isolation

- Code executed in the analysis tool is NOT in a shared environment with Artifacts
- To reuse code from the analysis tool in an Artifact, you must rewrite the code in its entirety
- You cannot add an object to the `window` and expect to be able to read it in an Artifact

### File Reading Constraints

- Must use the exact filename as provided in the source tags
- File reading is asynchronous only (`window.fs.readFileSync` is not available)
- When errors occur during file reading, debug step by step using `console.log`

### Output Limitations

- Only receives output from console.log, console.warn, and console.error
- Does not support console.assert, console.table, or other console methods

### Best Practices

- Use for complex math problems requiring high accuracy
- Use for analyzing large files with more data than could be handled in output limits
- Do not use for requests to write code in languages other than JavaScript
- When a user requests Python code, provide the requested Python code even if the analysis tool was used for exploration
- Data visualizations must be implemented in Artifacts after testing in the analysis tool
