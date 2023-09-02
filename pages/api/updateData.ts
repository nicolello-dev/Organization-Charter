import type { NextApiRequest, NextApiResponse } from "next";

import { updateData } from "lib/api/updateData";

export default async function handler(_req: NextApiRequest, res: NextApiResponse<string>) {
    try {
        await updateData();
        res.status(200).send("Data updated correctly!" + new Date().getDate())
    } catch(err) {
        console.log(err);
        res.status(500).send("An unexpected error occurred! Please check logs")
    }
}