import {useTina} from "tinacms/dist/react";
import {Layout} from "../../components/layout/layout";
import client from "../../tina/__generated__/client";
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
              <div className="single-project">
                  <div className="col-12 col-lg-6">
                      <div
                          className="project-thumbnail__image"
                          style={{backgroundImage: `url(${data.projects.featured_image})`, backgroundSize: 'cover'}}
                      />
                  </div>
                  <div className="col-12 col-lg-6">
                      {props.data.projects.content?.map((content, index) => {
                          let template = content.__typename;
                          switch (template) {
                              case "ProjectsContentSection" :
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
                  </div>
              </div>
          </Layout>
      </>
  )
}

export const getStaticPaths = async () => {
    let paths = [];

    try {
        // Fetch all available page filenames
        const projectListResponse = await client.queries.projectsConnection();
        const projectPaths = projectListResponse.data.projectsConnection.edges.map((project) => ({
            params: { slug: project.node._sys.filename },
        }));

        // Combine page paths and post paths into the paths array
        paths = [...projectListResponse];
    } catch (error) {
        console.error('Error fetching paths:', error);
    }

    return {
        paths,
        fallback: 'blocking',
    };
};

export async function getStaticProps({params}) {
    let projectResponse = {}
    try {
        projectResponse = await client.queries.projects({ relativePath: `${params.filename}.md` })
    } catch {
        // swallow errors related to document creation
    }

    return {
        props: {
            data: projectResponse.data,
            query: projectResponse.query,
            variables: projectResponse.variables,
        },
    }
}
