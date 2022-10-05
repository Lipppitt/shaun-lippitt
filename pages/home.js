import {getBySlug} from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import * as path from "path";
import Hero from "../components/hero";
import Section from "../components/section";

export default function Home({ getPage }) {
  const page = getPage;
  return (
      <>
          <Head>
            <title>{CMS_NAME}</title>
          </Head>

          {page.content.map((content, index) => {
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
                          content={content.content}
                          backgroundColour ={content.backgroundColour}
                      />)
              }
          })}
      </>
  )
}

export async function getStaticProps() {
  const getPage = getBySlug(path.basename(__filename, '.js'), '_pages', [
    'title',
    'content'
  ]);

  return {
    props: { getPage },
  }
}
