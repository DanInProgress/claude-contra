# Hierarchical Prompting Framework

This hierarchical framework organizes prompting strategies from foundational principles to specific constraint handling:

## Level 1: Foundational LLM Prompting Principles

```
I need your help writing code that [TASK DESCRIPTION]. When generating this code:

1. Please create short, focused functions with clear purposes
2. Use explicit variable names that describe their contents
3. Include validation for all inputs
4. Add comments to explain complex logic
5. Handle potential errors gracefully

Let's approach this step by step, verifying each part works before moving to the next.
```

## Level 2: REPL-Adapted Prompting

```
I need your help using the REPL tool to [TASK DESCRIPTION].

Let's follow this structured approach:

1. First, write code to [FIRST_STEP] and verify it works by logging [EXPECTED_OUTPUTS]
2. Then, once that's working, build on it to [SECOND_STEP]
3. Finally, combine these components to [FINAL_STEP]

For each step, please:
- Include clear console.log statements to verify correct operation
- Handle potential errors explicitly
- Use focused functions that do one thing well

This step-by-step verification will help us build reliable code within the REPL environment.
```

## Level 3: Constraint-Handling Prompting

```
I need code to [TASK DESCRIPTION] that works within the REPL tool's constraints:

1. Design for the 30-second execution timeout by:
   - Breaking the process into small, independent operations
   - Processing data in manageable chunks
   - Including progress tracking between operations

2. Stay within the 10,000 token output limit by:
   - Using strategic logging (not verbose output)
   - Logging summaries and samples rather than full datasets
   - Focusing output on essential verification information

3. Add protection against potential connection issues:
   - Include checkpointing at logical progress points
   - Design operations to be resumable
   - Store intermediate state in a recoverable way

Please generate code following these constraints while accomplishing the task.
```

# Effective Prompting for LLMs Using the REPL Tool

## Introduction

This guide helps you design effective prompts for Large Language Models (LLMs) when using code analysis tools like the REPL. By understanding how fundamental LLM limitations interact with REPL tool constraints, you can craft prompts that significantly improve code generation quality, accuracy, and usability.

## Understanding LLM-Specific Limitations vs. General AI Constraints

LLMs face unique limitations distinct from general AI systems that directly impact how you should design prompts for code analysis:

| Type             | Limitation                    | Why It's LLM-Specific                                                                        | Impact on Code Generation                                                    | Prompt Design Implication                                                            |
| ---------------- | ----------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **LLM-Specific** | Token-by-token generation     | Unlike planning-based systems, LLMs generate each token sequentially without global planning | Code may start with sound structure but lose coherence in later sections     | Break requests into sequential steps with verification between them                  |
| **LLM-Specific** | Attention decay over distance | Attention mechanism weakens over token distance, unlike systems with perfect recall          | References to earlier requirements may be forgotten by the end of generation | Place critical requirements near relevant instructions or repeat at strategic points |
| **LLM-Specific** | Probabilistic generation      | Unlike deterministic systems, each token is selected probabilistically                       | Variable naming and structure may be inconsistent across code sections       | Provide explicit naming conventions and structure templates                          |
| **LLM-Specific** | Training distribution bias    | Tendency to generate common patterns from training rather than optimal solutions             | Generates familiar patterns even when inappropriate for specific needs       | Explicitly state when you need deviation from common approaches                      |
| **General AI**   | No execution simulation       | Like most AI systems, cannot truly run code mentally                                         | Cannot reliably predict runtime behavior, especially edge cases              | Require explicit verification steps for runtime behavior                             |
| **General AI**   | Working memory constraints    | Common across AI systems without perfect memory                                              | Complex interdependencies in code may not be tracked accurately              | Externalize state and dependencies explicitly                                        |
| **General AI**   | No physical intuition         | Common to all non-embodied systems                                                           | May produce technically correct but impractical solutions                    | Provide concrete constraints and context                                             |

## How REPL Tool Constraints Compound LLM Limitations

The REPL tool's specific technical constraints interact with LLM limitations to create unique challenges that your prompts must address:

| REPL Constraint                               | LLM Limitation                              | Compounding Effect                                                    | Prompt Design Solution                                                                                                                 |
| --------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **30-second execution timeout**               | Token-by-token generation without planning  | LLM creates code without considering execution time, risking timeouts | "Design this process to work within the 30-second timeout by breaking it into smaller operations that each complete within this limit" |
| **10,000 token output limit**                 | Verbose generation tendencies               | LLM generates excessive logging without considering output limits     | "Create selective logging that provides essential information while staying under the 10,000 token output limit"                       |
| **Connection stability concerns**             | No conceptual model of system reliability   | LLM doesn't naturally consider connection failures in design          | "Add checkpointing to this code that would allow recovery if our connection drops during processing"                                   |
| **Environment isolation (REPL vs Artifacts)** | Limited understanding of execution contexts | LLM creates code assuming shared state between environments           | "Design this code to work in both the REPL tool for testing and later in an artifact without assuming shared state"                    |

## Core LLM Limitations and Prompt Strategies

| Limitation                     | Why It Matters                                                                                    | Prompt Strategy                                                               | Example                                                                                                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Token-by-token generation**  | LLMs generate text sequentially, with each token influencing the next but without global planning | **Stepwise Decomposition**<br>Break tasks into explicit sequential steps      | "First, parse the CSV file. After confirming the data is loaded correctly, calculate the statistics."             |
| **Context window limits**      | LLMs can only "see" a limited amount of text at once                                              | **Focused Scope**<br>Keep each REPL task limited to one cohesive function     | "Let's focus only on the CSV parsing function for now. We'll handle data analysis in the next step."              |
| **No execution simulation**    | LLMs predict code but can't truly execute it mentally                                             | **Verification Checkpoints**<br>Add explicit verification points              | "After reading the file, log the first 5 rows to verify the data structure."                                      |
| **Working memory constraints** | LLMs struggle to track complex state changes                                                      | **State Externalization**<br>Make state changes explicit and visible          | "Create a `processData` function that returns the new state rather than modifying global variables."              |
| **Attention decay**            | Attention to details decreases with distance                                                      | **Critical Point Highlighting**<br>Emphasize key requirements and constraints | "CRITICAL: The data must be validated before processing to prevent errors."                                       |
| **Limited causal modeling**    | LLMs struggle to reason about execution flow over time                                            | **Linear Flow Declaration**<br>Explicitly state the execution sequence        | "The execution flow will be: 1) read file, 2) parse data, 3) filter records, 4) calculate statistics."            |
| **No persistent memory**       | LLMs don't remember previous sessions                                                             | **Self-Contained Instructions**<br>Make each prompt complete and independent  | "For this analysis task, we need to process a CSV file of sales data with columns for date, product, and amount." |
| **Probabilistic output**       | Generation contains statistical uncertainties                                                     | **Concrete Examples**<br>Provide specific examples of desired inputs/outputs  | "Example input: `['2023-01-01,100', '2023-01-02,150']`<br>Expected output: `{total: 250, avg: 125}`"              |

## REPL-Specific Prompt Templates

The following templates are specifically designed to work with the unique interaction between LLM limitations and REPL constraints:

### 1. Data Loading and Exploration

````
Please help me analyze a [FILE_TYPE] file with the REPL tool using a prompt structure that accommodates LLM limitations.

First, let's load and explore the data structure with this carefully sequenced approach:

1. Read the file using this specific code:
   ```javascript
   const rawData = await window.fs.readFile('[FILENAME]', {encoding: 'utf8'});
   console.log("First 200 characters:", rawData.substring(0, 200));
````

2. After confirming the file loaded correctly, parse the data with:

   ```javascript
   // Choose specific parsing approach based on file type
   const parsedData = [PARSING_METHOD];

   // Show limited sample to avoid hitting 10k token limit
   console.log(
     'Sample (first 3 records):',
     Array.isArray(parsedData) ? parsedData.slice(0, 3) : parsedData
   );
   ```

3. When that's successful, log a structured summary:
   ```javascript
   console.log('Data summary:', {
     recordCount: [COUNT_EXPRESSION],
     fields: [FIELDS_EXPRESSION],
     // Include only essential metrics
   });
   ```

This stepwise approach with verification addresses LLM's token-by-token generation limitation and helps prevent cascading errors.

```

This template:
- Breaks the task into explicit sequential steps (addressing token-by-token generation)
- Provides exact code to use (preventing inconsistency issues)
- Includes verification points (addressing error propagation)
- Limits output to avoid the 10k token limit (addressing REPL constraints)
- Maintains focus on one task at a time (addressing attention decay)

### 2. Data Analysis and Transformation

```

Now that we've loaded the data, let's analyze it with an approach that works with LLM reasoning patterns and REPL constraints:

1. Let's define our analysis functions first, before executing any code:

   ```javascript
   // Step 1: Define a validation function to check each record
   function validateRecord(record) {
     // Add specific validation logic
     return /* validation result */;
   }

   // Step 2: Define a transformation function for each valid record
   function transformRecord(record) {
     // Add specific transformation logic
     return /* transformed record */;
   }

   // Step 3: Define an analysis function that works on transformed data
   function analyzeData(transformedRecords) {
     // Add specific analysis logic
     return /* analysis results */;
   }
   ```

2. Next, apply these functions with explicit checks that stay within the 30-second timeout:

   ```javascript
   // Process in chunks to avoid timeout
   const CHUNK_SIZE = 1000;
   let validRecords = [];

   // Only process CHUNK_SIZE records at a time
   for (let i = 0; i < Math.min(data.length, CHUNK_SIZE); i++) {
     if (validateRecord(data[i])) {
       validRecords.push(transformRecord(data[i]));
     }
   }

   // Log limited sample to stay under output limit
   console.log(`Processed ${validRecords.length} valid records`);
   console.log('Sample transformed records:', validRecords.slice(0, 3));
   ```

3. Finally, run the analysis and log structured results:

   ```javascript
   const analysisResults = analyzeData(validRecords);
   console.log('Analysis results:', {
     // Include specific metrics here
     // Use compact representation
   });
   ```

This approach ensures each step builds on verified success and works within REPL constraints.

```

This template:
- Separates function definition from execution (addressing working memory limitations)
- Uses consistent function design patterns (promoting code coherence)
- Explicitly limits processing to avoid timeout (addressing REPL timeout constraint)
- Includes structured logging for clarity (addressing probabilistic generation)
- Uses chunking to manage processing (addressing execution constraints)

### 3. Error Recovery Prompt

```

The previous code attempt encountered this error:
[ERROR_MESSAGE]

Let's debug this systematically:

1. First, let's print more information about the input data:

   - Check data types using `typeof` and `Array.isArray()`
   - Check for null/undefined values
   - Log the structure of the first few items

2. Based on that information, modify the code to handle:

   - Missing or malformed data
   - Unexpected data types
   - Edge cases we didn't consider before

3. Add explicit error handling with try/catch blocks

Please modify the previous approach to address these issues, focusing specifically on the part that caused the error.

```

### 4. Visualization Preparation

```

Let's prepare our analyzed data for visualization using these steps:

1. Transform the data into this chart-friendly format:

```
{
  labels: [...],  // X-axis labels
  datasets: [{
    label: "...",
    data: [...],  // Y-axis values
    backgroundColor: "..."
  }]
}
```

2. Include only these fields in the visualization: [FIELDS]
3. Apply these transformations to the data: [TRANSFORMATIONS]
4. Log the final chart-ready data structure

Once we verify the data is correctly formatted, we'll create a visualization artifact.

```

## Progressive Prompt Sequences

### Example: CSV Analysis Sequence

**Step 1: Initial Exploration**

```

Please help me explore a CSV file using the REPL tool. Let's start by:

1. Reading the file "sales_data.csv"
2. Logging the first 5 rows to understand its structure
3. Determining the column names and data types

Focus only on exploration at this stage - no analysis yet.

```

**Step 2: Add Parsing**

```

Now that we see the structure, let's parse this CSV properly:

1. Use PapaParse with these options:

   - header: true
   - dynamicTyping: true
   - skipEmptyLines: true

2. Log a summary of the parsed data:
   - Number of records
   - Column names
   - Sample of first 3 parsed records (as objects)

Before proceeding, verify that the dates and numeric values are properly typed.

```

**Step 3: Add Filtering and Analysis**

```

The parsing looks good. Now let's filter and analyze the data:

1. Filter records to include only:

   - Complete records (no missing values)
   - Sales from 2023 onwards

2. Group the filtered data by month and calculate:
   - Total sales per month
   - Average order value
   - Number of transactions

Log the results in a structured format for verification.

```

**Step 4: Final Visualization Preparation**

```

Great analysis! Now prepare the monthly sales data for a line chart:

1. Format the data as:

```
{
  labels: ["Jan 2023", "Feb 2023", ...],
  datasets: [{
    label: "Monthly Sales",
    data: [1234, 5678, ...],
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.2)"
  }]
}
```

2. Sort chronologically by month
3. Format currency values appropriately
4. Log the final visualization-ready object

We'll use this exact structure in an artifact after verification.

```

## Code Pattern Prompt Templates

### 1. Atomic Functions Pattern

```

Please help me implement a solution for [TASK] using atomic functions that accommodate LLM coding patterns:

Your prompt should:

1. Break functionality into small, independent functions
2. Maintain pure input/output relationships
3. Follow consistent naming and structure
4. Include explicit validation

I'd like you to implement these specific functions:

1. `parseInputData(rawData)` - First, create a function that:

   - Validates rawData is in the expected format
   - Converts it to a structured format
   - Handles potential parsing errors explicitly
   - Returns a clearly documented data structure

2. `filterValidRecords(records)` - Next, create a function that:

   - Takes the output from parseInputData
   - Applies specific validation rules to each record
   - Returns only valid records with reason for any exclusions
   - Uses clear, consistent validation logic

3. `calculateMetrics(validRecords)` - Then, create a function that:

   - Performs calculations on the filtered data
   - Returns a structured metrics object
   - Handles edge cases like empty input
   - Uses clear naming for each metric

4. `formatResults(metrics)` - Finally, create a function that:
   - Prepares the calculated metrics for presentation
   - Follows this specific output structure: [OUTPUT_STRUCTURE]
   - Handles any necessary data conversions
   - Includes validation of the final output

For each function, please include:

- Clear purpose statement
- Parameter validation
- Return value documentation
- Example usage

This atomic function pattern accommodates LLM limitations by maintaining clear scope and state.

```

This template:
- Explicitly structures the prompt around LLM limitations (stated purpose)
- Breaks functionality into discrete functions (addressing token-by-token generation)
- Specifies exactly what each function should do (preventing scope drift)
- Requires consistent patterns (mitigating probabilistic variation)
- Emphasizes validation throughout (addressing error propagation)
- Includes documentation requirements (reinforcing structural consistency)

### 2. State Tracking Pattern

```

Please implement a solution for [TASK] that makes all state changes explicit, which helps work around LLM limitations in tracking state:

I need you to structure the solution as a clear data transformation pipeline:

1. First, define our initial state structure:

   ```javascript
   // Start with a clearly defined state object
   const initialState = {
     // Define initial state properties with explicit types
     data: [], // Raw data array
     validItems: [], // Items that pass validation
     invalidItems: [], // Items that fail validation
     processingStats: {
       // Statistics about the processing
       total: 0,
       valid: 0,
       invalid: 0,
       processingTime: 0,
     },
     errors: [], // Any errors encountered
   };
   ```

2. Then, create transformation functions that follow these principles:

   - Each function takes the current state as input
   - Each function returns a new state object (no mutation)
   - Each function handles one specific transformation
   - Each function includes validation and error handling
   - Each function logs the key state changes

3. Implement these specific transformations:

   ```javascript
   // Function signatures to implement:
   function loadData(currentState, rawData) {
     /* ... */
   }
   function validateItems(currentState) {
     /* ... */
   }
   function processValidItems(currentState) {
     /* ... */
   }
   function generateReport(currentState) {
     /* ... */
   }
   ```

4. Finally, create a main function that chains these together:
   ```javascript
   async function processDataPipeline(rawData) {
     // Start with initial state
     let state = initialState;

     // Log initial state (with limited detail to avoid token limit)
     console.log('Initial state:', { ...state, data: `[${state.data.length} items]` });

     // Apply each transformation in sequence with explicit state logging
     state = loadData(state, rawData);
     console.log('After loading:', { ...state, data: `[${state.data.length} items]` });

     state = validateItems(state);
     console.log('After validation:', {
       valid: state.validItems.length,
       invalid: state.invalidItems.length,
       errors: state.errors.length,
     });

     // Continue with other transformations
     // ...

     return state;
   }
   ```

This explicit state management pattern addresses LLM limitations in tracking changes over time.

```

This template:
- Explicitly addresses LLM state tracking limitations (stated purpose)
- Makes state structure and transitions explicit (addressing causal modeling weakness)
- Uses immutable updates (preventing state confusion)
- Includes detailed logging of state changes (providing visibility)
- Maintains consistent state structure (reinforcing pattern recognition)
- Chunks processing into discrete transformations (accommodating attention limits)

### 3. Error-Resilient Pattern

```

Please implement a solution that's resilient to common errors:

1. Add comprehensive validation:

   - Input validation before processing
   - Type checking for all operations
   - Boundary condition handling

2. Use defensive programming techniques:

   - Default values for missing data
   - Graceful degradation when components fail
   - Explicit error handling with informative messages

3. Include three levels of error handling:
   - Preventative (validations before operations)
   - Try/catch during operations
   - Result validation after operations

This pattern ensures code continues working even with unexpected inputs.

```

## Prompt Design Checklist

When creating prompts for LLMs using the REPL tool, verify your prompt includes:

- [ ] **Clear Task Breakdown**: Specific, sequential steps rather than general instructions
- [ ] **Input Examples**: Concrete examples of the input data and format
- [ ] **Output Structure**: Explicit description of the expected output format
- [ ] **Verification Points**: Clear checkpoints to confirm intermediate results
- [ ] **Error Considerations**: Guidance on handling potential errors or edge cases
- [ ] **Scope Limitation**: Focus on one cohesive task at a time
- [ ] **Implementation Approach**: Specification of desired coding patterns
- [ ] **Progress Indicators**: Requirements for logging progress and state

## REPL-Specific Best Practices

### Library Usage

```

When using [LIBRARY] in the REPL, follow these steps:

1. Import the library: `import [IMPORT_STATEMENT]`
2. Create a small test case first:
   ```javascript
   // Test the library with a minimal example
   const testResult = library.function(sampleData);
   console.log('Library test:', testResult);
   ```
3. Only then proceed to the full implementation
4. Add error handling specifically for library-related errors

This ensures the library is working as expected before building on it.

```

### Large File Processing

```

For processing the large file [FILENAME], let's use this chunked approach to handle the 30-second timeout limit:

1. First, read sample data to understand structure:

   ```javascript
   // Read just the first 1000 characters
   const sample = await window.fs.readFile('[FILENAME]', { encoding: 'utf8' });
   console.log('Sample (first 1000 chars):', sample.substring(0, 1000));
   ```

2. Process the file in timeout-safe chunks:

   ```javascript
   // Create a function that processes data in small batches
   function processChunk(data, startIndex, chunkSize) {
     // Set a reasonable chunk size to complete in under 30 seconds
     const endIndex = Math.min(startIndex + chunkSize, data.length);
     const chunk = data.slice(startIndex, endIndex);

     // Process chunk here
     const results = chunk.map(item => /* transformation */);

     // Log limited output to avoid hitting 10k token limit
     console.log(`Processed items ${startIndex} to ${endIndex-1} (${results.length} items)`);
     // Only log a sample of results to avoid token limit
     console.log("Sample results:", results.slice(0, 3));

     return {
       results,
       nextIndex: endIndex,
       isComplete: endIndex >= data.length
     };
   }
   ```

3. Add state tracking for resumability:

   ```javascript
   // This approach allows continuing from last point if execution times out
   let currentIndex = 0;
   let allResults = [];

   while (currentIndex < data.length) {
     const { results, nextIndex, isComplete } = processChunk(data, currentIndex, 1000);
     allResults = allResults.concat(results);
     currentIndex = nextIndex;

     // Checkpoint that can be manually restarted if needed
     console.log(`Progress: ${Math.round((currentIndex / data.length) * 100)}% complete`);

     if (isComplete) break;
   }
   ```

This approach prevents timeouts and allows manual resumption if connections freeze.

```

### Code Generation for Artifacts

```

Let's create code that will work well in both the REPL and an artifact:

1. In the REPL, let's develop and test this function:

   ```javascript
   function processData(data) {
     // Processing logic here
     return result;
   }

   // Test with sample data
   const testResult = processData(sampleData);
   console.log('Test result:', testResult);
   ```

2. Verify these aspects before moving to an artifact:
   - All inputs and outputs are well-defined
   - No reliance on global state
   - Error handling is comprehensive
   - Function works correctly with test data

Once verified in the REPL, we'll use this exact function in the artifact.

```

## Case Study: Transforming Ineffective Prompts

### Ineffective Prompt

```

Analyze sales_data.csv and create visualizations to show trends over time.

```

### Effective Prompt Transformation

```

Let's analyze sales_data.csv using a systematic approach:

Step 1: Data Loading & Exploration

1. Load the CSV file using:

   ```javascript
   const rawData = await window.fs.readFile('sales_data.csv', { encoding: 'utf8' });
   console.log('First 200 characters:', rawData.substring(0, 200));
   ```

2. Parse the CSV using PapaParse:
   ```javascript
   import Papa from 'papaparse';
   const parsedData = Papa.parse(rawData, {
     header: true,
     dynamicTyping: true,
     skipEmptyLines: true,
   });
   console.log('Column names:', parsedData.meta.fields);
   console.log('First 3 records:', parsedData.data.slice(0, 3));
   ```

Step 2: Data Analysis

1. Extract date and sales columns
2. Ensure dates are properly formatted
3. Group sales by month
4. Calculate monthly totals and growth rates

Step 3: Visualization Preparation

1. Format the data for a time series chart with:
   - X-axis: Months
   - Y-axis: Total Sales
   - A second line showing growth rate

Each step should include verification logging to confirm success.

```

## Quick Reference: Prompt Patterns for Common REPL Scenarios

| Scenario | Prompt Pattern | Key Elements |
|----------|----------------|-------------|
| **Data Exploration** | "First, let's explore the structure of [FILE]..." | Sample loading, structure logging (limited to avoid 10k token limit) |
| **Data Cleaning** | "Let's clean the data by handling..." | Targeted cleaning, progress tracking, checkpoint logging |
| **Analysis** | "Analyze the cleaned data to calculate..." | Chunked processing, timeout-aware operations, incremental results |
| **Visualization Prep** | "Transform the analysis results into chart-ready format..." | Selective data sampling, efficient transformations |
| **Error Recovery** | "Let's fix the error by first understanding..." | Focused error diagnosis, isolated testing |
| **Timeout Handling** | "Let's redesign this to work within the 30-second timeout..." | Chunked operations, progress tracking, resumable processing |
| **Output Management** | "Let's optimize logging to stay under the 10k token limit..." | Strategic logging, summarization techniques, selective output |
| **Complex Transformation** | "Break down this transformation into chunks that run within 30 seconds..." | Sequential transformations with checkpoints, progress tracking |
| **Connection Safety** | "Let's add checkpointing to prevent data loss if the connection drops..." | Progress saving, resumable operations, state externalization |

## Conclusion

Effective prompts for LLMs using the REPL tool must address the unique interaction between LLM-specific limitations and REPL technical constraints. By understanding these fundamental limitations and applying the prompting strategies in this guide, you can significantly improve code quality, reliability, and execution success.

The most effective prompts:

1. **Address LLM's Token-by-Token Generation**
   - Break complex tasks into explicit sequential steps
   - Provide clear verification between steps
   - Structure prompts to build on previous success

2. **Accommodate LLM's Working Memory Constraints**
   - Externalize state with explicit tracking
   - Use consistent patterns that can be easily followed
   - Provide complete code snippets for complex operations

3. **Counter Attention Decay and Forgetting**
   - Place critical requirements near their implementation point
   - Reinforce important constraints throughout the prompt
   - Use explicit naming and structure to reinforce requirements

4. **Recognize Probabilistic Output Tendencies**
   - Provide explicit structure and examples to follow
   - Include validation to catch probabilistic errors
   - Use consistent patterns for similar operations

5. **Respect REPL's 30-Second Timeout**
   - Design operations to complete within time limits
   - Break large processes into smaller chunks
   - Include progress tracking for resumability

6. **Manage the 10,000 Token Output Limit**
   - Design strategic, targeted logging
   - Log summaries and samples rather than complete data
   - Structure output for maximum information density

7. **Design for Connection Stability**
   - Include checkpointing at logical boundaries
   - Make operations restartable from checkpoints
   - Externalize state for recovery after interruptions

By thinking deeply about how LLMs generate code token-by-token and how the REPL tool constrains execution, you can craft prompts that work *with* these limitations rather than against them, resulting in more efficient and effective code generation and analysis.

## Further Resources

To deepen your understanding of effective LLM prompting for code generation:

1. **LLM Code Generation Patterns**
   - [OpenAI Cookbook: Code generation techniques](https://github.com/openai/openai-cookbook)
   - [Anthropic Claude: Best practices for coding tasks](https://docs.anthropic.com/claude/docs/code-generation-with-claude)

2. **Step-by-Step Prompt Engineering**
   - [LLM Prompt Engineering Guide](https://www.promptingguide.ai/)
   - [Prompt Engineering for Code](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/)

3. **REPL-Specific Development**
   - [Modern JavaScript Development in REPLs](https://replit.com/talk/learn/Modern-JavaScript-Development-in-REPLs/149492)
   - [Best Practices for Testing in REPL Environments](https://tomekdev.com/posts/testing-in-repl-environments)

4. **Token-Aware Prompt Design**
   - [Understanding Token Limitations in LLMs](https://huggingface.co/docs/transformers/main_classes/tokenizer)
   - [Strategies for Working with LLM Token Windows](https://www.pinecone.io/learn/context-window/)
```
