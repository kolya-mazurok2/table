# Table

# Description

- Display a simple table with columns of your choice (it can be a table for some products, tasks, documents or any other items). It is advisable to use react-table library (it is used on the project).
- For table items create sample request (without real backend request, just return your mock data).
- Add sorting for some columns (you can use react-table hooks). 
- Add a search box above the table and filter table items based on the search value.
- Add a column with checkboxes, in the column header, the checkbox should select/uncheck all items. Each individual row checkbox selects/unselect that row. Selected items save in state (use any state manager you - prefer).
- Display only selected rows on another page.

Think of this small task as an extensible project with reusable components. So in the future it may be several tables (some with sorting, checkboxes, some without) and so on. I'm just wondering how you will structure your project.

# Recommendations:
- react-table
- state manager - (any, Redux и react-query are used on the project)
- styles - any approach (modules are used on the project)
- typescript (preferred but not required, structure is more important)
