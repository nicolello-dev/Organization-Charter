import { teamInfo } from "@/lib/components/viewData";

describe("viewData teamInfo test", () => {
    test("teams that exist", async () => {
       expect(await teamInfo("Team 1")).toEqual({
            "Team": "Team 1",
            "Team Lead": "Team Lead  1",
            "Domain": "",
            "Domain Lead": "",
            "Tribe Area": "Tribe Area 1",
            "Tribe Area Lead": "Tribe Area Lead 1",
            "Tribe": "Tribe 1",
            "Tribe Lead": "Tribe Lead 1"
        });
        expect(await teamInfo("Team 59")).toEqual({
            "Team": "Team 59",
            "Team Lead": "Team Lead 59",
            "Domain": "",
            "Domain Lead": "",
            "Tribe Area": "Tribe Area 4",
            "Tribe Area Lead": "Tribe Area Lead 4",
            "Tribe": "Tribe 3",
            "Tribe Lead": "Tribe Lead 3"
        })
    });
    test("Teams that don't exist", async () => {
        expect(await teamInfo("Random team name that doesn't exist")).toBe(null);
    });
});