import { useContext, useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if(idx >= text.length - 1) {
        idx = 0;
      } else {
        idx+=1;
      }
      setSelectedText(text[idx])
    }, 5000);

    return () => clearInterval(interval);
  }, [])
  
  return (
    <div className="">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#034a76"
        ariaLabel="puff-loading"
        wrapperStyle={{
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999999",
          backgroundColor: "#0000003d",
        }}
        wrapperClass=""
        visible={true}
      />
      
    </div>
    
  );
};

export default Loader;
