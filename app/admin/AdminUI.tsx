"use client";

import { useEffect, useState } from "react";

type Destination = {
  id: number;
  name: string;
  slug?: string | null;
  imageSrc?: string;
  description?: string;
};

export default function AdminUI() {
  const [items, setItems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [grade, setGrade] = useState("");
  const [region, setRegion] = useState("");
  const [maxAltitude, setMaxAltitude] = useState("");
  const [baseCamp, setBaseCamp] = useState("");
  const [season, setSeason] = useState("");
  const [month, setMonth] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [foodStay, setFoodStay] = useState("");
  const [trailType, setTrailType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [trekItinerary, setTrekItinerary] = useState("");
  const [costTerms, setCostTerms] = useState("");
  const [trekEssentials, setTrekEssentials] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/treks");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setItems(data || []);
    } catch (e: any) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const createItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCreating(true);
    try {
      // Convert numeric fields before sending
      const payload: any = {
        name,
        slug,
        imageSrc,
        description,
        duration,
        grade,
        region,
        baseCamp,
        season,
        month,
        pickupLocation,
        dropLocation,
        foodStay,
        trailType,
        requirements,
        trekItinerary,
        costTerms,
        trekEssentials,
      };

      if (price !== "") payload.price = parseFloat(price);
      if (distance !== "") payload.distance = parseFloat(distance);
      if (maxAltitude !== "") payload.maxAltitude = parseInt(maxAltitude, 10);

      const res = await fetch("/api/admin/treks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Create failed");
      // clear all fields
      setName("");
      setSlug("");
      setImageSrc("");
      setDescription("");
      setPrice("");
      setDuration("");
      setDistance("");
      setGrade("");
      setRegion("");
      setMaxAltitude("");
      setBaseCamp("");
      setSeason("");
      setMonth("");
      setPickupLocation("");
      setDropLocation("");
      setFoodStay("");
      setTrailType("");
      setRequirements("");
      setTrekItinerary("");
      setCostTerms("");
      setTrekEssentials("");
      await fetchItems();
      setSuccess("Created successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: any) {
      setError(e.message || "Error");
    }
    setCreating(false);
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Delete this trek?")) return;
    try {
      const res = await fetch(`/api/admin/treks?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchItems();
    } catch (e: any) {
      setError(e.message || "Error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage destinations</h2>

      <form onSubmit={createItem} className="space-y-4 mb-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
            disabled={creating}
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (numeric)"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (e.g., 5 days)"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance (km)"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Grade"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Region"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={maxAltitude}
            onChange={(e) => setMaxAltitude(e.target.value)}
            placeholder="Max Altitude (m)"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={baseCamp}
            onChange={(e) => setBaseCamp(e.target.value)}
            placeholder="Base Camp"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            placeholder="Season"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Month"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Pickup Location"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            placeholder="Drop Location"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={foodStay}
            onChange={(e) => setFoodStay(e.target.value)}
            placeholder="Food/Stay"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={trailType}
            onChange={(e) => setTrailType(e.target.value)}
            placeholder="Trail Type"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Requirements"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <textarea
            value={trekItinerary}
            onChange={(e) => setTrekItinerary(e.target.value)}
            placeholder="Trek Itinerary"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <textarea
            value={costTerms}
            onChange={(e) => setCostTerms(e.target.value)}
            placeholder="Cost Terms"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <textarea
            value={trekEssentials}
            onChange={(e) => setTrekEssentials(e.target.value)}
            placeholder="Trek Essentials"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Destination"}
          </button>
        </div>
      </form>

      {success && <div className="text-green-600 mb-4">{success}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <div>
                <div className="font-bold">{it.name}</div>
                <div className="text-sm text-gray-600">{it.slug}</div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => deleteItem(it.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
