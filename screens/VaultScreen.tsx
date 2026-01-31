
import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { FileText, Plus, Search, MoreVertical, ShieldCheck, Lock, ChevronLeft, Upload, FileQuestion, CheckCircle2, Loader2, Camera, Image as ImageIcon, X, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DocCategory = 'Identity' | 'Property' | 'Bills' | 'Health' | 'Official';

interface Document {
  title: string;
  type: DocCategory;
  size: string;
  date: string;
}

const VaultScreen: React.FC = () => {
  const { isElderlyMode } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [selectedDocMenu, setSelectedDocMenu] = useState<number | null>(null);
  const [renamingDocId, setRenamingDocId] = useState<number | null>(null);
  const [newDocName, setNewDocName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const [allDocs, setAllDocs] = useState<Document[]>([
    { title: 'Aadhaar Card', type: 'Identity', size: '1.2 MB', date: 'Oct 2023' },
    { title: 'PAN Card', type: 'Identity', size: '0.8 MB', date: 'Sep 2023' },
    { title: 'Property Tax Bill', type: 'Bills', size: '2.4 MB', date: 'Jan 2024' },
    { title: 'Pension Letter', type: 'Official', size: '1.5 MB', date: 'Dec 2023' }
  ]);

  const folders: { label: DocCategory, icon: any, color: string, text: string }[] = [
    { label: 'Identity', icon: <Lock />, color: 'bg-sky-100', text: 'text-sky-600' },
    { label: 'Property', icon: <FileText />, color: 'bg-emerald-100', text: 'text-emerald-600' },
    { label: 'Bills', icon: <FileText />, color: 'bg-amber-100', text: 'text-amber-600' },
    { label: 'Health', icon: <FileText />, color: 'bg-rose-100', text: 'text-rose-600' },
    { label: 'Official', icon: <ShieldCheck />, color: 'bg-violet-100', text: 'text-violet-600' }
  ];

  const simulateUpload = (fileName: string) => {
    setIsUploading(true);
    setShowUploadMenu(false);
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      const newDoc: Document = {
        title: fileName || `New Document ${allDocs.length + 1}`,
        type: selectedCategory || 'Official',
        size: (Math.random() * 2 + 0.5).toFixed(1) + ' MB',
        date: 'Today'
      };
      setAllDocs([newDoc, ...allDocs]);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file.name);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();
  const triggerCamera = () => cameraInputRef.current?.click();

  const deleteDocument = (index: number) => {
    setAllDocs(allDocs.filter((_, i) => i !== index));
    setSelectedDocMenu(null);
  };

  const startRenaming = (index: number, currentName: string) => {
    setRenamingDocId(index);
    setNewDocName(currentName);
    setSelectedDocMenu(null);
  };

  const confirmRename = (index: number) => {
    if (newDocName.trim()) {
      const updatedDocs = [...allDocs];
      updatedDocs[index].title = newDocName;
      setAllDocs(updatedDocs);
    }
    setRenamingDocId(null);
    setNewDocName('');
  };

  const filteredDocs = allDocs.filter(d => 
    (!selectedCategory || d.type === selectedCategory) &&
    (d.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Layout title={selectedCategory ? selectedCategory : "My Vault"} showBack={!!selectedCategory}>
      <div className="space-y-8">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="vault-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Search + Action Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-white border border-sky-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                  <Search size={22} className="text-sky-200" />
                  <input 
                    type="text" 
                    placeholder="Search files..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none w-full text-base font-bold text-sky-900 placeholder:text-sky-200" 
                  />
                </div>
                <button 
                  onClick={() => setShowUploadMenu(true)}
                  className="bg-sky-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg hover:bg-sky-600 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={24} /> <span>New File</span>
                </button>
              </div>

              {/* Status Banner */}
              <div className="bg-white border border-sky-100 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="bg-sky-50 p-4 rounded-3xl shrink-0">
                   <ShieldCheck size={48} className="text-sky-500" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xl text-sky-900 mb-1">Secure Sync Enabled</h4>
                  <p className="text-slate-400 text-base font-medium">Your documents are encrypted and synchronized with government nodes for verification.</p>
                </div>
              </div>

              {/* Pastel Category Blocks */}
              <div>
                <h3 className="font-extrabold text-sky-900 mb-6 text-sm uppercase tracking-widest px-1">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                  {folders.map(folder => (
                    <button 
                      key={folder.label}
                      onClick={() => setSelectedCategory(folder.label)}
                      className={`${folder.color} p-6 rounded-[2.5rem] text-left hover:shadow-xl transition-all active:scale-[0.97] group border border-white`}
                    >
                      <div className={`bg-white/80 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${folder.text}`}>
                        {folder.icon}
                      </div>
                      <h4 className={`font-extrabold ${folder.text} text-lg mb-1`}>{folder.label}</h4>
                      <p className={`text-[10px] font-bold uppercase opacity-60`}>
                        {allDocs.filter(d => d.type === folder.label).length} Files
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Files List Block */}
              <div className="bg-white border border-sky-50 rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="font-extrabold text-sky-900 mb-6 text-sm uppercase tracking-widest">Recent Documents</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredDocs.slice(0, 4).map((doc, i) => {
                    const actualIndex = allDocs.findIndex(d => d.title === doc.title && d.type === doc.type);
                    return (
                      <DocItem 
                        key={i} 
                        doc={doc} 
                        index={actualIndex}
                        selectedMenu={selectedDocMenu}
                        setSelectedMenu={setSelectedDocMenu}
                        onDelete={deleteDocument}
                        onRename={startRenaming}
                        renamingId={renamingDocId}
                        newName={newDocName}
                        setNewName={setNewDocName}
                        confirmRename={confirmRename}
                      />
                    );
                  })}
                  {filteredDocs.length === 0 && (
                    <p className="text-slate-400 font-bold italic py-4">No documents match your search.</p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="category-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 text-sky-400 font-extrabold hover:text-sky-600 transition-colors"
                >
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={() => setShowUploadMenu(true)}
                  className="bg-sky-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
                >
                  Upload to {selectedCategory}
                </button>
              </div>

              {/* Detail Search */}
              <div className="bg-white border border-sky-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-sky-100 transition-all">
                <Search size={22} className="text-sky-200" />
                <input 
                  type="text" 
                  placeholder={`Search in ${selectedCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none w-full text-base font-bold text-sky-900 placeholder:text-sky-200" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDocs.map((doc, i) => {
                  const actualIndex = allDocs.findIndex(d => d.title === doc.title && d.type === doc.type);
                  return (
                    <DocItem 
                      key={i} 
                      doc={doc}
                      index={actualIndex}
                      selectedMenu={selectedDocMenu}
                      setSelectedMenu={setSelectedDocMenu}
                      onDelete={deleteDocument}
                      onRename={startRenaming}
                      renamingId={renamingDocId}
                      newName={newDocName}
                      setNewName={setNewDocName}
                      confirmRename={confirmRename}
                    />
                  );
                })}
                {filteredDocs.length === 0 && (
                  <p className="text-slate-400 font-bold italic py-10 text-center col-span-full">No documents found in this category.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upload Menu */}
      <AnimatePresence>
        {showUploadMenu && (
          <div className="fixed inset-0 bg-sky-900/20 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="bg-white w-full max-w-md rounded-t-[3rem] sm:rounded-[3rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-extrabold text-sky-900 mb-8">Add to Vault</h2>
              <div className="grid grid-cols-1 gap-4">
                <button onClick={triggerCamera} className="flex items-center gap-4 p-5 bg-sky-50 rounded-2xl text-sky-700 font-bold hover:bg-sky-100 transition-all">
                  <Camera /> Take Document Photo
                </button>
                <button onClick={triggerFileSelect} className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl text-emerald-700 font-bold hover:bg-emerald-100 transition-all">
                  <ImageIcon /> Pick from Gallery
                </button>
                <button onClick={() => setShowUploadMenu(false)} className="w-full p-4 text-slate-300 font-bold">Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

const DocItem: React.FC<{ doc: Document, index: number, selectedMenu: number | null, setSelectedMenu: (id: number | null) => void, onDelete: (index: number) => void, onRename: (index: number, name: string) => void, renamingId: number | null, newName: string, setNewName: (name: string) => void, confirmRename: (index: number) => void }> = ({ 
  doc, index, selectedMenu, setSelectedMenu, onDelete, onRename, renamingId, newName, setNewName, confirmRename 
}) => (
  <div className="relative">
    {renamingId === index ? (
      <div className="bg-sky-50/30 border border-sky-50 p-5 rounded-2xl flex items-center gap-4">
        <input 
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="flex-1 bg-white border border-sky-100 rounded-lg px-3 py-2 font-bold text-sky-900 outline-none focus:ring-2 focus:ring-sky-300"
          autoFocus
        />
        <button 
          onClick={() => confirmRename(index)}
          className="px-4 py-2 bg-sky-500 text-white rounded-lg font-bold hover:bg-sky-600"
        >
          Save
        </button>
        <button 
          onClick={() => setRenamingId(null)}
          className="px-4 py-2 bg-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-300"
        >
          Cancel
        </button>
      </div>
    ) : (
      <>
        <div className="bg-sky-50/30 border border-sky-50 p-5 rounded-2xl flex items-center justify-between hover:bg-white hover:shadow-md hover:border-sky-100 transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <Lock size={20} className="text-sky-300" />
            </div>
            <div>
              <h4 className="font-bold text-sky-900">{doc.title}</h4>
              <p className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">{doc.size} • {doc.date}</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedMenu(selectedMenu === index ? null : index)}
            className="p-2 hover:bg-sky-100 rounded-lg transition-colors"
          >
            <MoreVertical size={20} className="text-sky-200" />
          </button>
        </div>

        {/* Context Menu */}
        <AnimatePresence>
          {selectedMenu === index && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-white border border-sky-100 rounded-2xl shadow-lg z-50 overflow-hidden"
            >
              <button 
                onClick={() => onRename(index, doc.title)}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-sky-50 transition-colors text-sky-700 font-bold text-sm"
              >
                <Edit2 size={16} /> Rename
              </button>
              <button 
                onClick={() => onDelete(index)}
                className="w-full px-6 py-3 flex items-center gap-3 hover:bg-rose-50 transition-colors text-rose-600 font-bold text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )}
  </div>
);

export default VaultScreen;
