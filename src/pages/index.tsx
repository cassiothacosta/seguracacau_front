import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Container, Row, Col, Grid, Text, Spacer } from '@nextui-org/react';
import Registers from '../components/register'
import PieChart from '../components/pieChart'
import RegistersByType from '../components/registerByType';
import RegistersByCategory from '../components/registerByCategory'

export default function Home() {

  const user = useUser()

  return (
    <Layout>
      {user && (
        <Container gap={0}>
          <Row gap={0}>
            <Col>
              <Registers {...user} />
            </Col>
          </Row>

      <Spacer y={1} />
          <Row gap={0}>
            <Col>
              <Grid xs={12} css={{
                height: "400px"
              }}>
                <Text> Grafico Despesas/Fundos </Text>
                <RegistersByType {...user} />
              </Grid>
            </Col>
            <Col>
              <Grid xs={12} css={{
                height: "400px"
              }}>
                <Text> Grafico Despesas por Categorias </Text>
                <RegistersByCategory {...user} />
              </Grid>
            </Col>
          </Row>
        </Container>
      )}
      <style jsx>{`
          li {
            margin-bottom: 0.5rem;
          }
          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}</style>
    </Layout>
  )
}