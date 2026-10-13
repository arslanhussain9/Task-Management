import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toasts, removeToast } = useTasks();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isWarning = t.type === 'warning';
        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl bg-[#080909] text-white shadow-2xl border border-[#1b1c1c] animate-in slide-in-from-top-2 fade-in duration-200"
          >
            <div className="flex items-center gap-2.5 text-xs font-medium">
              {isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isWarning ? (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-[#075CF2] shrink-0" />
              )}
              <span className="line-clamp-2 leading-snug">{t.message}</span>
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-stone-400 hover:text-white ml-2 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
