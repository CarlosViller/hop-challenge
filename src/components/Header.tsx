export default function Header() {
  return (
    <header className="bg-primary py-4">
      <section className="flex justify-center items-end mx-auto gap-2">
        <img width={120} src="./logo.png" alt="logo" />
        <h1 className="font-indie text-white text-4xl">Kanban</h1>
      </section>
    </header>
  );
}
