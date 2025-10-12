import Link from "next/link";

type Trek = {
  id: string;
  name: string;
  slug: string;
  location: string;
};

async function getTreks(): Promise<Trek[]> {
  // Replace with your DB fetch
  return [
    { id: "1", name: "Everest Base Camp", slug: "everest", location: "Nepal" },
    { id: "2", name: "Kilimanjaro", slug: "kilimanjaro", location: "Tanzania" },
  ];
}

export default async function TreksPage() {
  const treks = await getTreks();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Treks</h1>
      <ul className="space-y-4">
        {treks.map((trek) => (
          <li
            key={trek.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{trek.name}</h2>
            <p className="text-gray-600">{trek.location}</p>
            <Link
              href={`/treks/${trek.slug}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
