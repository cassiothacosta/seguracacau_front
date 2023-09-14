import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Container, Row, Col, Grid, Text } from '@nextui-org/react';
import Registers from '../components/register'
import PieChart from '../components/pieChart'
import RegistersByType from '../components/registerByType';
import RegistersByCategory from '../components/registerByCategory'

export default function Home() {

  const user = useUser()

  return (
    <Layout>
      {user && (
        <Row>
          <Grid.Container gap={2} justify="center">
            <Grid xs={8}>
              <Col>
                <Registers {...user} />
              </Col>
            </Grid>
            <Grid xs={4}>
              <Grid.Container gap={2} justify="center">   
                  <Grid xs={12} css={{
                    height:"400px"
                   }}>
                    <Text> Grafico Despesas/Fundos </Text>
                  <RegistersByType {...user}/>
                </Grid>
                   <Grid xs={12} css={{
                    height:"400px"
                   }}>
                   <Text> Grafico Despesas por Categorias </Text>
                   <RegistersByCategory {...user}/>
                 </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Row>

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