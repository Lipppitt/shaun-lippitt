import {useTina} from "tinacms/dist/react";
import {Layout} from "../../components/layout/layout";
import Hero from "../../components/blocks/hero";
import client from "../../tina/__generated__/client";
import Section from "../../components/blocks/section";
import {PostMeta} from "../../components/posts/postMeta";
import format from "date-fns/format";

export default function Filename(props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const date = new Date(data.posts.date)
    let formattedDate = ''
    if (!isNaN(date.getTime())) {
        formattedDate = format(date, 'MMM dd, yyyy')
    }

  return (
      <>
          <Layout rawData={data} data={data.global}>
              <Hero
                  title={data.posts.title}
                  lead={data.posts.description}
              >
                  <PostMeta
                      author={data.posts.author}
                      date={formattedDate}
                  />
              </Hero>

              {props.data.posts.content.map((content, index) => {
                  let template = content.__typename;
                  switch (template) {
                      case "PostsContentSection" :
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
        postResponse = await client.queries.posts({ relativePath: `${params.filename}.md` })
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
