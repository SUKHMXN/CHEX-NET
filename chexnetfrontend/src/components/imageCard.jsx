const imageCard = ({imageUrl,confidencescore})=>{

  return (
    <div className="card " >
      <div className="relative aspect-[4/3] overflow-hidden group">
        <img
          src={imageUrl}
          onClick={onclick}
          alt="x-Ray"
          className="img-fluid w-100 h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        </div>
      </div>

      <div className="p-2">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight">Confidence_score:{confidencescore}</h3>
      </div>
    </div>
  );

}
export default imageCard
