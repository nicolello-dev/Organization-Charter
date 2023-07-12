export default function ViewData(props: {data: object | undefined}){
    const { data } = props;
    if(data == undefined) {
        return <h1>Data not yet loaded. Please hang in while the request compiles. If this is the first request of the day, it might take up to 20 seconds</h1>
    }
    return (
        <>
            {
                JSON.stringify(data)
            }
        </>
    )
}