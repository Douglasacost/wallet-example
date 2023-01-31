import { Col, Row, Text } from '@nextui-org/react'

/**
 * Types
 */
interface IProps {
  methods: string[]
}

/**
 * Component
 */
export default function RequestMethodCard({ methods }: IProps) {
  return (
    <Row>
      <Col>
        <Text h5>Methods</Text>
        <Text color="$gray400" style={{
          height: '200px',
          overflow: 'auto'
        }}>{methods.map(method => method).join(', ')}</Text>
      </Col>
    </Row>
  )
}
