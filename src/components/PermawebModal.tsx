import React, { useState } from 'react';
import { PermawebManifest } from '../types';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  Terminal, 
  ShieldCheck, 
  Database, 
  ExternalLink 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PermawebModalProps {
  isOpen: boolean;
  onClose: () => void;
  manifest: PermawebManifest;
}

export const PermawebModal: React.FC<PermawebModalProps> = ({
  isOpen,
  onClose,
  manifest,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(manifest, null, 2);

  const handleCopy = () => {
    soundFx.playBlip(750, 'sine', 0.05);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    soundFx.playWarp();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hyper-reelality-permaweb-snapshot-${manifest.blockHeight}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#080D17] border-2 border-[#38F2C2]/50 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col font-mono text-xs text-slate-200 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#0B1220] border-b border-[#1E2E48] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#38F2C2]">
            <Database className="w-4 h-4" />
            <span className="font-bold text-sm tracking-wider uppercase">
              PERMAWEB ARCHIVAL SNAPSHOT // ARWEAVE + IRYS
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cryptographic Receipt Banner */}
        <div className="p-4 bg-[#0A101C] border-b border-[#1E2E48] space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">TRANSACTION ID:</span>
            <span className="text-[#38F2C2] font-bold select-all">{manifest.arweaveTxId}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">IRYS RECEIPT:</span>
            <span className="text-amber-400 font-bold select-all">{manifest.irysReceiptId}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">BLOCK HEIGHT:</span>
            <span className="text-slate-200">{manifest.blockHeight}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">MERKLE ROOT:</span>
            <span className="text-purple-400 truncate max-w-[280px] select-all">{manifest.merkleRoot}</span>
          </div>
        </div>

        {/* JSON Preview Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#05080F]">
          <pre className="text-[11px] text-slate-300 font-mono leading-relaxed whitespace-pre select-text">
            {jsonString}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-[#0B1220] border-t border-[#1E2E48] flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            Immutable snapshot of active taxonomy, personas, critic trace, & shadow dossier.
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#142038] text-slate-200 hover:text-white border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#38F2C2]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY MANIFEST'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-[#38F2C2] text-black font-bold hover:bg-[#38F2C2]/90 shadow-[0_0_15px_rgba(56,242,194,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD .JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
