import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import Katalog from '../components/Landing/Katalog';

export default function Page() {
    const router = useRouter();
    const { katalog } = router.query;

    return (
        <Layout>
            <Katalog category={katalog}/>
        </Layout>
    )
}