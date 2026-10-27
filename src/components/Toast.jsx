// Small confirmation after "Add". Sits above the mobile bar.
export default function Toast({ toast, onOpen }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-6" role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className="toast-in pointer-events-auto flex items-center gap-3 rounded-full bg-ink px-5 py-3 text-white shadow-lg">
          <span className="font-semibold">Added: {toast.text}</span>
          <button type="button" onClick={onOpen} className="min-h-9 font-extrabold text-gold underline underline-offset-4">View order</button>
        </div>
      )}
    </div>
  );
}
