import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboard() {
  const session = (await getServerSession(
    authOptions as any
  )) as Session | null;
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Access denied</h2>
          <p className="mt-2">You need to be an admin to view this page.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const treks = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mt-9 mb-4">Admin dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add new trek</h2>
        <form
          id="create-trek"
          action="/api/admin/treks"
          method="post"
          className="space-y-2 max-w-xl"
        >
          <input
            name="name"
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            name="slug"
            placeholder="slug"
            className="w-full p-2 border rounded"
          />
          <input
            name="imageSrc"
            placeholder="imageSrc"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="description"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Existing treks</h2>
        <ul className="space-y-3">
          {treks.map((t: any) => (
            <li
              key={t.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-gray-600">{t.slug}</div>
              </div>
              <form method="delete" action="/api/admin/treks" className="ml-4">
                <input type="hidden" name="id" value={String(t.id)} />
                <button
                  type="submit"
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
