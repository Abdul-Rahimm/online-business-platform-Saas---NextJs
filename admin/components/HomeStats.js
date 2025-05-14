export default function HomeStats() {
  return (
    <div className="">
      <h2>Orders</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile ">
          <h3 className="uppercase text-xs text-gray-500 font-bold">Today</h3>
          <div className="tile-number">2</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">2</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">2</div>
        </div>
      </div>

      <h2>Revenue</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">2</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This week</h3>
          <div className="tile-number">2</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This month</h3>
          <div className="tile-number">2</div>
        </div>
      </div>
    </div>
  );
}
