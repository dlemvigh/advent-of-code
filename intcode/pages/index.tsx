import Head from 'next/head'
import styled from "styled-components";
import { Intcode } from "../components/Intcode";

const Content = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;

  box-shadow: 0 0 400px hsl(220, 15%, 30%);
`

export default function Home() {
  return (
    <div>
      <Head>
        <title>Intcode</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Intcode />
      </Content>
    </div>
  )
}
