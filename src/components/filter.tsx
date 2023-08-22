export default function Filters() {

    const filters = [
        'team', 'area', 'function', 'tribe'
    ];

    return (
        <>
        <h1 className="text-xl m-6">
            Filters:
        </h1>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
            {
                filters.map((filter, i) => 
                        <div key={i} className="text-center">
                            <p className="m-2">{filter}:</p>
                            <input className="border-gray-300 border-2 mb-4" type="text"/>
                            <p className="m-2">{filter} lead:</p>
                            <input className="border-gray-300 border-2 mb-4" type="text"/>
                        </div>
                    )
            }
        </div>
        <button className="bg-black text-white p-3 m-4 rounded-xl">
            Filter
        </button>
        </>
    )
}