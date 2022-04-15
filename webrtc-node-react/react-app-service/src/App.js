import React, { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
import io from "socket.io-client"
import "./App.css"
import { Button, Col, Container, Figure, ListGroup, Row } from "react-bootstrap"
import { VideoStreamMerger } from "video-stream-merger"

const socket = io.connect('http://localhost:8000')

function App() {

  const [me, setMe] = useState([])
  const [stream, setStream] = useState()
  const [mergedStream, setMergedStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false)
  const [caller, setCaller] = useState("")
  const [callerSignal, setCallerSignal] = useState()
  const [callAccepted, setCallAccepted] = useState(false)
  const [idToCall, setIdToCall] = useState("")
  const [callEnded, setCallEnded] = useState(false)
  const [callRecord, setCallRecord] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [blobUrl, setBlobUrl] = useState(null);
  const [name, setName] = useState("")
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  const recVideo = useRef()

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then((stream) => {
      setStream(stream)
      myVideo.current.srcObject = stream
    })

    socket.on("join", (users) => {
      console.log(users)
      setMe(users)
    })
    socket.on("user-disconnected", (id) => {
      console.log(id)
    })
  }, [])

  const joinCall = (userName) => {
    const data = {
      name: 'Param'
    }
    socket.emit('join', data)
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={3}>
            <ListGroup>
            <ListGroup.Item><Button onClick={()=>joinCall()}>Join</Button></ListGroup.Item>
              
            </ListGroup>
          </Col>
          <Col>
          <div className="video myVideo">
            {stream && <video className={ callAccepted && !callEnded ? "myVideoFrame": "myStreamV"} playsInline muted ref={myVideo} autoPlay />}
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
