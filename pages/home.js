import {getAll, getBySlug} from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import * as path from "path";
import Hero from "../components/hero";
import Section from "../components/section";
import {createContext} from "react";

export const PageContext = createContext([]);

export default function Home(props) {
  return (
      <>
          <Head>
            <title>{CMS_NAME}</title>
          </Head>

          <PageContext.Provider value={props}>
              {props.page.content.map((content, index) => {
                  let template = content.template;
                  switch (template) {
                      case 'hero' :
                        return (<Hero key={index}
                            title={content.title}
                        />)
                      case 'section' :
                          return (<Section key={index}
                              title={content.title}
                              lead={content.lead}
                              columns={content.column}
                              backgroundColour = {content.background_colour.toLowerCase()}
                          />)
                  }
              })}
          </PageContext.Provider>
      </>
  )
}

export async function getStaticProps() {
  const page = getBySlug(path.basename(__filename, '.js'), '_pages', [
    'title',
    'content'
  ]);

  console.log(page);

  const projects = getAll('_projects', [
      'title',
      'description',
      'gallery'
  ]);

  return {
    props: { page, projects },
  }
}
