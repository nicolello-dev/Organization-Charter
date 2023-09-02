# ORGANIZATION CHARTER

A website where employees from GSG can see whom they need to contact with.

# For future developers:

This website is made with:

- NextJS
- TailwindCSS
- Prisma
- PostgreSQL running in an RDS from AWS

### Structure

A cron job will fetch new data everyday midnight, making a request to the `api/updateData` endpoint.
Whenever the application starts, every employee will be prompted to use the filters already in there. Upon doing that, a request to the `api/getFilteredEmployees` will be made to get the employees remaining after the filters.

### Types

All types are described in the `types` folder, and divided according to wher they're needed.