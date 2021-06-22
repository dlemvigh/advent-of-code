import { useState } from "react";
import Head from 'next/head'
import styled from "styled-components";
import { Intcode } from "../components/Intcode";
import { useRenderCount } from '../hooks/useRenderCount';
const Content = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  min-height: 100vh;

  box-shadow: 0 0 400px hsl(220, 15%, 30%);
`

export default function Home() {
  const count = useRenderCount();
  const [username, setUsername] = useState("World");
  const otherUsername = username === "World" ? "Universe" : "World"; return (
    <div>
      <Head>
        <title>Intcode</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Content>
        <Intcode />
        <div>
          <p>Hello, {username}!</p>
          <p>
            I have rendered {count} time{count !== 1 ? "s" : undefined}!
          </p>
          <button onClick={() => setUsername(otherUsername)}>
            Change name to "{otherUsername}"
          </button>
        </div>
      </Content>
    </div>
  )
}
