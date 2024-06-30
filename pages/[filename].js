import Hero from "../components/blocks/hero";
import Section from "../components/blocks/section";
import ProjectSlider from "../components/blocks/projectSlider";
import client from "../tina/__generated__/client";
import {Layout} from "../components/layout/layout";
import {useTina} from "tinacms/dist/react";
import {PostProvider} from "../context/postsContext";
import Head from "next/head";
import {LoadingSplashScreen} from "../components/layout/splash-screen";
import {useEffect, useState} from "react";

export default function Filename(props) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const title = data?.pages?.seo_title ?? data.pages.title;
    const description = data?.pages?.seo_description ?? '';

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

  return (
      <>
          {isLoading && <LoadingSplashScreen />}

          <PostProvider posts={props.posts}>
              <Head>
                  <title>{title}</title>
                  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                  <meta
                      name="description"
                      content={description}
                      key="desc"
                  />
                  <link rel="icon" href="/favicon.png" sizes="any" />
              </Head>
              <Layout rawData={data} data={data.global}>
              {props.data.pages.content.map((content, index) => {
                  let template = content.__typename;

                  switch (template) {
                      case "PagesContentHero" :
                        return (<Hero key={index}
                            title={content.title}
                        />)
                      case "PagesContentSection" :
                          return (<Section key={index}
                              id={content.custom_id}
                              title={content.title}
                              lead={content.lead}
                              align={content.align ?? 'center'}
                              columns={content.column}
                              backgroundColour = {content.background_colour.toLowerCase()}
                          />)
                      case "PagesContentProject_slider" :
                          return (
                              <ProjectSlider key={index}
                                            projects={content.projects}
                                            title="Projects"
                              />
                          )
                  }
              })}
              </Layout>
          </PostProvider>
      </>
  )
}

export async function getServerSideProps({params}) {
    let postResponse = {}
    let posts = {};
    try {
        postResponse = await client.queries.pages({ relativePath: `${params.filename}.md` });
        posts = await client.queries.postsConnection({ first: 2 });
    } catch {
        // swallow errors related to document creation
    }

    const pageProps = {
            data: postResponse.data,
            query: postResponse.query,
            variables: postResponse.variables,
            posts: posts.data?.postsConnection.edges
    }

    return {
        props: {
            ...pageProps
        }
    };
}
