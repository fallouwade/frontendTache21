function FavoriteBadge({ count }) {
    if (count === 0) return null
  
    return (
      <div className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
        {count}
      </div>
    )
  }
  
  export default FavoriteBadge
  
  