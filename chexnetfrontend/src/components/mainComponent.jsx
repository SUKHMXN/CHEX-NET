import React,{useState,useEffect} from 'react';
import ImageCard from "./imageCard.jsx"


const MainComponent = ()=>{
    const [images,setImages]=useState([])
    const [confidencescore,setConfidencescore] = useState([])
    

    useEffect(()=>{
        const fetchImages = async ()=>{
            try {
                const response = await fetch('/api/images/getimages', {
                method: 'GET',
              });
              const data = await response.json();
              console.log(data)

              setConfidencescore(data[0].images.map((score)=>score.Confidence_score))
              if(Array.isArray(data) && data[0].images) {
              const imageUrls = data[0].images.map((img)=>img.imageFile.url)
              setImages(imageUrls)

              console.log(data[0].images.map((score)=>score.Confidence_score))
            }
          }catch(error){
            console.error("Error fetching images:", error);
            
          }
      }
      fetchImages();
    },[])

    return (
        <div>
         {images.length===0?
         <h4>No Uploads found</h4> :
         (<div className="Image-container">
          {images.map((image, index) => (
                <ImageCard imageUrl={image} confidencescore={confidencescore[index].toFixed(2)} key={index}/>
          ))}
        </div>)}
        </div>
        
      );
}

export default MainComponent