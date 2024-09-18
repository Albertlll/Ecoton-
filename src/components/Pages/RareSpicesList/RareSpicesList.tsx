import React from 'react';

interface SpiceItem {
  id: number;
  name: string;
}

const RareSpicesList: React.FC = () => {
  // Пример данных для списка редких специй
  const spices: SpiceItem[] = [
    { id: 1, name: 'Шафран' },
    { id: 2, name: 'Ваниль' },
    { id: 3, name: 'Кардамон' },
    { id: 4, name: 'Трюфель' },
    { id: 5, name: 'Сычуаньский перец' },
    { id: 6, name: 'Асафетида' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Список редких специй</h1>
      <div className="grid grid-cols-2 gap-4">
        {spices.map((spice) => (
          <div
            key={spice.id}
            className="bg-green-100 rounded-lg p-4  duration-300"
          >
            <h2 className="text-lg font-semibold">{spice.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RareSpicesList;