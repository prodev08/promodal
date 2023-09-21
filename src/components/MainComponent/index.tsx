import React from "react";

const MainComponent = () => {
  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <button className="btn btn-primary btn-lg btn-block mb-2 color-a">
            All Contacts
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary btn-lg btn-block mb-2 color-b">
            US Contacts
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <label>
          <input type="checkbox" />
          &nbsp;Only even
        </label>
      </div>
    </div>
  );
};

export default MainComponent;
