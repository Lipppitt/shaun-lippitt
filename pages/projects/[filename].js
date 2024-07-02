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
              <div className="single-project">
                  <div className="col-md-6">
                      <div
                          className="project-thumbnail__image"
                          style={{backgroundImage: `url(${data.projects.featured_image})`, backgroundSize: 'cover'}}
                      />
                  </div>
                  <div className="col-md-6">
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

export async function getServerSideProps({params}) {
    let postResponse = {}
    try {
        postResponse = await client.queries.projects({ relativePath: `${params.filename}.md` })
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
