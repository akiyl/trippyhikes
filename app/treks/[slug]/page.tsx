import { notFound } from "next/navigation";

type Trek = {
  id: string;
  name: string;
  slug: string;
  location: string;
  description: string;
};

async function getTrekBySlug(slug: string): Promise<Trek | null> {
  // Replace with your DB fetch
  const data: Trek[] = [
    {
      id: "1",
      name: "Everest Base Camp",
      slug: "everest",
      location: "Nepal",
      description:
        "A classic trek in the Himalayas reaching up to the Everest Base Camp.",
    },
    {
      id: "2",
      name: "Kilimanjaro",
      slug: "kilimanjaro",
      location: "Tanzania",
      description:
        "The highest mountain in Africa, offering multiple trekking routes.",
    },
  ];
  return data.find((t) => t.slug === slug) ?? null;
}

export default async function TrekDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const trek = await getTrekBySlug(params.slug);

  if (!trek) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{trek.name}</h1>
      <p className="text-gray-500">{trek.location}</p>
      <p className="mt-4">{trek.description}</p>
    </div>
  );
}
