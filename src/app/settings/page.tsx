export default function SettingsPage() {
  return (
    <div className="min-h-screen flex justify-center items-start pt-[18vh]">
      <div className="max-w-3xl w-full mx-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-8">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Settings
        </h1>

        <p className="text-white/70 mb-6">
          Temporary panel — this is where you’ll input data later.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 opacity-70">
              Total Spend
            </label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              placeholder="$1950"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">
              Top Category
            </label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              placeholder="Groceries"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">
              Category Spend
            </label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              placeholder="$500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">
              Projected Cashback
            </label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 focus:outline-none"
              placeholder="$32"
            />
          </div>
        </div>

        <button className="mt-8 px-5 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition">
          Save (future)
        </button>
      </div>
    </div>
  );
}
