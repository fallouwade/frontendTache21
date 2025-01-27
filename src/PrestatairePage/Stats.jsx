const Stats = () => {
  const stats = [
    { label: "Ponctualité", value: "100%" },
    { label: "Satisfaction", value: "98%" },
    { label: "Communication", value: "96%" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between  py-4 border-b">
      {stats.map((stat, index) => (
        <div key={index} className="text-center mb-4 sm:mb-0">
          <div className="font-semibold">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
