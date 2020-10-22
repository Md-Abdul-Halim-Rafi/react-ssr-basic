import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom"

function UserPage(props) {
  const [name, setName] = useState("undefined")
  const [data, setData] = useState(undefined)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(window.initialData.name)
      setData(window.initialData.data)

      delete window.initialData
    }
  }, [])

  console.log(data, typeof window !== "undefined" && window.initialData)
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>{name}</h1>
        <div>
          <a className="App-link" href="/">Home</a>
        </div>
      </header>
    </div>
  );
}

export default UserPage;
