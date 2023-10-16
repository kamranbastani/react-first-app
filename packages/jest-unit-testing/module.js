//import ShareSaleException from './ShareSaleException'

class Portfolio {
    constructor() {
        this.tickers = [];
        this.numSharesOwned = [];
    }

    isEmpty() {
        return this.tickers.length === 0;
    }

    numSymbols() {
        return this.tickers.length;
    }

    buy(symbol, num) {
        let index = this.tickers.indexOf(symbol);
        if(index === -1) {
            this.tickers.push(symbol)
            this.numSharesOwned.push(num)
        }
        else {
            this.numSharesOwned[index] += num
        }
    }

    sell(symbol, num) {
        let index = this.tickers.indexOf(symbol);
        if(index !== -1) {
            if(this.numSharesOwned[index] < num) {
                throw new ShareSaleException;
            }
            else {
                this.numSharesOwned[index] -= num
                if(this.numSharesOwned[index] === 0) {
                    this.tickers.splice(index, 1);
                    this.numSharesOwned.splice(index, 1);
                }
            }
        }
    }

    numShares(symbol) {
        let index = this.tickers.indexOf(symbol);
        if(index === -1) {
            return 0;
        }
        else {
            return this.numSharesOwned[index];
        }
    }
}

class ShareSaleException extends Error {
    constructor(message) {
        super(message);
        this.name = "ShareSaleException";
    }
}

export default { Portfolio, ShareSaleException };