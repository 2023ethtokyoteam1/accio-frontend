import Head from "next/head";

const siteTitle = "nftLane";

interface Props {
  pageTitle : string;
  pageDescription : string;
}

export default function TitleManager(props : Props) {
  return (
    <Head>
      <title>{siteTitle + " |  " + props.pageTitle}</title>
      <meta name="description" content={props.pageDescription} />
    </Head>
  );
}