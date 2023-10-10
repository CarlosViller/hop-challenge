import Column from "./components/Column";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="max-w-screen-xl mx-auto my-10">
          <section className="grid grid-cols-3 gap-5">
            <Column title="Sin realizar" />
            <Column title="En proceso" />
            <Column title="Realizado" />
          </section>
      </main>
    </div>
  );
}

export default App;
