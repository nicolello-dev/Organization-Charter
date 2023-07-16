import { Employee } from "@prisma/client";

export default function ViewData(props: {data: Employee[] | undefined}){
    const { data } = props;
    if(data == undefined) {
        return <h1>Data not yet loaded. Please hang in while the request compiles. If this is the first request of the day, it might take up to 20 seconds</h1>
    }
    // Tribe -> Function -> Area -> Team
    const tribeHash: {[key: string]: {lead: string, employees: Employee[]}} = {};
    const functionHash: {[key: string]: {lead: string, employees: Employee[]}} = {};
    const areaHash: {[key: string]: {lead: string, employees: Employee[]}} = {};
    const teamHash: {[key: string]: {lead: string, employees: Employee[]}} = {};
    for (const employee of data) {
        if(tribeHash[employee.tribe]?.employees) {
            tribeHash[employee.tribe]?.employees.push(employee);
        } else {
            tribeHash[employee.tribe] = {lead: employee.tribe_lead, employees: [employee]}
        }
        if(functionHash[employee.function]?.employees) {
            functionHash[employee.function]?.employees.push(employee);
        } else {
            functionHash[employee.tribe] = {lead: employee.function_lead, employees: [employee]}
        }
        if(areaHash[employee.area]?.employees) {
            areaHash[employee.area]?.employees.push(employee);
        } else {
            areaHash[employee.tribe] = {lead: employee.area_lead, employees: [employee]}
        }
        if(teamHash[employee.team]?.employees) {
            teamHash[employee.team]?.employees.push(employee);
        } else {
            teamHash[employee.tribe] = {lead: employee.team_lead, employees: [employee]}
        }
    }
    return (
        <div className="flex">
            {
                Object.keys(tribeHash).map(tribe_name => {
                    const tribe_lead = tribeHash[tribe_name]?.lead;
                    return <div className="w-6/12 text-center bg-[#1c4587] m-3 p-3 rounded-2xl text-white max-h-screen overflow-y-auto">
                        <div className="m-3">
                            <h3>{tribe_name}</h3>
                            <h5>{tribe_lead}</h5>
                        </div>
                        <div className="flex flex-row flex-wrap justify-center">
                        {tribeHash[tribe_name]?.employees.map(e => {
                            return <pre className="m-2">
                                {e.team_member}
                            </pre>
                        })}
                        </div>
                    </div>
                })
            }
        </div>
    )
}