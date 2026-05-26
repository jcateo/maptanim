import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { trpc } from "../../lib/trpc";
import { Link } from "wouter";
import { Loader2, Plus, MessageSquare, Search, Filter, Hash, Star, ThumbsUp, Image as ImageIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Community() {
  const [category, setCategory] = useState<any>(undefined);
  const { data: posts, isLoading } = trpc.community.listPosts.useQuery({ category });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts?.filter(p =>
    p.post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto font-inter h-full flex flex-col">
        
        {/* HEADER */}
        <div className="mb-8 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Local Farming Community</h1>
            <p className="text-sm text-gray-500 mt-1">
              Connect, share knowledge, and grow together with farmers in Negros Occidental.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search community posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all shadow-sm text-sm"
            />
          </div>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
          
          {/* MAIN FEED (col-span-2) */}
          <div className="lg:col-span-2 overflow-y-auto pb-8 space-y-6">
            
            {/* Share Update Box */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center shrink-0">
                  Me
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="Share an update, ask a question, or post a photo..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 min-h-[80px] resize-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  ></textarea>
                  <div className="flex items-center justify-between mt-3">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-brand-50">
                      <ImageIcon className="w-4 h-4" />
                      Add Photo
                    </button>
                    <button className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Cards */}
            {isLoading ? (
              <div className="space-y-6">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex gap-4">
                    <div className="w-10 h-10 rounded-full skeleton shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="skeleton h-5 w-1/3"></div>
                      <div className="skeleton h-3 w-1/4"></div>
                      <div className="skeleton h-20 w-full mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !filteredPosts || filteredPosts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 py-20 text-center text-gray-500 shadow-sm">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-medium text-gray-700">No community posts found.</p>
                <p className="text-sm mt-1">Be the first to start a conversation!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map(({ post, author }) => (
                  <div key={post.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-card-md transition-shadow">
                    <div className="flex items-start gap-4">
                      
                      <div className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shrink-0
                        ${author.role === 'admin' ? 'bg-gray-100 text-gray-700' :
                          author.role === 'extension_officer' ? 'bg-sky-100 text-sky-700' :
                            'bg-earth-100 text-earth-700'}`}>
                        {author.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {/* Post Header */}
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-800">{author.name}</span>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md tracking-wider
                                ${author.role === 'admin' ? 'bg-gray-100 text-gray-600' :
                                  author.role === 'extension_officer' ? 'bg-sky-50 text-sky-600' :
                                    'bg-earth-50 text-earth-600'}`}>
                                {author.role.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ''}
                              <span className="mx-1.5">•</span>
                              <span className="capitalize">{post.category || 'General'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="mt-3">
                          <h3 className="text-base font-bold text-gray-900 mb-1">{post.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                          </p>
                        </div>

                        {/* Optional Image */}
                        {post.imageUrl && (
                          <div className="mt-4 h-64 rounded-xl overflow-hidden border border-gray-200">
                            <img src={post.imageUrl} alt="Post Attachment" className="w-full h-full object-cover" />
                          </div>
                        )}

                        {/* Actions: Likes & Comments */}
                        <div className="mt-5 flex items-center gap-6 border-t border-gray-100 pt-3">
                          <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="opacity-80">Like (0)</span>
                          </button>
                          <Link href={`/community/${post.id}`}>
                            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span className="opacity-80">Comment (0)</span>
                            </button>
                          </Link>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR (col-span-1) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Trending Topics */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Hash className="w-4 h-4 text-brand-500" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-gray-800 group-hover:text-brand-600 transition-colors">#SugarcaneHarvest</div>
                    <div className="text-xs text-gray-400">120 posts this week</div>
                  </div>
                </div>
                <div className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-gray-800 group-hover:text-brand-600 transition-colors">#PestControlTips</div>
                    <div className="text-xs text-gray-400">85 posts this week</div>
                  </div>
                </div>
                <div className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-gray-800 group-hover:text-brand-600 transition-colors">#OrganicFarming</div>
                    <div className="text-xs text-gray-400">42 posts this week</div>
                  </div>
                </div>
                <div className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <div className="text-sm font-bold text-gray-800 group-hover:text-brand-600 transition-colors">#ElNiñoPrep</div>
                    <div className="text-xs text-gray-400">28 posts this week</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Top Contributors
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0">
                    O
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-800 truncate">Officer Maria</div>
                    <div className="text-[10px] text-gray-500">Extension Officer</div>
                  </div>
                  <div className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    45 pts
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-earth-100 text-earth-700 font-bold text-xs flex items-center justify-center shrink-0">
                    J
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-800 truncate">Juan Dela Cruz</div>
                    <div className="text-[10px] text-gray-500">Farmer</div>
                  </div>
                  <div className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    32 pts
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-earth-100 text-earth-700 font-bold text-xs flex items-center justify-center shrink-0">
                    P
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-800 truncate">Pedro Santos</div>
                    <div className="text-[10px] text-gray-500">Farmer</div>
                  </div>
                  <div className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                    28 pts
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </DashboardLayout>
  );
}
