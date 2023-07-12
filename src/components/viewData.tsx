export default function ViewData(props: {data: object | undefined}){
    const { data } = props;
    if(data == undefined) {
        return <h1>Data not yet loaded. Please hang in while the request compiles</h1>
    }
    return (
        <>
            {
                JSON.stringify(data)
            }
        </>
    )
}