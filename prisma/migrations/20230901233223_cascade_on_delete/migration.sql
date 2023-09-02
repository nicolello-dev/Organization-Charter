-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_teamName_fkey";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_teamName_fkey" FOREIGN KEY ("teamName") REFERENCES "Team"("name") ON DELETE CASCADE ON UPDATE CASCADE;
