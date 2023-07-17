import type { Employee } from "@prisma/client";

interface Team {
    name: string
    lead: string
    employees: Employee[]
}

interface Area {
    lead: string | undefined
    teams: Team[]
}

interface FunctionType {
    lead: string | undefined
    areas: Area[]
}

interface Tribe {
    lead: string | undefined
    functions: FunctionType[]
}

export default function ViewData(props: {data: Employee[] | undefined}){
    const { data } = props;
    if(data == undefined) {
        return <h1>Data not yet loaded. Please hang in while the request compiles. If this is the first request of the day, it might take up to 20 seconds</h1>
    }
    // Tribe -> Function -> Area -> Team
    const tribeHash: Tribe = { lead: undefined, functions: []};
    const functionHash: FunctionType = { lead: undefined, areas: []};
    const areaHash: {[key: string]: Area} = {};
    const teamHash: {[key: string]: Team} = {};
    for (const employee of data) {
        const team = teamHash[employee.team];
        if(team) {
            team.employees.push(employee);
        } else {
            teamHash[employee.team] = {
                name: employee.team,
                lead: employee.team_lead,
                employees: [employee]
            }
        }
    }
    for (const team of Object.values(teamHash)) {
        if(team.employees[0]) {
            const area = areaHash[team.employees[0]?.area]
            if(area) {
                area.teams.push(team);
            } else {
                areaHash[team.employees[0]?.area] = {
                    lead: team.employees[0].area_lead,
                    teams: [team]
                }
            }
        }
    }
    console.log(areaHash);
    return (
        <div className="flex flex-wrap justify-center">
            {
                Object.keys(areaHash).map(area_name => {
                    const area_lead = teamHash[area_name]?.lead;
                    return <div key={"area"+area_name} className="w-6/12 max-w-lg text-center border-2 m-3 p-3 rounded-2xl text-black">
                        <div className="m-3">
                            <h3>{area_name}</h3>
                            <h5>{area_lead}</h5>
                        </div>
                        {
                        areaHash[area_name]?.teams.map((team, i) => <div key={"team" + i.toString()} className="p-3 m-2 rounded-xl border-2">
                            <div className="m-3">
                                <h3>{team.name}</h3>
                                <h5>{team.lead}</h5>
                            </div>
                            <div className="flex flex-row flex-wrap justify-center">
                                {team.employees.map(e => <pre key={"name"+e.team_member} className="m-2">
                                        {e.team_member}
                                    </pre>
                                )}
                            </div>
                        </div>)
                        }
                    </div>
                })
            }
        </div>
    )
}