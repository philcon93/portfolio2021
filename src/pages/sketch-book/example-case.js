import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { PostTitle } from '../../components';
import { CMS_NAME } from '../../utilities/constants';
import Head from 'next/head';

export default function Post() {
  const router = useRouter()
  if (!router.isFallback) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{CMS_NAME} | sketch</title>
              </Head>
              content
            </article>
          </>
        )}
    </>
  )
}
