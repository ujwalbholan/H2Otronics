const DemoSection = () => {
  const demoData = {
    waterLevel: 65,
    pumpStatus: "ON",
    temperature: 28,
    sensorHealth: "OK",
  };

  return (
    <section id="demo" className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Live Demo</h3>
        <div className="flex flex-col md:flex-row justify-center gap-10">
          <div>
            <p className="text-lg">Water Level</p>
            <div className="w-40 h-6 bg-gray-300 rounded-full mx-auto mb-2">
              <div
                className="h-6 bg-blue-600 rounded-full"
                style={{ width: `${demoData.waterLevel}%` }}
              ></div>
            </div>
            <p>{demoData.waterLevel}%</p>
          </div>
          <div>
            <p>Pump Status: {demoData.pumpStatus}</p>
          </div>
          <div>
            <p>Temperature: {demoData.temperature}°C</p>
          </div>
          <div>
            <p>Sensor Health: {demoData.sensorHealth}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
