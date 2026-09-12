"use client";

import { LuDroplet } from "react-icons/lu";

function NeonatalBilirubinAssessment() {
  return (
    <div className="rounded-3xl border border-teal-200 bg-teal-50/30 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-800 text-paper-card">
          <LuDroplet className="h-4.5 w-4.5" />
        </span>
      </div>
    </div>
  );
}

export default NeonatalBilirubinAssessment;
