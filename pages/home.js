import {getBySlug} from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import * as path from "path";
import Hero from "../components/hero";
import Section from "../components/section";

export default function Home(props) {
  return (
      <>
          <Head>
            <title>{CMS_NAME}</title>
          </Head>
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
      </>
  )
}

export async function getServerSideProps() {
  const page = getBySlug(path.basename(__filename, '.js'), '_pages', [
    'title',
    'content'
  ]);

  return {
    props: { page },
  }
}
