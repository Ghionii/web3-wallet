class HttpClient {
  constructor() {
    this.apiKey = '7FMMYIQYCUHUYD5Y4781QFPWSDKTNNE8Q6';
  }

  async getTransactions(accountAddress) {
    try {
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${accountAddress}&tag=latest&apikey=${this.apiKey}`
      );

      if (response.ok) {
        const result = await response.json();
        if (result.status === '1') {
          return result.result;
        } else {
          throw new Error(`Etherscan API error: ${result.message}`);
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(
        `An error occurred in the getTransactions method: ${error}`
      );
    }
  }

  async getTotalBlocks() {
    try {
      const response = await fetch(
        `https://api-sepolia-etherscan.io/api?module=proxy&action=eth_getBlockByNumber&latestYes&apikey=${this.apiKey}`
      );

      if (response.ok) {
        const result = await response.json();
        if (result.status === '1') {
          return result.result;
        } else {
          throw new Error(`Etherscan API error: ${result.message}`);
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(
        `An error occurred in the getTransactions method: ${error}`
      );
    }
  }
}

export default HttpClient;
