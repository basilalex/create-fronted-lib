import isLib from './isLib';

test('Checks if this is a lib', () => {
    expect(isLib()).toBe(true);
});
