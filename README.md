# Demo-Manufacturing-Kanban
Quick demo web app of a basic manufacturing kanban system

Uses a sqlite databse on s3. Uses django-s3-sqlite. Requires binary static build of SQLite. Include _sqlite3.co in the root of django project. See https://github.com/FlipperPA/django-s3-sqlite

Notes
- Single page web app, everything is directly accessible from the index, other urls are used to process item creation and deletion
- Uses sortable and htmx
- Index generates locations as columns
- Locations generates work order cards for all work order in the column
- When things are moved, the sequence is stored as priority, as in the priority for each card at the location
- The save is initiated at the destination location column, all work orders get the location set, there might be a more optimal way to only assigned the moved item
- The entire location column is replaced during the sort. Each column is basically a form which submits all items and the location