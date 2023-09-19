-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Global', 'ProductOffering', 'RegionalBusiness');

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'Global';
