import { useUser } from '../lib/hooks'
import Layout from '../components/layout'
import { Container, Row, Col, Grid } from '@nextui-org/react';
import Registers from '../components/register'
import PieChart from '../components/pieChart'
import RegistersByType from '../components/registerByType';

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
                  <Grid xs={12}>
                  <PieChart />
                </Grid>
                   <Grid xs={12}>
                   <PieChart  />
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