interface ItemGroup {
    date: Date;
    items: Array<any>;
  }

  const data = [
    {
      date: new Date('2024-11-10'),
      items: [{ id: 1, date: '2024-11-09' }, { id: 2, date: '2024-11-10' }],
    },
    {
      date: new Date('2024-11-12'),
      items: [{ id: 3, date: '2024-11-12' }],
    },
    {
      date: new Date('2025-04-11'),
      items: [{ id: 4, date: '2025-04-11' }],
    },
  ];
  
  export const groupExerciseFunction = (data: ItemGroup[]) => {
    const result: Record<string, any[]> = {};
  
    data.forEach(({ date, items }) => {
      const key = `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  
      if (!result[key]) {
        result[key] = [];
      }
  
      result[key].push(...items);
    });

    Object.keys(result).forEach((key) => {
      result[key].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    });
    return result;
  };

  console.log(groupExerciseFunction(data));