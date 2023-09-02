-- CreateTable
CREATE TABLE "Team" (
    "name" TEXT NOT NULL,
    "team_lead" TEXT NOT NULL,
    "domain" TEXT,
    "domain_lead" TEXT,
    "tribe_area" TEXT,
    "tribe_area_lead" TEXT,
    "tribe" TEXT,
    "tribe_lead" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "teamName" TEXT NOT NULL,
    "functional_lead" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_teamName_fkey" FOREIGN KEY ("teamName") REFERENCES "Team"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
