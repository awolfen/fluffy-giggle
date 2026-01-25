# Implementation Notes

## Task 1:

### Bug Fix: `computeSummary`

`averagePricePerTonne` was being calculated by number of positions instead of total tonnes.

- Changed calculation to `totalValue / totalTonnes`
- Added handling for edge case where `totalTonnes = 0`
- Considered adding error handling wrapper for components (assumed out of scope)

### Frontend Implementation

- Built to match existing positions table styling
- Hooked up to backend API using `useEffect` and `fetch`
- Considered switching to `useQuery` for better caching (not necessary for this use case)
- Considered better space utilization (assumed out of scope)

### Performance: Slow Response Handling

Improved user experience during loading:

- Moved fetching logic into the component
- Rendered component with static text immediately
- Used `isLoading` state to conditionally render data
- Added `Skeleton` wrappers for graceful loading state

**Future Considerations:**

- Could add unit tests to verify display logic (assumed out of scope - tests mentioned explicitly in Task 2)

## Task 2:

### Extend BE for filtered summary

- Updated API using query params by `PositionStatus` & added validation in handler
- Updated summary computation logic (assumed default is unfiltered)
- added tests
- added a status filter on the FE, designed to fit in with existing UI

**Future Considerations**

- Could consider a custom validation logic to avoid repeated code if we are adding more handlers with verification (auth, types, or any other config...)

## Task 3:

### Handle slow API performance

- Using `Skeleton` wrapper

## Task 4:

### Update FE to handle status filtering

- Using `StatusFilter`

## Task 5:

### Updating these notes!

## Review

Missing dependency in `useEffect` to `fetchSummary`

- We could move the logic into the `useEffect` hook.
- We could wrap `fetchSummary` with a `useCallback` hook (which would let us use it outside of the `useEffect` if we needed to)
- We could switch to `useQuery`, solving both this issue as well as our cacheing issue when using our `StatusFilter`
  Option 3 sounds best so lets go with that!

Reduce some code repetition and sets us up for refactoring the positions table when/if in scope.

Next step would be to re-review (looking at code structure, abstraction of logic, adding tests).

####

raw notes:
Npm vulnerabilities found during install
Run npm audit fix
Option 1 for simplicity
Option 3 running the app - access to logs for both

Something I might look into during downtime:
Browserslist: browsers data (caniuse-lite) is 7 months old. Please run:
npx update-browserslist-db@latest

positions.length -> totalTonnes to get weighted average
Add edge case handling for 0 totalTonnes Could perhaps also throw error here and create a custom error handler wrapper for components

Could switch useEffect for useQuery  Use the same styling and create a new table to display summary info

Consider abstracting table logic and styling for a table general component

Move loading logic into Portfolio summary table, add skeleton logic for loading data to handle api response gracefully.

Restructure pages folder -> App routing should serve as a skeleton for the app design  Utils folder with shared function (for formatting), not repeating code/single source of truth a priority  Consider redesign on the summary table to better fit the size, assume this is out of scope for now
 Are we showing both (available and retired by default), if we are already fetching both I feel this kind of filter would make sense on the front end\*

Consider new tsconfig file for tests to remove cosmetic errors - leave out of scope for now

Add tests for filtering summary

Should filtering happen in the service layer or handler? Service layer - part of business logic/can be used elsewhere
Should the summary endpoint accept new parameters of new endpoint? Param - it is optional and works with back compat
Type the filter parameter? With existing type - no need to complicate
Expose this as an optional parameter.

Consider abstracting a hook to fetch data (useQuery/useEffect)

Update Notes file.

Review

Issue with re-fetching when switching statuses -> switched to useQuery to fix cacheing issue.

Reduce some code repetition and sets us up for refactoring the positions table when/if in scope.

Consider shared error handling hook (useEffect w/ Toast)

####
