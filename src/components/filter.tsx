export default function Filters() {

    const filters = [
        'team', 'area', 'function', 'tribe'
    ];

    return (
        <>
        <h1 className="text-xl m-6">
            Filters:
        </h1>
            {
                filters.map(filter => 
                        <>
                            <p className="m-2">{filter}:</p>
                            <input className="border-gray-300 border-2 mb-4" type="text"/>
                        </>
                    )
            }
        <button className="bg-black text-white p-3 m-4 rounded-xl">
            Filter
        </button>
        </>
    )
}