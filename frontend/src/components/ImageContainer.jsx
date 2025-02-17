import "../App.css";

function ImageContainer({ imageUrl, imageAlt }) {
  return (
    <div>
      <img
        src={imageUrl}
        alt={imageAlt}
        className="rounded-l-[10px] object-cover"
      />
    </div>
  );
}

export default ImageContainer;
