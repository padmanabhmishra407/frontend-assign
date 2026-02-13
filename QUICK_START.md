# Quick Reference Guide

## How to Use the Dynamic Filter Component System

### Getting Started

**The application is running at**: `http://localhost:5173`

No additional setup needed - just open the link in your browser.

---

## Main Interface

### Filter Builder (Top Section)
The filter builder is where you add and manage filters.

#### Adding a Filter
1. Click **"Add Filter"** button (blue, with plus icon)
2. Select a **Field** from dropdown (Name, Email, Department, etc.)
3. Select an **Operator** appropriate for that field type
4. Enter/select a **Value**
5. Filters apply instantly to the table below

#### Removing Filters
- **Delete individual filter**: Click the trash icon on that filter row
- **Delete all filters**: Click the **"Clear All"** button (appears only when filters exist)

---

## Field Types & How to Filter

### Text Fields (Name, Email, Role, City)
**Operators**: Equals, Contains, Starts With, Ends With, Does Not Contain

**Examples**:
- Find "John" by selecting **Contains** and typing "john"
- Find emails starting with "sarah" using **Starts With**
- Exclude developers using **Does Not Contain** with "Developer"

### Number Fields (Projects, Performance Rating)
**Operators**: Equals, Greater Than, Less Than, ≥ (greater than or equal), ≤ (less than or equal)

**Examples**:
- Find employees with exactly 3 projects using **Equals** and entering 3
- Find high performers using **Greater Than** with 4.5

### Date Fields (Join Date)
**Operator**: Between (date range)

**How to use**:
- Click "Start Date" to open calendar, select a date
- Click "End Date" to open calendar, select a date
- Records between (and including) these dates will be shown

**Examples**:
- Show employees who joined in 2021 (Jan 1, 2021 to Dec 31, 2021)
- Show recent joiners (2023-01-01 to today)

### Amount/Currency Fields (Salary)
**Operator**: Between (min/max range)

**How to use**:
- Enter **Min Amount**: lowest salary to include
- Enter **Max Amount**: highest salary to include
- Leave either blank for open-ended range

**Examples**:
- Find employees earning $80k-$100k (Min: 80000, Max: 100000)
- Find highly paid employees (Min: 120000, Max: blank)
- Find entry-level employees (Min: blank, Max: 70000)

### Single Select Fields (Department)
**Operators**: Is, Is Not

**How to use**:
- Click dropdown to see available options
- Select one option
- Is: Shows only that department
- Is Not: Shows everyone except that department

**Available Departments**:
- Engineering
- Design
- Product
- Sales
- Marketing
- HR
- Finance

### Multi-Select Fields (Skills)
**Operators**: In, Not In

**How to use**:
- Check boxes for skills you want to filter by
- In: Shows employees with at least one selected skill
- Not In: Shows employees without those skills

**Available Skills**:
- React, TypeScript, Node.js, Python, AWS, GraphQL, Kubernetes, Leadership, Figma, Design System

### Boolean Fields (Active Status)
**Operator**: Is

**How to use**:
- Check the box to filter for **Active** employees (isActive = true)
- Uncheck to filter for **Inactive** employees (isActive = false)

---

## Data Table (Bottom Section)

### Sorting
- **Click any column header** to sort by that column
- **Click again** to reverse sort direction
- Arrow indicator shows current sort direction

**Sortable Columns**:
- Name
- Department
- Salary
- Join Date
- Projects
- Performance Rating

### Understanding the Data

| Column | Format | Example |
|--------|--------|---------|
| Name | Text | John Smith |
| Email | Text | john.smith@company.com |
| Department | Category | Engineering |
| Role | Text | Senior Developer |
| Salary | Currency | $95,000 |
| Join Date | Date | Mar 15, 2021 |
| Status | Badge | Active (green) or Inactive (red) |
| Projects | Number | 3 |
| Rating | Number (1 decimal) | 4.5 |

### Record Counts
- **Total Records**: 55 (original dataset)
- **Filtered Records**: Updates as you apply filters

When "Filtered Records" is 0, you see "No results found" message.

---

## Common Filtering Scenarios

### Scenario 1: Find Engineering Managers Earning $90k+
1. Add Filter: Department → Is → Engineering
2. Add Filter: Role → Contains → Manager
3. Add Filter: Salary → Between → Min: 90000 → Max: 200000

### Scenario 2: Find Inactive Employees in Marketing
1. Add Filter: Department → Is → Marketing
2. Add Filter: Active Status → Is → (leave unchecked)

### Scenario 3: Find React Developers Who Joined in 2021
1. Add Filter: Skills → In → Check "React"
2. Add Filter: Join Date → Between → Jan 1, 2021 to Dec 31, 2021

### Scenario 4: Find Employees from California Cities
1. Add Filter: City → Contains → (specific city like "San" for multiple San Francisco options)

### Scenario 5: Find Employees Based in New York with Rating > 4.0
1. Add Filter: City → Equals → New York
2. Add Filter: Performance Rating → Greater Than → 4.0

---

## Tips & Tricks

### Text Searching
- **Case-insensitive**: "john" will find "John", "JOHN", "jOhN"
- **Partial matching**: "smith" will find "John Smith", "Mary Smithson"
- **Special characters**: "C++" will work correctly

### Number Filters
- **Leave one value blank** for open-ended ranges
  - Min: 100000, Max: blank = $100k and above
  - Min: blank, Max: 70000 = $70k and below

### Multiple Filters
- **AND logic**: All filters must match
- Example: "Engineering" AND "Salary between $80k-$100k" shows only engineers earning in that range
- To get OR logic, use multiple filters on the same field type (use multiple "City" filters with "Is Not")

### Performance
- The table updates instantly - no lag even with multiple filters
- Sorting works smoothly on filtered results
- No need to click "Apply" - filters apply automatically

---

## If Something Goes Wrong

### No Results Showing
- **Check your filters**: Are they too restrictive?
- **Try "Clear All"**: Removes all filters, shows all 55 records
- **Check the count**: "Filtered Records: 0" confirms no matches

### Unexpected Results
- **Review your operators**:
  - "Is" means exactly that value
  - "Contains" means text appears anywhere
  - "Between" is inclusive on both ends
- **Check case sensitivity**: Numbers/dates are case-sensitive, text is not

### Want to Reset
- Click **"Clear All"** button to remove all filters at once
- All filters can be removed individually using trash icons

---

## Data Dictionary

### Employees Dataset
- **Total Records**: 55
- **Departments**: 7 (Engineering, Design, Product, Sales, Marketing, HR, Finance)
- **Salary Range**: $60,000 - $130,000
- **Join Dates**: 2019 - 2023
- **Status**: Mix of Active and Inactive employees
- **Performance Ratings**: 3.5 - 4.9

### Available Filters Summary
- 12 fields available
- 19 different operators across all types
- 7 different data types supported
- Complex nested object support (address.city)

---

## Keyboard Navigation

- **Tab**: Move between form inputs
- **Enter**: Select dropdown options
- **Space**: Toggle checkboxes
- **Arrow Keys**: Navigate dropdown lists

All interactive elements are keyboard accessible.

---

## Browser Compatibility

Works on:
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## Questions?

Refer to the comprehensive documentation:
- **README.md**: Full setup and feature guide
- **TESTING.md**: 94 test cases showing all features
- **ARCHITECTURE.md**: Technical design decisions
- **REQUIREMENTS_CHECKLIST.md**: Complete requirements verification

---

**Happy Filtering! 🚀**
