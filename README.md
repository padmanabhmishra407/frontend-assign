# Dynamic Filter Component System

A professional, reusable dynamic filter component system built with React 18, TypeScript, and Material-UI. This system provides real-time filtering of complex datasets with support for multiple data types and operators.

## Features

### Core Filtering Capabilities
- **Multi-Type Support**: Text, Number, Date, Amount/Currency, Single Select, Multi-Select, Boolean
- **Dynamic Operators**: Context-appropriate operators for each field type
- **Real-Time Updates**: Instant table updates as filters are applied
- **Nested Object Filtering**: Support for dot notation (e.g., `address.city`)
- **Client-Side Processing**: Fast, responsive filtering of 55 employee records

### Field Type Support

| Field Type | Operators | Input Method |
|-----------|-----------|--------------|
| Text | Equals, Contains, Starts With, Ends With, Does Not Contain | Text input |
| Number | Equals, Greater Than, Less Than, ≥, ≤ | Number input |
| Date | Between | Date range picker |
| Amount | Between | Min/Max input |
| Single Select | Is, Is Not | Dropdown |
| Multi-Select | In, Not In | Multi-checkbox |
| Boolean | Is | Toggle checkbox |

## Project Structure

```
src/
├── components/
│   ├── FilterBuilder.tsx          # Main filter builder container
│   ├── FilterConditionRow.tsx      # Individual filter condition UI
│   ├── FilterValueInput.tsx        # Type-specific input renderers
│   └── DataTable.tsx               # Data display and sorting
├── data/
│   └── sampleData.ts               # 55 employee records + field definitions
├── types/
│   └── index.ts                    # TypeScript type definitions
├── utils/
│   └── filterLogic.ts              # Filtering algorithms
├── App.tsx                         # Main app component
├── main.tsx                        # Entry point
└── index.css                       # Global styles
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd frontend-assign

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## Usage Examples

### Basic Filtering

1. **Text Filter**: Filter employees by name containing "Smith"
   - Field: Name
   - Operator: Contains
   - Value: Smith

2. **Salary Range**: Find employees earning between $80,000 and $120,000
   - Field: Salary
   - Operator: Between
   - Values: Min: 80000, Max: 120000

3. **Department Selection**: Filter for specific departments
   - Field: Department
   - Operator: Is
   - Value: Engineering (or Design, Product, etc.)

4. **Skills Filter**: Find employees with specific skills
   - Field: Skills
   - Operator: In
   - Values: Select React, TypeScript, etc.

5. **Active Status**: Show only active employees
   - Field: Active Status
   - Operator: Is
   - Value: Checked

## Data Structure

The sample dataset includes 55 employee records with the following structure:

```typescript
{
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
  skills: string[];
  address: {
    city: string;
    state: string;
    country: string;
  };
  projects: number;
  lastReview: string;
  performanceRating: number;
}
```

## Technical Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Lightning-fast dev server and build
- **Material-UI 5**: Professional component library
- **Lucide React**: Clean, minimal icons

## Skills Demonstrated (aligned with job description)

- **React.js & Modern Frontend**: Component-driven design using React 18 and hooks; real-time UI updates and controlled inputs.
- **HTML5 & CSS3**: Semantic markup and responsive layout with Material-UI theming and CSS utilities.
- **JavaScript & TypeScript**: Strong use of TypeScript for type safety and modern JavaScript features for clean, maintainable code.
- **State Management**: Local and derived state using React hooks; code structured to integrate Redux or Context API as needed.
- **API Integration Ready**: Clear separation between UI and data logic; ready to consume RESTful APIs and handle async requests.
- **Performance Optimization**: Memoization, O(n) filtering, and minimal re-renders for responsive UX.
- **Debugging & Testing Mindset**: Defensive programming, clear error handling, and documented test cases for QA.
- **Collaboration & Version Control**: Structured code, clear component boundaries, and Git-friendly workflow for code reviews.
- **Responsive & Cross-Browser**: The UI is responsive and tested across modern browsers and viewports.

These points map directly to the responsibilities and requirements in the position description and demonstrate the hands-on skills a candidate would need to contribute effectively.

## Testing Instructions

### Text Filters
- Filter by name containing specific text
- Test "Starts With" and "Ends With" operators
- Verify case-insensitive matching

### Numeric Filters
- Set salary ranges
- Filter by performance rating
- Test all comparison operators

### Date Filters
- Select date ranges for join dates
- Verify boundary conditions

### Multi-Select Filters
- Select multiple skills
- Verify "In" returns matching records
- Test "Not In" operator

### Edge Cases
- Apply filters with no results
- Clear all filters
- Remove individual filters
- Sort filtered results

## Component API

### FilterBuilder
Main component for building and managing filters.

```typescript
interface FilterBuilderProps {
  filters: FilterCondition[];

# Dynamic Filter Component — One-page Summary

Clean, production-ready dynamic filter component system built with React 18 and TypeScript. The project demonstrates frontend engineering skills relevant to hiring managers and recruiters: component design, type-safe code, performance-conscious UI, and practical UX for data exploration.

Highlights
- Real-time, client-side filtering of a 55-record employee dataset
- Supports text, number, date, currency, single-select, multi-select, and boolean filters
- Nested field access (dot notation) and array matching for multi-select
- Sortable, formatted data table with record counts and clear "no results" feedback

Key Skills Demonstrated
- React.js (hooks, component composition)
- TypeScript (strict typing, discriminated unions)
- HTML5/CSS3 & Material-UI for responsive, accessible UI
- State management patterns (local state + derived memoized data)
- Performance: memoized filters, minimal re-renders, efficient algorithms
- Collaboration-ready: clear folder structure, small focused components, Git-ready repository

Quick Start (for reviewers)
```bash
cd frontend-assign
npm install
npm run dev
# open http://localhost:5173
```

What to review (suggested)
- `src/components/FilterBuilder.tsx` — filter UI and orchestration
- `src/components/FilterConditionRow.tsx` — field/operator/value handling
- `src/components/FilterValueInput.tsx` — type-specific inputs
- `src/utils/filterLogic.ts` — filtering algorithms and nested access

Cleaner documentation archive
For full technical details, tests and design rationale see the archived docs in `archive_docs/` (kept intentionally concise at root for recruiter review).

Contact / Notes
- Ready for interview walkthroughs: demo, code tour, and discussion of extensibility or integration with APIs.

---
This single-page README is intentionally concise for hiring and review purposes. Detailed implementation and test artifacts are in `archive_docs/`.
### Type Safety

