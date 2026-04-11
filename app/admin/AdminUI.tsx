"use client";

import { useState, useEffect } from "react";
import ImageUploadButton from "@/app/components/ImageUploadButton";

type Destination = {
  id: number;
  name: string;
  slug?: string | null;
  imageSrc?: string;
  description?: string;
};

type GalleryItem = {
  id: string;
  trek: string;
  imageSrc?: string | null;
  videoSrc?: string | null;
};

type ItienaryItem = {
  id: string;
  trek: string;
  QuickItinerary: string;
  DetailedItinerary: string;
  Inclusive?: string | null;
  Exclusion?: string | null;
  Rent?: string | null;
};

export default function AdminUI() {
  const [items, setItems] = useState<Destination[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [itineraryItems, setItineraryItems] = useState<ItienaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Trek fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  // Gallery fields
  const [galleryTrek, setGalleryTrek] = useState("");
  const [galleryImageSrc, setGalleryImageSrc] = useState("");
  const [galleryVideoSrc, setGalleryVideoSrc] = useState("");

  // Itinerary fields
  const [itineraryTrek, setItineraryTrek] = useState("");
  const [quickItinerary, setQuickItinerary] = useState("");
  const [detailedItinerary, setDetailedItinerary] = useState("");
  const [inclusive, setInclusive] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [rent, setRent] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/treks");
      if (!res.ok) throw new Error("Failed to load treks");
      const data = await res.json();
      setItems(data || []);
    } catch (e: any) {
      setError(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (!res.ok) throw new Error("Failed to load gallery");
      const data = await res.json();
      setGalleryItems(data || []);
    } catch (e: any) {
      console.warn(e.message || "Gallery load error");
    }
  };

  const fetchItineraryItems = async () => {
    try {
      const res = await fetch("/api/admin/itienary");
      if (!res.ok) throw new Error("Failed to load itineraries");
      const data = await res.json();
      setItineraryItems(data || []);
    } catch (e: any) {
      console.warn(e.message || "Itinerary load error");
    }
  };

  useEffect(() => {
    fetchItems();
    fetchGalleryItems();
    fetchItineraryItems();
  }, []);

  // Upload file first -> get URL
  const uploadImage = async () => {
    if (!imageFile) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
      if (!data.url) throw new Error("No URL returned");
      setImageSrc(data.url);
      setSuccess("Image uploaded successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: any) {
      setError(e.message || "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const createItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCreating(true);

    try {
      let finalImageUrl = imageSrc; // default to whatever the user typed in

      // 🖼️ If a file was selected in file input, upload it
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        } else {
          console.warn("⚠️ Image upload failed, continuing without image");
        }
      }

      // Build trek data payload
      const payload: any = {
        name,
        slug,
        imageSrc: finalImageUrl, // ✅ use uploaded or manually provided URL
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

      // Reset everything
      setName("");
      setSlug("");
      setImageSrc("");
      setImageFile(null);
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

  const createGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCreating(true);

    try {
      const payload = {
        trek: galleryTrek,
        imageSrc: galleryImageSrc || null,
        videoSrc: galleryVideoSrc || null,
      };

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gallery create failed");

      setGalleryTrek("");
      setGalleryImageSrc("");
      setGalleryVideoSrc("");

      await fetchGalleryItems();
      setSuccess("Gallery item created successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: any) {
      setError(e.message || "Error");
    }

    setCreating(false);
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchGalleryItems();
    } catch (e: any) {
      setError(e.message || "Error");
    }
  };

  const createItineraryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setCreating(true);

    try {
      const payload = {
        trek: itineraryTrek,
        QuickItinerary: quickItinerary,
        DetailedItinerary: detailedItinerary,
        Inclusive: inclusive || null,
        Exclusion: exclusion || null,
        Rent: rent || null,
      };

      const res = await fetch("/api/admin/itienary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Itinerary create failed");

      setItineraryTrek("");
      setQuickItinerary("");
      setDetailedItinerary("");
      setInclusive("");
      setExclusion("");
      setRent("");

      await fetchItineraryItems();
      setSuccess("Itinerary item created successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (e: any) {
      setError(e.message || "Error");
    }

    setCreating(false);
  };

  const deleteItineraryItem = async (id: string) => {
    if (!confirm("Delete this itinerary item?")) return;
    try {
      const res = await fetch(`/api/admin/itienary?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchItineraryItems();
    } catch (e: any) {
      setError(e.message || "Error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Destinations</h2>

      <form onSubmit={createItem} className="space-y-4 mb-6 max-w-4xl">
        {/* Image upload section */}
        <div className="space-y-2">
          <label className="block font-semibold">Upload Trek Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            disabled={creating || uploading}
            className="block w-full border p-2 rounded"
          />
          <div className="flex flex-col gap-3">
            <label className="font-medium">Trek Image (optional)</label>
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Uploaded preview"
                className="w-48 h-32 object-cover rounded border"
              />
            )}
            <ImageUploadButton onUploadComplete={(url) => setImageSrc(url)} />
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            placeholder="Image Src"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
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

        {/* Textareas */}
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

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Destination"}
        </button>
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
              <button
                onClick={() => deleteItem(it.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Trek Gallery</h2>
        <form
          onSubmit={createGalleryItem}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 max-w-4xl"
        >
          <input
            value={galleryTrek}
            onChange={(e) => setGalleryTrek(e.target.value)}
            placeholder="Trek name or slug"
            className="w-full p-2 border rounded"
            required
            disabled={creating}
          />
          <input
            value={galleryImageSrc}
            onChange={(e) => setGalleryImageSrc(e.target.value)}
            placeholder="Gallery image URL"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={galleryVideoSrc}
            onChange={(e) => setGalleryVideoSrc(e.target.value)}
            placeholder="Gallery video URL"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60 md:col-span-3"
            disabled={creating}
          >
            {creating ? "Saving gallery item..." : "Create Gallery Item"}
          </button>
        </form>

        {galleryItems.length > 0 ? (
          <ul className="space-y-3">
            {galleryItems.map((item) => (
              <li key={item.id} className="p-3 border rounded">
                <div className="font-semibold">{item.trek}</div>
                <div className="text-sm text-gray-600">
                  Image: {item.imageSrc || "none"}
                </div>
                <div className="text-sm text-gray-600">
                  Video: {item.videoSrc || "none"}
                </div>
                <button
                  onClick={() => deleteGalleryItem(item.id)}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete gallery item
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No gallery items yet.</div>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Trek Itinerary</h2>
        <form
          onSubmit={createItineraryItem}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 max-w-4xl"
        >
          <input
            value={itineraryTrek}
            onChange={(e) => setItineraryTrek(e.target.value)}
            placeholder="Trek name or slug"
            className="w-full p-2 border rounded"
            required
            disabled={creating}
          />
          <textarea
            value={quickItinerary}
            onChange={(e) => setQuickItinerary(e.target.value)}
            placeholder="Quick itinerary"
            className="w-full p-2 border rounded md:col-span-2"
            required
            disabled={creating}
          />
          <textarea
            value={detailedItinerary}
            onChange={(e) => setDetailedItinerary(e.target.value)}
            placeholder="Detailed itinerary"
            className="w-full p-2 border rounded md:col-span-2"
            required
            disabled={creating}
          />
          <input
            value={inclusive}
            onChange={(e) => setInclusive(e.target.value)}
            placeholder="Inclusive"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={exclusion}
            onChange={(e) => setExclusion(e.target.value)}
            placeholder="Exclusion"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <input
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="Rent"
            className="w-full p-2 border rounded"
            disabled={creating}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60 md:col-span-2"
            disabled={creating}
          >
            {creating ? "Saving itinerary..." : "Create Itinerary Item"}
          </button>
        </form>

        {itineraryItems.length > 0 ? (
          <ul className="space-y-3">
            {itineraryItems.map((item) => (
              <li key={item.id} className="p-3 border rounded">
                <div className="font-semibold">{item.trek}</div>
                <div className="text-sm text-gray-600">
                  Quick: {item.QuickItinerary}
                </div>
                <div className="text-sm text-gray-600">
                  Detailed: {item.DetailedItinerary}
                </div>
                <div className="text-sm text-gray-600">
                  Inclusive: {item.Inclusive || "none"}
                </div>
                <div className="text-sm text-gray-600">
                  Exclusion: {item.Exclusion || "none"}
                </div>
                <div className="text-sm text-gray-600">
                  Rent: {item.Rent || "none"}
                </div>
                <button
                  onClick={() => deleteItineraryItem(item.id)}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete itinerary item
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-600">No itinerary items yet.</div>
        )}
      </section>
    </div>
  );
}
