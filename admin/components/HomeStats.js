export default function HomeStats() {
  return (
    <div className="">
      <h2 className="mt-8 mb-3 text-gray-800">Orders</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile ">
          <h3 className="uppercase text-xs text-gray-500 font-bold">Today</h3>
          <div className="tile-number">2</div>
          <div className="tile-desc">2 orders Today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">26</div>
          <div className="tile-desc">26 orders Today</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">180</div>
          <div className="tile-desc">180 orders Today</div>
        </div>
      </div>

      <h2 className="mt-8 mb-3  text-gray-800">Revenue</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">PKR 2000</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">PKR 12300</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">PKR 300290</div>
        </div>
      </div>
    </div>
  );
}
