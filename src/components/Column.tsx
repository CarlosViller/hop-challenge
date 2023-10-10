type Props = {
  title: string;
};

export default function Column({ title }: Props) {
  return (
    <section className="border-2 border-gray-200">
      <h2 className="px-2 text-2xl font-indie font-bold mb-2">{title}</h2>
    </section>
  );
}
