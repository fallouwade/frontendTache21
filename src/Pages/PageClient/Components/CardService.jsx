import { IoStarOutline } from "react-icons/io5";

export default function CardService() {
    return (
        <div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                    alt="Home in Countryside"
                    className="h-48 w-full object-cover object-end"
                    src="https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80"
                />
                <div className="p-6">
                    <div className="flex items-baseline">
                        <span className="inline-block bg-teal-200 text-teal-800 py-1 lg:px-4 text-[12px] lg:text-xs rounded-full uppercase font-semibold tracking-wide">
                            New
                        </span>
                        <div className="ml-2 text-gray-600 text-[9px] font-bold uppercase tracking-wide">
                            3 beds • 2 baths
                        </div>
                    </div>
                    <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
                        Beautiful Home in the countryside
                    </h4>
                    <div className="mt-1">
                        <span>$1,900.00</span>
                        <span className="text-gray-600 text-sm">/ wk</span>
                    </div>
                    <div className="mt-2 flex items-center">
                        <span className="text-teal-600 font-semibold">
                            <span>
                                <span className="flex">
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                    <IoStarOutline />
                                </span>
                                <span className="ml-2 text-gray-600 text-sm">34 reviews</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
