const test = require('ava');
const {add, diag, frobenius, elemWise, identity, invert, matMul, padWithZeroCols, substract, subSquareMatrix, sum, trace, transpose, zeros} = require('./lib');

test('add', t => {
	const a = [[3, 7], [4, 9]];
	const b = [[6, 2], [5, 8]];
	const result = add(a, b);
	t.deepEqual(result, [[9, 9], [9, 17]]);
});

test('diag', t => {
	const result = diag([3, 7]);
	t.deepEqual(result, [[3, 0], [0, 7]]);
});

test('frobenius', t => {
	const a = [[3, 7], [4, 9]];
	const b = [[6, 2], [5, 8]];
	const result = frobenius(a, b);
	t.is(result, 6);
});

test('elemWise', t => {
	const a = [[3, 7], [4, 9]];
	const b = [[6, 2], [5, 8]];

	let sum = 0;
	elemWise([a, b], (list, _rowId, _colId) => {
		const [aValue, bValue] = list;
		sum += aValue + bValue;
	});

	t.is(sum, 44);
});

test('identity', t => {
	const result = identity(2);
	t.deepEqual(result, [[1, 0], [0, 1]]);
});

test('invert', t => {
	const a = [[3, 7], [4, 9]];
	const result = invert(a);
	const expected = [[-9, 7], [4, -3]];
	elemWise([result, expected], ([value, expectedValue]) => {
		t.true(Math.abs(expectedValue - value) < 1e-6);
	});
});

test('matMul', t => {
	const a = [[3, 7], [4, 9]];
	const b = [[6, 2], [5, 8]];
	const result = matMul(a, b);
	t.deepEqual(result, [[53, 62], [69, 80]]);
});

test('padWithZeroCols', t => {
	const a = [[3, 7], [4, 9]];
	const result = padWithZeroCols(a, {columns: 4});
	t.deepEqual(result, [[3, 7, 0, 0], [4, 9, 0, 0]]);
});

test('substract', t => {
	const a = [[3, 7], [4, 9]];
	const b = [[6, 2], [5, 8]];
	const result = substract(a, b);
	t.deepEqual(result, [[-3, 5], [-1, 1]]);
});

test('subSquareMatrix', t => {
	const a = [[3, 7, 4, 5], [4, 9, 8, 7], [8, 7, 2, -1]];
	const result = subSquareMatrix(a, [0, 2]);
	t.deepEqual(result, [[3, 4], [8, 2]]);
});

test('sum', t => {
	const a = [[3, 7], [4, 9]];
	const result = sum(a);
	t.is(result, 23);
});

test('trace', t => {
	const a = [[3, 7], [4, 9]];
	const result = trace(a);
	t.is(result, 12);
});

test('transpose', t => {
	const a = [[3, 7], [4, 9]];
	const result = transpose(a);
	t.deepEqual(result, [[3, 4], [7, 9]]);
});

test('zeros', t => {
	const result = zeros(2, 2);
	t.deepEqual(result, [[0, 0], [0, 0]]);
});
