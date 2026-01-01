import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div className="w-full bg-black-50 h-1 overflow-hidden rounded-[2px]">
      <div
        className="h-1 bg-linear-to-r from-slate-200/85 to-slate-500 transition-all rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default StepProgress