import request from "graphql-request";

const endPoint = process.env.NEXT_PUBLIC_AIRSTACK_API_ENDPOINT;
const query = `
      {
        Token(
          input: {address: "0xd774557b647330C91Bf44cfEAB205095f7E6c367", blockchain: ethereum }
        ) {
          name
          logo {
            medium
          }
          tokenTraits
          contractMetaData {
            description
            image
            name
          }
          contractMetaDataURI
          symbol
          tokenBalances {
            amount
            tokenNfts {
              metaData {
                description
                image
                name
              }
            }
            tokenTransfers {
              amounts
              to {
                addresses
              }
              tokenNft {
                metaData {
                  image
                  name
                }
                tokenBalances {
                  amount
                }
              }
            }
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
    console.error("Error:", error.message); // 에러 메시지를 서버 콘솔에 출력
    res.status(500).json({ message: error.message }); // 에러 메시지를 클라이언트에 반환
  }
};
