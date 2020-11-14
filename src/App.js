import { useEffect, useState } from "react";
import ImageCard from "./components/imageCard";
import ImageSearch from "./components/imageSearch";
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [safe, setSafe] = useState(true);
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true&safesearch=${safe}`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [term, safe]);
  return (
    <div className="container mx-auto mt-2">
      <ImageSearch
        searchText={(text, safe) => {
          setTerm(text);
          setSafe(safe);
        }}
      />
      {isLoading ? (
        <h1 className="text-6xl mx-auto text-center mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
