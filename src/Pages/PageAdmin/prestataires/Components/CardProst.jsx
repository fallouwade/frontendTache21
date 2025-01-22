

function CardProst({color, nombre, titre, icone, description}) {
    return (
        <div className="max-w-1/4 bg-white border border-gray-200 rounded-lg 
                shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className={`flex items-center justify-around mb-2 py-1 text-md ${color} text-center font-semibold tracking-tight  
                        dark:text-white rounded-t-lg `}>
                {titre} <span>{icone}</span>
            </h5>
            <div className="flex gap-3 mb-3 font-normal text-gray-500 dark:text-gray-400 p-2 px-4">
                <span className="bg-blue-200 px-1 text-gray-600 font-bold rounded-md">
                    {nombre}
                </span>
                <p className="text-black text-md">{description}</p>
            </div>
        </div>

    )
}

export default CardProst