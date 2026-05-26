import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { LayoutTemplate, Save, GripVertical, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LayoutBuilder() {
  const tools = [
    { name: 'Kamatis', emoji: '🍅', type: 'vegetable' },
    { name: 'Talong', emoji: '🍆', type: 'vegetable' },
    { name: 'Kalabasa', emoji: '🎃', type: 'vegetable' },
    { name: 'Ampalaya', emoji: '🥒', type: 'vegetable' },
    { name: 'Sitaw', emoji: '🫘', type: 'vegetable' },
    { name: 'Irrigation Line', emoji: '💧', type: 'infrastructure' },
    { name: 'Walkway', emoji: '🛣️', type: 'infrastructure' },
  ];

  // 10x10 Grid state
  const [grid, setGrid] = useState<({ tool: any } | null)[][]>(
    Array(10).fill(null).map(() => Array(10).fill(null))
  );

  const [selectedTool, setSelectedTool] = useState<any>(null);

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!selectedTool) {
      if (grid[rowIndex][colIndex] !== null) {
         // Erase if clicked without a tool selected
         const newGrid = [...grid];
         newGrid[rowIndex][colIndex] = null;
         setGrid(newGrid);
      }
      return;
    }

    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = { tool: selectedTool };
    setGrid(newGrid);
  };

  const handleSave = () => {
    const isNotEmpty = grid.some(row => row.some(cell => cell !== null));
    if (!isNotEmpty) {
      toast.error('Cannot save an empty layout');
      return;
    }
    toast.success('Zone layout saved successfully!');
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        {/* HEADER */}
        <div className="mb-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Zone Layout Builder</h1>
            <p className="text-sm text-gray-500 mt-1">
              Design your crop placement and farm infrastructure visually. Select a tool and click on the grid.
            </p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Layout
          </button>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          
          {/* LEFT: CANVAS (col-span-2) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col h-full overflow-hidden">
            <h2 className="text-sm font-semibold text-gray-800 mb-4 flex items-center justify-between shrink-0">
              <span className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-brand-500" />
                Interactive Canvas
              </span>
              <button 
                onClick={() => setGrid(Array(10).fill(null).map(() => Array(10).fill(null)))}
                className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </h2>
            
            <div className="flex-1 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center p-4 overflow-auto">
              
              <div 
                className="grid gap-[1px] bg-gray-200 border border-gray-300 rounded shadow-sm"
                style={{ gridTemplateColumns: 'repeat(10, minmax(40px, 1fr))' }}
              >
                {grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white hover:bg-brand-50 transition-colors cursor-pointer flex items-center justify-center text-2xl ${
                        cell ? 'shadow-inner scale-[0.98]' : ''
                      }`}
                    >
                      {cell ? cell.tool.emoji : ''}
                    </div>
                  ))
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT: TOOLBOX (col-span-1) */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full overflow-y-auto">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Toolbox</h2>
            <p className="text-xs text-gray-500 mb-4">Click a tool below to select it, then click the grid to place. Click an empty tool to enable erase mode.</p>
            
            <div className="space-y-6">
              
              <div 
                onClick={() => setSelectedTool(null)}
                className={`bg-white border ${!selectedTool ? 'border-red-500 shadow-sm bg-red-50' : 'border-gray-200 hover:border-gray-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all mb-4`}
              >
                <Trash2 className={`w-4 h-4 ${!selectedTool ? 'text-red-500' : 'text-gray-400'} shrink-0`} />
                <span className={`text-sm font-semibold ${!selectedTool ? 'text-red-700' : 'text-gray-600'}`}>Eraser</span>
              </div>

              {/* Crops Category */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 pb-2 border-b border-gray-100">Crops & Plants</h3>
                <div className="space-y-2">
                  {tools.filter(t => t.type === 'vegetable').map(tool => (
                    <div 
                      key={tool.name} 
                      onClick={() => setSelectedTool(tool)}
                      className={`bg-white border ${selectedTool?.name === tool.name ? 'border-brand-500 ring-1 ring-brand-500 shadow-sm bg-brand-50' : 'border-gray-200 hover:border-brand-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                      <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-xl shrink-0">
                        {tool.emoji}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure Category */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 pb-2 border-b border-gray-100">Infrastructure</h3>
                <div className="space-y-2">
                  {tools.filter(t => t.type === 'infrastructure').map(tool => (
                    <div 
                      key={tool.name} 
                      onClick={() => setSelectedTool(tool)}
                      className={`bg-white border ${selectedTool?.name === tool.name ? 'border-sky-500 ring-1 ring-sky-500 shadow-sm bg-sky-50' : 'border-gray-200 hover:border-sky-300'} rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                      <div className="w-8 h-8 bg-sky-50 rounded flex items-center justify-center text-xl shrink-0">
                        {tool.emoji}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
}
