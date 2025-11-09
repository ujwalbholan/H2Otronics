const images = [
  "/images/prototype1.jpg",
  "/images/prototype2.jpg",
  "/images/dashboard.jpg",
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Prototype"
              className="rounded-lg shadow hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
