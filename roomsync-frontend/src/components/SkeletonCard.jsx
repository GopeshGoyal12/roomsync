function SkeletonCard() {

  return (

    <div className="animate-pulse bg-white p-4 rounded-xl w-[280px] shadow">

      <div className="bg-gray-300 h-40 rounded"></div>

      <div className="h-4 bg-gray-300 mt-4 w-2/3"></div>

      <div className="h-4 bg-gray-300 mt-2 w-1/2"></div>

      <div className="h-8 bg-gray-300 mt-4 rounded"></div>

    </div>

  );
}

export default SkeletonCard;