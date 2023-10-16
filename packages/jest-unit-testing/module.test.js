import mut from './module.js'; // MUT = Module Under Test
//import exceptions from './ShareSaleException';

test('Testing initializing -- success', () => {
    let port = new mut.Portfolio();
    const expected = 0;
    const got = port.tickers.length;
    expect(got).toBe(expected);
});

test('Testing isEmpty -- success', () => {
    let port = new mut.Portfolio();
    expect(port.isEmpty()).toBeTruthy();
});

test('Testing numSymbols -- success', () => {
    let port = new mut.Portfolio();
    const expected = 0;
    const got = port.numSymbols();
    expect(got).toBe(expected);
});

test('Testing buying -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    const expected = 1;
    const got = port.numSymbols();
    expect(got).toBe(expected);
});

test('Testing buying -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    port.buy("AMZN", 5);
    const expected = 2;
    const got = port.numSymbols();
    expect(got).toBe(expected);
});

test('Testing selling -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    port.sell("AAPL", 5);
    const expected = 1;
    const got = port.numSymbols();
    expect(got).toBe(expected);
});

test('Testing numShares -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    port.sell("AAPL", 5);
    const expected = 5;
    const got = port.numShares("AAPL");
    expect(got).toBe(expected);
});

test('Testing no symbols with 0 stocks owned -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    port.sell("AAPL", 10);
    const expected = 0;
    const got = port.numSymbols();
    expect(got).toBe(expected);
});

test('Testing no symbols with 0 stocks owned -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    port.buy("AMZN", 5);
    port.sell("AAPL", 10);
    const expected = 1;
    const got = port.numSymbols();
    expect(got).toBe(expected);
});

test('Testing share sale exception -- success', () => {
    let port = new mut.Portfolio();
    port.buy("AAPL", 10);
    expect(() => {port.sell("AAPL", 15)}).toThrow(mut.ShareSaleException);
});