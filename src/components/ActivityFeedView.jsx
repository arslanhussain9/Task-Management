import React from 'react';
import { useTasks } from '../context/TaskContext';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function ActivityFeedView() {
  const { 
    activities, 
    realtimeActive, 
    setRealtimeActive, 
    setSelectedTaskDetail,
    tasks 
  } = useTasks();

  const handleTaskClick = (title) => {
    const found = tasks.find((t) => t.title.toLowerCase() === title.toLowerCase());
    if (found) {
      setSelectedTaskDetail(found);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 pb-24">
      {/* Header with live sync status */}
      <div className="bg-white rounded-3xl p-6 border border-[#e7e8ea] shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#080909]">Real-Time Activity Stream</h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <p className="text-xs text-[#747878] mt-0.5">
            Audit logs, team events, and dynamic state updates across projects.
          </p>
        </div>

        <button
          onClick={() => setRealtimeActive(!realtimeActive)}
          className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
            realtimeActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-stone-50 text-stone-600 border-stone-200'
          }`}
        >
          {realtimeActive ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              Live Sync On
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              Sync Paused
            </>
          )}
        </button>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-3xl p-6 border border-[#e7e8ea] shadow-xs divide-y divide-[#f1f3f5]">
        {activities.map((act) => {
          return (
            <div key={act.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#080909] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {act.user.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#080909]">{act.user}</span>
                  <span className="text-[11px] text-[#747878]">{act.time}</span>
                </div>

                <p className="text-xs text-[#444747] mt-0.5">
                  {act.action}{' '}
                  <span 
                    onClick={() => handleTaskClick(act.taskTitle)}
                    className="font-semibold text-[#080909] hover:text-[#075CF2] cursor-pointer underline decoration-dotted ml-1"
                  >
                    "{act.taskTitle}"
                  </span>
                </p>
              </div>
            </div>
          );
        })}

        {activities.length === 0 && (
          <div className="py-12 text-center text-[#747878] text-xs">
            No recent activity recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
