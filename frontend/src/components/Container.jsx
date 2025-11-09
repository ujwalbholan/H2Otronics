// This componet is for just to structure the website

const Container = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-4/5 mx-auto">
      {children}
    </div>
  );
};

export default Container;
