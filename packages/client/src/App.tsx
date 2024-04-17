import { useEffect } from "react";

import { routes } from "@/pages/routes";
import Header from "@/components/header";
import Title from "@/ui/title";

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <div className="App">
      <Header>
        <Title.H2 title={"hello world"} />
      </Header>
    </div>
  );
}

export default App;
