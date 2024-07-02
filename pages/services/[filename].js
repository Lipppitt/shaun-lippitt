import {useTina} from "tinacms/dist/react";
import {Layout} from "../../components/layout/layout";
import Hero from "../../components/blocks/hero";
import client from "../../tina/__generated__/databaseClient";
import Section from "../../components/blocks/section";

export default function Filename(props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    return (
        <>
            <Layout rawData={data} data={data.global}>
                <Hero
                    title={data.services.title}
                    lead={data.services.short_description}
                />
                {props.data.services.content.map((content, index) => {
                    let template = content.__typename;
                    switch (template) {
                        case "ServicesContentSection" :
                            return (<Section key={index}
                                             id={content.id}
                                             title={content.title}
                                             lead={content.lead}
                                             align={content.align ?? 'center'}
                                             columns={content.column}
                                             backgroundColour = {content.background_colour.toLowerCase()}
                            />)
                    }
                })}
            </Layout>
        </>
    )
}

export async function getServerSideProps({params}) {
    let postResponse = {}
    try {
        postResponse = await client.queries.services({ relativePath: `${params.filename}.md` })
    } catch {
        // swallow errors related to document creation
    }

    return {
        props: {
            data: postResponse.data,
            query: postResponse.query,
            variables: postResponse.variables,
        },
    }
}
