import { useState } from "react";
import "./App.css";
import Form from "./components/ui/Form"; // Render Form first
import CreatePost from "./components/ui/CreatePost";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="flex justify-between max-w-5xl mx-auto">
        {" "}
        <div className="w-1/2">
          {" "}
          <Form />
        </div>
        <div className="w-1/2">
          {" "}
          <CreatePost />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
