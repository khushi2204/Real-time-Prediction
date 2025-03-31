type CardProps = {
  title: string;
  content: string;
};

export default function Card({ title, content }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
