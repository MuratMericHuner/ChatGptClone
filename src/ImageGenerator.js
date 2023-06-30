import { useEffect, useState } from "react";

function ImageGenerator(){
    const [description, setDescription] = useState("")
    const [newImages, setNewImages] = useState(null)
    const [error, setError]= useState(null)

    const getImages = async ()=>{
      setNewImages(null)
      if(description===null){
        setError('You must put an image description')
        return
      }
      
      const options = {
        method : "POST",
        body: JSON.stringify({
            prompt: description,
        }),
        headers : {
          "Content-Type" : "application/json"
      }
    }
      try {
        const response = await fetch('http://localhost:8000/images',options)
        const data = await response.json()
        setNewImages(data)
      } catch (error) {
        console.error(error)
      }
    }

    return (
        <div className="ImageGen">
          <section className="search">
            <h3>Describe your image</h3>
            <div className="input-container-images">
                     <input value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                     <button onClick={getImages}>Generate Image</button>
            </div>
          {error && <p>{error}</p>}
          </section>
          <section className="images-section">
            {newImages?.map((image,index)=>(<img key={index} src={image.url} alt={description}/>))}    
          </section> 
        </div>
      );
}

export default ImageGenerator;