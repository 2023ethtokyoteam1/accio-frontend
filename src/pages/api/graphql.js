import request from 'graphql-request';

    const endPoint = process.env.NEXT_PUBLIC_AIRSTACK_API_ENDPOINT;
    const query = `
      {
        Tokens(input: {filter: {address: {_eq: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"}}, blockchain: ethereum}) {
          Token {
            address
            baseURI
            chainId
            contractMetaDataURI
            currentHolderCount
            decimals
            id
            lastTransferBlock
            lastTransferHash
            lastTransferTimestamp
            name
            rawContractMetaData
            symbol
            tokenBalance {
              owner {
                addresses
              }
              amount
            }
            tokenNfts {
              id
              tokenId
              tokenURI
              metaData {
                name
              }
              contentValue {
                image {
                  large
                  medium
                  original
                  small
                  extraSmall
                }
              }
            }
            tokenTraits
            totalSupply
            type
            transferCount
          }
          pageInfo {
            nextCursor
            prevCursor
          }
        }
      }
    `;

  
export default async (req, res) => {
  try {
    const data = await request(endPoint, query);
    console.log(JSON.stringify(data, null, 2)); // 서버 콘솔에 전체 데이터 출력
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error.message); // 에러 메시지를 서버 콘솔에 출력
    res.status(500).json({ message: error.message }); // 에러 메시지를 클라이언트에 반환
  }
};