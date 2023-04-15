import Head from "next/head";

const siteTitle = "crossUnift";

interface SEO {
    pageTitle: string;
    pageDescription: string;
}

interface TitleManagerProps {
    seo: SEO;
}

const TitleManager: React.FC<TitleManagerProps> = ({ seo }) => {
    return (
        <Head>
            <title>{siteTitle + " |  " + seo.pageTitle}</title>
            <meta name="description" content={seo.pageDescription} />
        </Head>
    );
};

export default TitleManager;
