import { constructSimpleTrace } from './TraceUtils.js';

describe('constructSimpleTrace', () => {
    // Used for testing throwing of error. Kinda counter-intuitive, but it
    // works.
    const constructSimpleTrace_ = (traceArray) => {
        return () => {
            constructSimpleTrace(traceArray);
        }
    }

    it('throws when given an empty array', () => {
        const traceArray = [];
        expect(constructSimpleTrace_(traceArray)).toThrow('array is empty');
    });

    it('throws when given null', () => {
        expect(constructSimpleTrace_(null)).toThrow('array is null');
    });

    it('throws when given undefined', () => {
        expect(constructSimpleTrace_(undefined)).toThrow('array is undefined');
    });

    it('throws when given an array containing only a single null value', () => {
        const traceArray = [null];
        expect(constructSimpleTrace_(traceArray)).toThrow('array contains null values');
    });

    it('throws when given an array containing only null values', () => {
        const traceArray = [null, null, null];
        expect(constructSimpleTrace_(traceArray)).toThrow('array contains null values');
    });

    it('throws when given an array containing only a single undefined value', () => {
        const traceArray = [undefined];
        expect(constructSimpleTrace_(traceArray)).toThrow('array contains undefined values');
    });

    it('throws when given an array containing only undefined values', () => {
        const traceArray = [undefined, undefined, undefined];
        expect(constructSimpleTrace_(traceArray)).toThrow('array contains undefined values');
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
        expect(constructSimpleTrace_(traceArray1)).toThrow('array contains null values');
        expect(constructSimpleTrace_(traceArray2)).toThrow('array contains null values');
        expect(constructSimpleTrace_(traceArray3)).toThrow('array contains null values');
        expect(constructSimpleTrace_(traceArray4)).toThrow('array contains null values');
        expect(constructSimpleTrace_(traceArray5)).toThrow('array contains null values');
        expect(constructSimpleTrace_(traceArray6)).toThrow('array contains null values');
    })

    it('throws when given array containing undefiend and regular items', () => {
        const traceArray1 = [undefined, 1, 9];
        const traceArray2 = [1, undefined, 9];
        const traceArray3 = [1, 9, undefined];
        const traceArray4 = [undefined, undefined, 1, 9];
        const traceArray5 = [undefined, 1, undefined, 9];
        const traceArray6 = [undefined, 1, 9, undefined];
        expect(constructSimpleTrace_(traceArray1)).toThrow('array contains undefined values');
        expect(constructSimpleTrace_(traceArray2)).toThrow('array contains undefined values');
        expect(constructSimpleTrace_(traceArray3)).toThrow('array contains undefined values');
        expect(constructSimpleTrace_(traceArray4)).toThrow('array contains undefined values');
        expect(constructSimpleTrace_(traceArray5)).toThrow('array contains undefined values');
        expect(constructSimpleTrace_(traceArray6)).toThrow('array contains undefined values');
    })
});

import { constructUnionTrace } from './TraceUtils.js';

describe('constructUnionTrace', () => {
    const constructUnionTrace_ = (traceArray1, traceArray2) => {
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

    it('throws when first array is empty', () => {
        const emptyArr = [];
        expect(constructUnionTrace_(emptyArr, arr1)).toThrow('first array is empty');
    })

    it('throws when first array is empty', () => {
        const emptyArr = [];
        expect(constructUnionTrace_(arr1, emptyArr)).toThrow('second array is empty');
    })

    it('throws when first array is null', () => {
        expect(constructUnionTrace_(null, arr1)).toThrow('first array is null');
    });

    it('throws when second array is null', () => {
        expect(constructUnionTrace_(arr1, null)).toThrow('second array is null');
    });

    it('throws when first array is undefined', () => {
        expect(constructUnionTrace_(undefined, arr1)).toThrow('first array is undefined');
    });

    it('throws when second array is undefined', () => {
        expect(constructUnionTrace_(arr1, undefined)).toThrow('second array is undefined');
    });

    it('throws when first array contains a single null value', () => {
        const nullArray = [null];
        expect(constructUnionTrace_(nullArray, arr1)).toThrow('first array contains null values');
    });

    it('throws when second array contains a single null value', () => {
        const nullArray = [null];
        expect(constructUnionTrace_(arr1, nullArray)).toThrow('second array contains null values');
    });

    it('throws when first array contains a single undefined value', () => {
        const undefinedArray = [undefined];
        expect(constructUnionTrace_(undefinedArray, arr1)).toThrow('first array contains undefined values');
    });

    it('throws when second array contains a single undefined value', () => {
        const undefinedArray = [undefined];
        expect(constructUnionTrace_(arr1, undefinedArray)).toThrow('second array contains undefined values');
    });

    it('throws when first array contains both numbers and null values', () => {
        const nullArr1 = [null, 1, 2];
        const nullArr2 = [1, null, 2];
        const nullArr3 = [1, 2, null];
        expect(constructUnionTrace_(nullArr1, arr1)).toThrow('first array contains null values');
        expect(constructUnionTrace_(nullArr2, arr1)).toThrow('first array contains null values');
        expect(constructUnionTrace_(nullArr3, arr1)).toThrow('first array contains null values');
    });

    it('throws when second array contains both numbers and null values', () => {
        const nullArr1 = [null, 1, 2];
        const nullArr2 = [1, null, 2];
        const nullArr3 = [1, 2, null];
        expect(constructUnionTrace_(arr1, nullArr1)).toThrow('second array contains null values');
        expect(constructUnionTrace_(arr1, nullArr2)).toThrow('second array contains null values');
        expect(constructUnionTrace_(arr1, nullArr3)).toThrow('second array contains null values');
    });

    it('throws when first array contains both numbers and undefined values', () => {
        const undefinedArr1 = [undefined, 1, 2];
        const undefinedArr2 = [1, undefined, 2];
        const undefinedArr3 = [1, 2, undefined];
        expect(constructUnionTrace_(undefinedArr1, arr1)).toThrow('first array contains undefined values');
        expect(constructUnionTrace_(undefinedArr2, arr1)).toThrow('first array contains undefined values');
        expect(constructUnionTrace_(undefinedArr3, arr1)).toThrow('first array contains undefined values');
    });

    it('throws when second array contains both numbers and undefined values', () => {
        const undefinedArr1 = [undefined, 1, 2];
        const undefinedArr2 = [1, undefined, 2];
        const undefinedArr3 = [1, 2, undefined];
        expect(constructUnionTrace_(arr1, undefinedArr1)).toThrow('second array contains undefined values');
        expect(constructUnionTrace_(arr1, undefinedArr2)).toThrow('second array contains undefined values');
        expect(constructUnionTrace_(arr1, undefinedArr3)).toThrow('second array contains undefined values');
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
            cons: 'Union',
            trace1: expectedTrace1,
            trace2: expectedTrace2,
        };
        expect(constructUnionTrace(arr1, arr2)).toEqual(expectedTrace);
    });
});

import { traceEquals } from './TraceUtils.js';

describe('traceEquals', () => {
    const traceEquals_ = (trace1, trace2) => {
        return () => {
            traceEquals(trace1, trace2);
        }
    }

    const shortTraceArr = [1];
    const shortTrace = constructSimpleTrace(shortTraceArr);
    const shortTraceEqual = constructSimpleTrace(shortTraceArr);

    const longTrace1Arr = [1, 9, 1, 15];
    const longTrace1 = constructSimpleTrace(longTrace1Arr);
    const longTrace1Equal = constructSimpleTrace(longTrace1Arr);

    const longTrace2Arr = [1, 15, 1, 15];
    const longTrace2 = constructSimpleTrace(longTrace2Arr);
    const longTrace2Equal = constructSimpleTrace(longTrace2Arr);

    const unionTrace = constructUnionTrace(longTrace1Arr, longTrace2Arr);
    const unionTraceEqual = constructUnionTrace(longTrace1Arr, longTrace2Arr);

    const longUnionTrace = {
        cons: 'Cons',
        num: '1',
        trace: constructUnionTrace(longTrace1Arr, longTrace2Arr),
    };
    const longUnionTraceEqual = {
        cons: 'Cons',
        num: '1',
        trace: constructUnionTrace(longTrace1Arr, longTrace2Arr),
    };

    const invalidTrace = {
        cons: 'Invalid',
        num: 1,
        trace: null,
    };

    it('throws for first trace undefined', () => {
        expect(traceEquals_(undefined, null)).toThrow('first trace is undefined');
        expect(traceEquals_(undefined, longTrace1)).toThrow('first trace is undefined');
    });

    it('throws for second trace undefined', () => {
        expect(traceEquals_(null, undefined)).toThrow('second trace is undefined');
        expect(traceEquals_(longTrace1, undefined)).toThrow('second trace is undefined');
    });

    it('throws for invalid `cons` on first trace', () => {
        expect(traceEquals_(invalidTrace, longTrace1)).toThrow('invalid cons on first trace: \'Invalid\'');
        expect(traceEquals_(invalidTrace, unionTrace)).toThrow('invalid cons on first trace: \'Invalid\'');
    });

    it('throws for invalid `cons` on second trace', () => {
        expect(traceEquals_(longTrace1, invalidTrace)).toThrow('invalid cons on second trace: \'Invalid\'');
        expect(traceEquals_(unionTrace, invalidTrace)).toThrow('invalid cons on second trace: \'Invalid\'');
    });

    it('is false for one null trace and one non-null trace', () => {
        expect(traceEquals(null, shortTrace)).toBe(false);
        expect(traceEquals(shortTrace, null)).toBe(false);

        expect(traceEquals(null, longTrace1)).toBe(false);
        expect(traceEquals(longTrace1, null)).toBe(false);

        expect(traceEquals(null, unionTrace)).toBe(false);
        expect(traceEquals(unionTrace, null)).toBe(false);

        expect(traceEquals(null, longUnionTrace)).toBe(false);
        expect(traceEquals(longUnionTrace, null)).toBe(false);
    });

    it('is false for one short trace and one long trace', () => {
        expect(traceEquals(shortTrace, longTrace1)).toBe(false);
        expect(traceEquals(longTrace1, shortTrace)).toBe(false);
    });

    it('is false for one `Cons`-only trace and one `Union`-only trace', () => {
        expect(traceEquals(longTrace1, unionTrace)).toBe(false);
        expect(traceEquals(unionTrace, longTrace1)).toBe(false);
    });

    it('is false for one `Union`-only trace and one "mixed" trace', () => {
        expect(traceEquals(unionTrace, longUnionTrace)).toBe(false);
        expect(traceEquals(longUnionTrace, unionTrace)).toBe(false);
    });

    it('is false for two equally long, but different, `Cons`-only traces', () => {
        expect(traceEquals(longTrace1, longTrace2)).toBe(false);
        expect(traceEquals(longTrace2, longTrace1)).toBe(false);
    });

    it('is true for two "short" (single element) `Cons`-only traces', () => {
        expect(traceEquals(shortTrace, shortTraceEqual)).toBe(true);
        expect(traceEquals(shortTraceEqual, shortTrace)).toBe(true);
    });

    it('is true for two "long" (multiple elements) `Cons`-only traces', () => {
        expect(traceEquals(longTrace1, longTrace1Equal)).toBe(true);
        expect(traceEquals(longTrace1Equal, longTrace1)).toBe(true);

        expect(traceEquals(longTrace2, longTrace2Equal)).toBe(true);
        expect(traceEquals(longTrace2Equal, longTrace2)).toBe(true);
    });

    it('is true for two `Union`-only traces', () => {
        expect(traceEquals(unionTrace, unionTraceEqual)).toBe(true);
        expect(traceEquals(unionTraceEqual, unionTrace)).toBe(true);
    });

    it('is true for two "mixed" traces', () => {
        expect(traceEquals(longUnionTrace, longUnionTraceEqual)).toBe(true);
        expect(traceEquals(longUnionTraceEqual, longUnionTrace)).toBe(true);
    });
});

import { traceLength } from './TraceUtils.js';

describe('traceLength', () => {
    const traceLength_ = (trace) => {
        return () => {
            traceLength(trace);
        }
    }

    const shortTraceArr = [1];
    const shortTrace = constructSimpleTrace(shortTraceArr);

    const longTrace1Arr = [1, 9, 1, 15];
    const longTrace1 = constructSimpleTrace(longTrace1Arr);

    const longTrace2Arr = [1, 15, 1, 15];
    const longTrace2 = constructSimpleTrace(longTrace2Arr);

    const unionTrace = constructUnionTrace(longTrace1Arr, longTrace2Arr);

    const longUnionTrace = {
        cons: 'Cons',
        num: '1',
        trace: constructUnionTrace(longTrace1Arr, longTrace2Arr),
    };

    it('throws on undefined trace', () => {
        expect(traceLength_(undefined)).toThrow('trace is undefined');
    });

    it('returns 0 on null trace (i.e. empty trace)', () => {
        expect(traceLength(null)).toBe(0);
    });

    it('returns 1 on short trace', () => {
        expect(traceLength(shortTrace)).toBe(1);
    });

    it('returns 4 on long trace', () => {
        expect(traceLength(longTrace1)).toBe(4);
    });

    it('returns 1 on union trace', () => {
        expect(traceLength(unionTrace)).toBe(1);
    });

    it('returns 2 on long union trace', () => {
        expect(traceLength(longUnionTrace)).toBe(2);
    });
});

import { firstN } from './TraceUtils.js';

describe('firstN', () => {
    const firstN_ = (trace, n) => {
        return () => {
            firstN(trace, n);
        }
    }

    const shortTraceArr = [1];
    const shortTrace = constructSimpleTrace(shortTraceArr);

    const longTrace1Arr = [1, 9, 1, 15];
    const longTrace1 = constructSimpleTrace(longTrace1Arr);

    const longTrace2Arr = [1, 15, 1, 15];
    const longTrace2 = constructSimpleTrace(longTrace2Arr);

    const unionTrace = constructUnionTrace(longTrace1Arr, longTrace2Arr);

    const longUnionTrace = {
        cons: 'Cons',
        num: '1',
        trace: constructUnionTrace(longTrace1Arr, longTrace2Arr),
    };

    it('throws on undefined `trace`', () => {
        expect(firstN_(undefined, 2)).toThrow('trace is undefined');
    });

    it('throws on undefined `n`', () => {
        expect(firstN_(shortTrace, undefined)).toThrow('number is undefined');
    });

    it('throws on null `n`', () => {
        expect(firstN_(shortTrace, null)).toThrow('number is null');
    });

    it('throws on negative `n`', () => {
        expect(firstN_(shortTrace, -2)).toThrow('number is negative');
    });

    it('returns null (i.e. empty trace) on empty `trace` and `n` === 0', () => {
        expect(firstN(null, 0)).toBeNull();
    });

    it('returns null (i.e. empty trace) on non-empty `trace` and `n` === 0', () => {
        expect(firstN(shortTrace, 0)).toBeNull();
        expect(firstN(longTrace1, 0)).toBeNull();
        expect(firstN(longTrace2, 0)).toBeNull();
        expect(firstN(unionTrace, 0)).toBeNull();
        expect(firstN(longUnionTrace, 0)).toBeNull();
    });

    it('returns null (i.e. empty trace) on empty `trace` and `n` === 1', () => {
        expect(firstN(null, 1)).toBeNull();
    });

    it('returns same trace on short trace and `n` === 1', () => {
        const shortTraceFirst1 = constructSimpleTrace([1]);
        expect(firstN(shortTrace, 1)).toEqual(shortTraceFirst1);
    });

    it('returns first element of long trace and `n` === 1', () => {
        const longTrace1First1 = constructSimpleTrace([1]);
        expect(firstN(longTrace1, 1)).toEqual(longTrace1First1);

        const longTrace2First1 = constructSimpleTrace([1]);
        expect(firstN(longTrace2, 1)).toEqual(longTrace2First1);
    });

    it('returns same trace on short union trace and `n` === 1', () => {
        const unionTraceFirst1 = constructUnionTrace(longTrace1Arr, longTrace2Arr);
        expect(firstN(unionTrace, 1)).toEqual(unionTraceFirst1);
    });

    it('returns `Union` part on long union trace and `n` === 1', () => {
        const longUnionTraceFirst1 = constructUnionTrace(longTrace1Arr, longTrace2Arr);
        expect(firstN(longUnionTrace, 1)).toEqual(longUnionTraceFirst1);
    });

    it('returns same trace on short trace and `n` === 999', () => {
        const shortTraceFirst999 = constructSimpleTrace([1]);
        expect(firstN(shortTrace, 999)).toEqual(shortTraceFirst999);
    });

    it('returns same trace on long trace and `n` === 4', () => {
        const longTrace1First4 = constructSimpleTrace(longTrace1Arr);
        expect(firstN(longTrace1, 4)).toEqual(longTrace1First4);

        const longTrace2First4 = constructSimpleTrace(longTrace2Arr);
        expect(firstN(longTrace2, 4)).toEqual(longTrace2First4);
    });

    it('returns same trace on long trace and `n` === 999', () => {
        const longTrace1First999 = constructSimpleTrace(longTrace1Arr);
        expect(firstN(longTrace1, 999)).toEqual(longTrace1First999);

        const longTrace2First999 = constructSimpleTrace(longTrace2Arr);
        expect(firstN(longTrace2, 999)).toEqual(longTrace2First999);
    });

    it('returns same trace on union trace and `n` === 999', () => {
        const unionTraceFirst999 = constructUnionTrace(longTrace1Arr, longTrace2Arr);
        expect(firstN(unionTrace, 999)).toEqual(unionTraceFirst999);
    });

    it('returns same trace on long union trace and `n` === 2', () => {
        const longUnionTraceFirst2 = {
            cons: 'Cons',
            num: '1',
            trace: constructUnionTrace(longTrace1Arr, longTrace2Arr),
        };
        expect(firstN(longUnionTrace, 2)).toEqual(longUnionTraceFirst2);
    });

    it('returns same trace on long union trace and `n` === 999', () => {
        const longUnionTraceFirst999 = {
            cons: 'Cons',
            num: '1',
            trace: constructUnionTrace(longTrace1Arr, longTrace2Arr),
        };
        expect(firstN(longUnionTrace, 999)).toEqual(longUnionTraceFirst999);
    });
});
