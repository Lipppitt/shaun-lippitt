import client from "../tina/__generated__/databaseClient";
import {Layout} from "../components/layout/layout";
import {Container} from "../components/util/container";
import {Posts} from "../components/posts/posts";

export default function Filename(props) {
    const posts =  props.data.postsConnection.edges;

    return (
      <>
            <Layout>
                <Container className="container">
                    <Posts data={posts} />
                </Container>
            </Layout>
      </>
  )
}

export async function getServerSideProps({params}) {
    const tinaProps = await client.queries.postsConnection();
    return {
        props: {
            ...tinaProps,
        },
    }
}
