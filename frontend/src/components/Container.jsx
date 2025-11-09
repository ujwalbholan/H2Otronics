const Container = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-4/5 mx-auto bg-gray-100">
      {children}
    </div>
  );
};

export default Container;
