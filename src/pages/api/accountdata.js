import request from "graphql-request";

const endPoint = process.env.NEXT_PUBLIC_AIRSTACK_API_ENDPOINT;
const query = (account) => `
      {
        TokenBalances(
          input: {filter: {owner: {_eq: "${account}" }, tokenType: {_in: ERC1155}}, blockchain: ethereum, order: {lastUpdatedTimestamp: DESC}}
        ) {
          TokenBalance {
            amount
            tokenType
            token {
              name
              contractMetaData {
                image
                name
              }
              tokenNfts {
                id
              }
            }
            tokenNfts {
              tokenId
              metaData {
                name
                description
                image
              }
              contentValue {
                image {
                  medium
                  extraSmall
                  large
                  original
                  small
                }
              }
            }
          }
        }
      }
    `;

export default async (req, res) => {
    try {
        const { account } = req.body;
        // const queryString = query(account !== '' ? account : "fc_fname:dwr");
        const queryString = query(account);
        const { TokenBalances } = await request(endPoint, queryString);

        // console.log(JSON.stringify(TokenBalances, null, 2));
        res.status(200).json({ TokenBalances });
    } catch (error) {
        // console.error("Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};
