export default function PlaceholderPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-base font-semibold text-gray-800 mb-2">Coming Soon</h2>
      <p className="text-sm text-gray-400">This feature is a placeholder in this demo.</p>
    </div>
  );
}