import request from "graphql-request";

const endPoint = process.env.NEXT_PUBLIC_AIRSTACK_API_ENDPOINT;
const query = (address) => `
      {
        NFTSaleTransactions(
          input: {filter: {dappName: {_eq: opensea}, nfts: {tokenAddress: {_eq: "${address}"}}}, blockchain: ethereum, limit: 30, order: {blockTimestamp: DESC}}
        ) {
          NFTSaleTransaction {
            id
            from {
              identity
            }
            to {
              identity
            }
            paymentAmount
            paymentToken {
              symbol
            }
            blockTimestamp
            nfts {
              tokenId
            }
          }
        }
      }
    `;

export default async (req, res) => {
  try {
    const { colAddress } = req.body;
    const queryString = query(colAddress);
    // console.log(queryString)
    const data = await request(endPoint, queryString);
    // console.log(JSON.stringify(data, null, 2)); // 서버 콘솔에 전체 데이터 출력
    res.status(200).json(data.NFTSaleTransactions.NFTSaleTransaction);
  } catch (error) {
    // console.error("Error:", error.message); // 에러 메시지를 서버 콘솔에 출력
    res.status(500).json({ message: error.message }); // 에러 메시지를 클라이언트에 반환
  }
};
