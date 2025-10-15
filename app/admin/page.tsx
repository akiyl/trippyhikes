import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "../../lib/auth";
import AdminUI from "./AdminUI";

export default async function AdminPage() {
  const session = (await getServerSession(
    authOptions as any
  )) as Session | null;
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Access denied</h2>
          <p className="mt-2">You need to be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <h1 className="text-3xl font-bold mb-4">Admin</h1>
      {/* Client-side admin UI */}
      <AdminUI />
    </div>
  );
}
