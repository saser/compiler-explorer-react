import { constructSimpleTrace } from './TraceUtils.js';

describe('constructSimpleTrace', () => {
    // Used for testing throwing of error. Kinda counter-intuitive, but it
    // works.
    const wrapper = (traceArray) => {
        return () => {
            constructSimpleTrace(traceArray);
        }
    }

    it('throws when given an empty array', () => {
        const traceArray = [];
        expect(wrapper(traceArray)).toThrow('array is empty');
    });

    it('throws when given null', () => {
        expect(wrapper(null)).toThrow('array is null');
    });

    it('throws when given undefined', () => {
        expect(wrapper(undefined)).toThrow('array is undefined');
    });

    it('throws when given an array containing only a single null value', () => {
        const traceArray = [null];
        expect(wrapper(traceArray)).toThrow('array contains null values');
    });

    it('throws when given an array containing only null values', () => {
        const traceArray = [null, null, null];
        expect(wrapper(traceArray)).toThrow('array contains null values');
    });

    it('throws when given an array containing only a single undefined value', () => {
        const traceArray = [undefined];
        expect(wrapper(traceArray)).toThrow('array contains undefined values');
    });

    it('throws when given an array containing only undefined values', () => {
        const traceArray = [undefined, undefined, undefined];
        expect(wrapper(traceArray)).toThrow('array contains undefined values');
    });

    it('returns a single, non-nested object when given an array with a single integer item', () => {
        const traceArray = [1];
        const expectedTrace = {
            cons: 'Cons',
            num: '1',
            trace: null,
        };
        expect(constructSimpleTrace(traceArray)).toEqual(expectedTrace);
    });

    it('returns a single, non-nested object when given array with a single string/char item', () => {
        const traceArray = ['1'];
        const expectedTrace = {
            cons: 'Cons',
            num: '1',
            trace: null,
        };
        expect(constructSimpleTrace(traceArray)).toEqual(expectedTrace);
    });

    it('returns a nested object when given array with two items', () => {
        const traceArray = [1, 9];
        const expectedTrace = {
            cons: 'Cons',
            num: '9',
            trace: {
                cons: 'Cons',
                num: '1',
                trace: null,
            }
        };
        expect(constructSimpleTrace(traceArray)).toEqual(expectedTrace);
    });

    it('returns a nested object when given array with four items', () => {
        const traceArray = [1, 9, 1, 13];
        const expectedTrace = {
            cons: 'Cons',
            num: '13',
            trace: {
                cons: 'Cons',
                num: '1',
                trace: {
                    cons: 'Cons',
                    num: '9',
                    trace: {
                        cons: 'Cons',
                        num: '1',
                        trace: null,
                    }
                }
            }
        };
        expect(constructSimpleTrace(traceArray)).toEqual(expectedTrace);
    });

    it('throws when given array with null(s) and integer items', () => {
        const traceArray1 = [null, 1, 9];
        const traceArray2 = [1, null, 9];
        const traceArray3 = [1, 9, null];
        const traceArray4 = [null, null, 1, 9];
        const traceArray5 = [null, 1, null, 9];
        const traceArray6 = [null, 1, 9, null];
        expect(wrapper(traceArray1)).toThrow('array contains null values');
        expect(wrapper(traceArray2)).toThrow('array contains null values');
        expect(wrapper(traceArray3)).toThrow('array contains null values');
        expect(wrapper(traceArray4)).toThrow('array contains null values');
        expect(wrapper(traceArray5)).toThrow('array contains null values');
        expect(wrapper(traceArray6)).toThrow('array contains null values');
    })

    it('throws when given array containing undefiend and regular items', () => {
        const traceArray1 = [undefined, 1, 9];
        const traceArray2 = [1, undefined, 9];
        const traceArray3 = [1, 9, undefined];
        const traceArray4 = [undefined, undefined, 1, 9];
        const traceArray5 = [undefined, 1, undefined, 9];
        const traceArray6 = [undefined, 1, 9, undefined];
        expect(wrapper(traceArray1)).toThrow('array contains undefined values');
        expect(wrapper(traceArray2)).toThrow('array contains undefined values');
        expect(wrapper(traceArray3)).toThrow('array contains undefined values');
        expect(wrapper(traceArray4)).toThrow('array contains undefined values');
        expect(wrapper(traceArray5)).toThrow('array contains undefined values');
        expect(wrapper(traceArray6)).toThrow('array contains undefined values');
    })
});

import { constructUnionTrace } from './TraceUtils.js';

describe('constructUnionTrace', () => {
    const wrapper = (traceArray1, traceArray2) => {
        return () => {
            constructUnionTrace(traceArray1, traceArray2);
        }
    }

    const arr1 = [1, 9, 1, 9];
    const expectedTrace1 = {
        cons: 'Cons',
        num: '9',
        trace: {
            cons: 'Cons',
            num: '1',
            trace: {
                cons: 'Cons',
                num: '9',
                trace: {
                    cons: 'Cons',
                    num: '1',
                    trace: null,
                },
            },
        },
    };

    const arr2 = [1, 13, 1, 13];
    const expectedTrace2 = {
        cons: 'Cons',
        num: '13',
        trace: {
            cons: 'Cons',
            num: '1',
            trace: {
                cons: 'Cons',
                num: '13',
                trace: {
                    cons: 'Cons',
                    num: '1',
                    trace: null,
                },
            },
        },
    };

    it('throws when first array is null', () => {
        expect(wrapper(null, arr1)).toThrow('first array is null');
    });

    it('throws when second array is null', () => {
        expect(wrapper(arr1, null)).toThrow('second array is null');
    });

    it('throws when first array is undefined', () => {
        expect(wrapper(undefined, arr1)).toThrow('first array is undefined');
    });

    it('throws when second array is undefined', () => {
        expect(wrapper(arr1, undefined)).toThrow('second array is undefined');
    });

    it('throws when first array contains a single null value', () => {
        const nullArray = [null];
        expect(wrapper(nullArray, arr1)).toThrow('first array contains null values');
    });

    it('throws when second array contains a single null value', () => {
        const nullArray = [null];
        expect(wrapper(arr1, nullArray)).toThrow('second array contains null values');
    });

    it('throws when first array contains a single undefined value', () => {
        const undefinedArray = [undefined];
        expect(wrapper(undefinedArray, arr1)).toThrow('first array contains undefined values');
    });

    it('throws when second array contains a single undefined value', () => {
        const undefinedArray = [undefined];
        expect(wrapper(arr1, undefinedArray)).toThrow('second array contains undefined values');
    });

    it('throws when first array contains both numbers and null values', () => {
        const nullArr1 = [null, 1, 2];
        const nullArr2 = [1, null, 2];
        const nullArr3 = [1, 2, null];
        expect(wrapper(nullArr1, arr1)).toThrow('first array contains null values');
        expect(wrapper(nullArr2, arr1)).toThrow('first array contains null values');
        expect(wrapper(nullArr3, arr1)).toThrow('first array contains null values');
    });

    it('throws when second array contains both numbers and null values', () => {
        const nullArr1 = [null, 1, 2];
        const nullArr2 = [1, null, 2];
        const nullArr3 = [1, 2, null];
        expect(wrapper(arr1, nullArr1)).toThrow('second array contains null values');
        expect(wrapper(arr1, nullArr2)).toThrow('second array contains null values');
        expect(wrapper(arr1, nullArr3)).toThrow('second array contains null values');
    });

    it('throws when first array contains both numbers and undefined values', () => {
        const undefinedArr1 = [undefined, 1, 2];
        const undefinedArr2 = [1, undefined, 2];
        const undefinedArr3 = [1, 2, undefined];
        expect(wrapper(undefinedArr1, arr1)).toThrow('first array contains undefined values');
        expect(wrapper(undefinedArr2, arr1)).toThrow('first array contains undefined values');
        expect(wrapper(undefinedArr3, arr1)).toThrow('first array contains undefined values');
    });

    it('throws when second array contains both numbers and undefined values', () => {
        const undefinedArr1 = [undefined, 1, 2];
        const undefinedArr2 = [1, undefined, 2];
        const undefinedArr3 = [1, 2, undefined];
        expect(wrapper(arr1, undefinedArr1)).toThrow('second array contains undefined values');
        expect(wrapper(arr1, undefinedArr2)).toThrow('second array contains undefined values');
        expect(wrapper(arr1, undefinedArr3)).toThrow('second array contains undefined values');
    });

    it('returns an object with \'trace1\' and \'trace2\' properties when given two single-value arrays', () => {
        const singleValueArray1 = [1];
        const singleValueArray2 = [2];
        const expectedTrace = {
            cons: 'Union',
            trace1: {
                cons: 'Cons',
                num: '1',
                trace: null,
            },
            trace2: {
                cons: 'Cons',
                num: '2',
                trace: null,
            },
        };
        expect(constructUnionTrace(singleValueArray1, singleValueArray2)).toEqual(expectedTrace);
    });

    it('returns an object with \'trace1\' and \'trace2\' properties when given two multivalue arrays', () => {
        const expectedTrace = {
            cons: 'union',
            trace1: expectedTrace1,
            trace2: expectedTrace2,
        };
        expect(constructUnionTrace(arr1, arr2)).toEqual(expectedTrace);
    });
});
