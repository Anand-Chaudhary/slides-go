"use client"

import { useEffect } from 'react';
import { useGetPPTStore } from '@/store/getPPTStore';
import { useRouter } from 'next/navigation';

const PresentationPage = () => {
  const router = useRouter();
  const { ppt, loading, error, getAllPPT } = useGetPPTStore();

  useEffect(() => {
    getAllPPT();
  }, [getAllPPT]);

  if (loading) return <div className="p-8">Loading...</div>;

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  // ppt is actually the slugs array from getAllPPT
  const slugs: string[] = Array.isArray(ppt) ? ppt : [];

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Presentations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slugs.length === 0 ? (
          <div className="text-gray-500">No presentations found.</div>
        ) : (
          slugs.map((slug) => (
            <div
              key={slug}
              className="cursor-pointer bg-white rounded-xl shadow-md p-6 border hover:border-purple-400 transition-all duration-200 hover:scale-105"
              onClick={() => router.push(`/presentation/${slug}`)}
            >
              <h2 className="text-xl font-semibold text-purple-700 break-words">{slug.replace(/-/g, ' ')}</h2>
              <p className="text-gray-500 mt-2">Click to view presentation</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PresentationPage;