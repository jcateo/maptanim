import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link, useLocation } from "wouter";
import { trpc } from "../../lib/trpc";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export default function NewPost() {
  const [, setLocation] = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<"pestControl" | "harvest" | "general" | "market" | "weather">("general");

  const createMutation = trpc.community.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post published to community");
      setLocation("/community");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create post");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required.");
      return;
    }

    createMutation.mutate({
      title,
      content,
      category,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/community">
          <button className="p-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Gumawa ng Bagong Post</h2>
          <p className="text-sm text-neutral-500 mt-1">Magbahagi ng impormasyon o magtanong sa komunidad.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm max-w-3xl">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Titulo ng Post <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Hal. Paano puksain ang army worm sa mais?"
              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "pestControl" | "harvest" | "general" | "market" | "weather")}
              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="general">General Farming</option>
              <option value="pestControl">Pest & Diseases</option>
              <option value="harvest">Harvesting</option>
              <option value="market">Market & Prices</option>
              <option value="weather">Weather</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">
              Nilalaman <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ilahad ang iyong detalye o katanungan dito..."
              rows={8}
              className="w-full bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-neutral-100">
            <Link href="/community">
              <button type="button" className="px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-medium transition-colors">
                Kanselahin
              </button>
            </Link>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-xl font-semibold shadow-md flex items-center justify-center gap-2 transition-colors min-w-[120px]"
            >
              {createMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <Send className="w-4 h-4" />
                  I-post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
