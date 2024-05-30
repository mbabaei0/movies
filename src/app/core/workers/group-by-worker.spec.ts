import { groupBy } from "./group-by-worker.worker";

describe('groupBy function', () => {
  it('should group items by the specified key', () => {
    const items = [
      { category: 'fruits', name: 'apple' },
      { category: 'fruits', name: 'banana' },
      { category: 'vegetables', name: 'carrot' }
    ];

    const grouped = groupBy(items, item => item.category);

    expect(grouped.get('fruits')).toEqual([
      { category: 'fruits', name: 'apple' },
      { category: 'fruits', name: 'banana' }
    ]);

    expect(grouped.get('vegetables')).toEqual([
      { category: 'vegetables', name: 'carrot' }
    ]);
  });

  it('should handle an empty list', () => {
    const items: any[] = [];
    const grouped = groupBy(items, item => item.category);
    expect(grouped.size).toBe(0);
  });

  it('should group items with different keys correctly', () => {
    const items = [
      { type: 'A', value: 1 },
      { type: 'B', value: 2 },
      { type: 'A', value: 3 },
      { type: 'B', value: 4 },
      { type: 'C', value: 5 }
    ];

    const grouped = groupBy(items, item => item.type);

    expect(grouped.get('A')).toEqual([
      { type: 'A', value: 1 },
      { type: 'A', value: 3 }
    ]);

    expect(grouped.get('B')).toEqual([
      { type: 'B', value: 2 },
      { type: 'B', value: 4 }
    ]);

    expect(grouped.get('C')).toEqual([
      { type: 'C', value: 5 }
    ]);
  });
});
