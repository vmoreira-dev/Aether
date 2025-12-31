export default function SettingsPage() {
  return (
    <div className="min-h-screen flex justify-center items-start pt-[18vh]">
      <div className="max-w-3xl w-full mx-6 rounded-2xl bg-white/[0.045] border border-white/10 backdrop-blur-xl p-12">
        
        {/* Title */}
        <h1 className="text-[30px] font-semibold tracking-tight mb-4">
          Settings
        </h1>

        <p className="text-white/70 text-[16px] mb-10">
          Temporary panel — this is where you’ll input data later.
        </p>

        {/* Form grid */}
        <div className="grid grid-cols-2 gap-8">
          
          <div>
            <label className="block text-[16px] mb-2 opacity-85">
              Total Spend
            </label>
            <input
              className="w-full rounded-xl bg-black/45 border border-white/10 px-4 py-3 text-[16px] focus:outline-none"
              placeholder="$1950"
            />
          </div>

          <div>
            <label className="block text-[16px] mb-2 opacity-85">
              Top Category
            </label>
            <input
              className="w-full rounded-xl bg-black/45 border border-white/10 px-4 py-3 text-[16px] focus:outline-none"
              placeholder="Groceries"
            />
          </div>

          <div>
            <label className="block text-[16px] mb-2 opacity-85">
              Category Spend
            </label>
            <input
              className="w-full rounded-xl bg-black/45 border border-white/10 px-4 py-3 text-[16px] focus:outline-none"
              placeholder="$500"
            />
          </div>

          <div>
            <label className="block text-[16px] mb-2 opacity-85">
              Projected Cashback
            </label>
            <input
              className="w-full rounded-xl bg-black/45 border border-white/10 px-4 py-3 text-[16px] focus:outline-none"
              placeholder="$32"
            />
          </div>
        </div>

        {/* Button */}
        <button className="mt-12 px-6 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition text-[15px]">
          Save (future)
        </button>
      </div>
    </div>
  );
}
