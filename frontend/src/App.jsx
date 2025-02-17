import MainForm from "./components/MainForm";
import Container from "./components/UI/Container/Container";
import Header from "./components/UI/Header/Header";
import Table from "./components/UI/Table/Table";

function App() {
  return (
    <div className="flex flex-col scroll-smooth">
      <header>
        <Header
          sections={[
            { title: "Extração", link: "#extract" },
            { title: "Modificação", link: "#modify" },
          ]}
        />
      </header>

      <section
        id="extract"
        className="bg-gray-300 h-screen w-full flex items-center justify-center"
      >
        <MainForm />
      </section>

      <section
        id="modify"
        className="h-screen flex items-center justify-center bg-gray-500"
      >
        <Table />
      </section>
    </div>
  );
}

export default App;
