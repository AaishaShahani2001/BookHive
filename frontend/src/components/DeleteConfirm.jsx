import React from "react";

export default function DeleteConfirm({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone."
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div
        className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md
                   animate-[scaleIn_0.25s_ease-out]"
      >
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-400
                     text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white
                     hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>

    </div>
  );
}
