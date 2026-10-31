const Product = () => {
  return (
    <div>
      <h1>Our collection</h1>

      <div className="relative w-full h-[600px] flex justify-center pt-10">
        {/* 1. THE HANGER (Background) */}
        <img
          src="/hanger.png"
          alt="hanger"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px]"
        />

        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="relative group w-[150px] h-[200px]">
            {/* Side View (Visible first) */}
            <img
              src="/sideview.png"
              alt="side-view-t-shirt"
              className="absolute top-0 left-0 w-[150px] opacity-100 group-hover:opacity-0 transition-opacity duration-700"
            />

            {/* Front View (Hidden first) */}
            <img
              src="/fornt.png"
              alt="front-view-of-t-shirt"
              className="absolute top-0 left-0 w-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
