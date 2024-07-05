import { SWRConfig } from "swr";
import "@/styles/bootstrap.min.css";
import Layout from "@/components/Layout";
import RouteGuard from "@/components/RouteGuard";

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }
    return res.json();
};

export default function App({ Component, pageProps }) {
    return (
        <SWRConfig value={{ fetcher }}>
            {/* <RouteGuard>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RouteGuard> */}
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SWRConfig>
    );
}
