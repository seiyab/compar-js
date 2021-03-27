# compar-js
Small utilities for `Array.prototype.sort`.

## Examples
```typescript
import compar from '@seiyab/compar'

const fruits = [
  { name: 'banana', id: 4 },
  { name: 'apple', id: 8 },
  { name: 'orange', id: 7 }
];

fruits.sort(compar.byKey('id'));
/*
  -> [
  { name: 'banana', id: 4 },
  { name: 'orange', id: 7 },
  { name: 'apple', id: 8 },
  ]
*/

fruits.sort(compar.byKey('name', { order: 'desc' }));
/*
  -> [
  { name: 'orange', id: 7 },
  { name: 'banana', id: 4 },
  { name: 'apple', id: 8 },
  ]
*/

const beverages = [
  { name: 'coke', size: 300 },
  { name: 'soda', size: 500 },
  { name: 'juice', size: 300 },
  { name: 'coke', size: 500 }
]

beverages.sort(compar.flow([
  compar.byKey('size'),
  compar.byKey('name'),
]))
/*
  -> [
    { name: 'coke', size: 300 },
    { name: 'juice', size: 300 },
    { name: 'coke', size: 500 }
    { name: 'soda', size: 500 },
  ]
*/
```

## Installation
```bash
npm install @seiyab/compar
```

## Features
- TypeScript
- `null` / `undefined` handling

## Usage
### compar.byKey
Returns comparator by object key.

```typescript
const fruits = [
  { name: 'banana', id: 4 },
  { name: 'apple', id: 8 },
  { name: 'orange', id: 7 }
];

fruits.sort(compar.byKey('id'));
/*
  -> [
  { name: 'banana', id: 4 },
  { name: 'orange', id: 7 },
  { name: 'apple', id: 8 },
  ]
*/
```

2nd argument is option.

option | description
:- | :-
`order` | `'asc'` or `'desc'` is available.`'asc'` by default.
`empty` | The way to handle `null` / `undefined` values. `'first'` , `'last'` , `'min'` or `'max'` is available.


```typescript
const fruits = [
  { name: 'banana', id: 4 },
  { id: 6 },
  { name: 'apple', id: 8 },
  { name: 'orange', id: 7 }
];

fruits.sort(compar.byKey('name', { empty: 'last' }));
/*
  -> [
  { name: 'apple', id: 8 },
  { name: 'banana', id: 4 },
  { name: 'orange', id: 7 },
  { id: 6 }
  ]
*/

fruits.sort(compar.byKey('name', { order: 'desc', empty: 'max' }));
/*
  -> [
  { id: 6 }
  { name: 'orange', id: 7 },
  { name: 'banana', id: 4 },
  { name: 'apple', id: 8 },
  ]
*/
```

### compar.by
Returns comparator by function.

```typescript
const numbers = [103, 17, 6, 101];

numbers.sort(compar.by((x) => x % 10));
// -> [101, 103, 6, 17]
```

2nd argument is a same option as `compar.bykey`

### compar.flow
Combines multiple comparators.

```typescript
const beverages = [
  { name: 'coke', size: 300 },
  { name: 'soda', size: 500 },
  { name: 'juice', size: 300 },
  { name: 'coke', size: 500 }
]

beverages.sort(compar.flow([
  compar.byKey('size'),
  compar.byKey('name'),
]))
/*
  -> [
    { name: 'coke', size: 300 },
    { name: 'juice', size: 300 },
    { name: 'coke', size: 500 }
    { name: 'soda', size: 500 },
  ]
*/
```

### compar.irregular
Arrange irregular value.

```typescript
const beverages = [
  { name: 'coke', size: 300 },
  { name: 'tea', size: 200 },
  { name: 'unknown', size: 400 },
  { name: 'water', size: 500 },
]
input.sort(
  compar.flow(
    compar.irregular((x) => x.name === 'unknown', 'last'),
    compar.byKey('size', { order: 'desc' }),
  )
)
/*
  -> [
    { name: "water", size: 500 },
    { name: "coke", size: 300 },
    { name: "tea", size: 200 },
    { name: "unknown", size: 400 },
  ]
*/
```