import './App.css';
import { Container, Row, Col } from 'react-bootstrap/';
import { Route, Routes } from "react-router-dom";
import ChatBoxModal from './components/ChatBoxModal';
import Questions from './components/Questions';


function App() {
  return (
    <div>
      <br />
      <Container fluid>
        <Row>
          <Col className="column1" lg={6} md={12}>
            <Questions />
          </Col>
          <Col className='column2' lg={6} md={12}>
            <Routes>
              <Route path="/" element={<ChatBoxModal />
              } />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
