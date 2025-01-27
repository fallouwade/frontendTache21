import { IoStarOutline } from "react-icons/io5";

export default function CardService({ src, service }) {
    return (
        <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
                <img
                    alt="Home in Countryside"
                    className="h-48 w-full object-cover object-end"
                    src={src}
                />
                <div className="p-6">
                    <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                        {service}
                    </h4>
                    <div className="mt-1">
                        <span>$1,900.00</span>
                        <span className="text-gray-600 text-sm">/ wk</span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                        <span className="text-teal-600 font-semibold">
                            <span>
                                <span className="flex text-warning">
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                </span>
                                <span className="ml-2 text-gray-600 text-sm">34 reviews</span>
                            </span>
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded">
                            Reserver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
