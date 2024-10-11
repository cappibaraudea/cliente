const FilterButton = ({ name, active, onClick }) => {
  return (
    <div
      className={`px-2 border-green-button border-2 rounded-md cursor-pointer ${
        active ? "bg-green-500" : "bg-white"
      }`}
      onClick={onClick}
    >
      <p className="select-none">{name}</p>
    </div>
  );
};

export default FilterButton;
