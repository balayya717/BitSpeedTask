import './App.css'
import React,{useCallback, useState} from 'react';
import ReactFlow,{Controls, Background, applyEdgeChanges, applyNodeChanges, addEdge} from 'reactflow'
import 'reactflow/dist/style.css'
import {TextField} from "@mui/material";

function App() {
  const initialNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: 'Hello' },
      type: 'input',
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: 'World' },
    }
  ]
  const initialEdges = [{ id: "12", source: "1", target: "2" }];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isMessgaClicked, setMessageClicked] = useState(false);
  const [message,setMessage]  = useState('');


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const clickedMesage = () =>{
    setMessageClicked(true);
  }

  const clickedBack = () =>{
    setMessageClicked(false);
  }

  const handleDescriptionChange = (e) =>{
    setMessage(e.target.value);
  }

  const addNode = async () =>{
    const newID = nodes.length+1;
    const obj = {
      id: newID.toString(),
      position: { x: 50, y: 50 },
      data: { label: message }, 
    }
    const newArr = [...nodes, obj];
    setNodes(newArr);
    setMessageClicked(false);
    setMessage('');
  }

  const hasAtleastOneEndConnected = (nodeId) => {
    const connectedEdges = edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);
    return (connectedEdges.length >= 1);
  };
  

  const saveChanges = async () => {
    const hasUnconnectedNode = await nodes.some((node) => !hasAtleastOneEndConnected(node.id));
  
    if (hasUnconnectedNode) {
      alert("Cannot save the flow...");
      return;
    }
    
    alert("Saved successfully...!!");
  }

  return (
    <div>
      <div className='header'>
        <button className='button' onClick={saveChanges}>Save Changes</button>
      </div>
      <div className='container'>
        <div className='mainPanel' >
          <ReactFlow nodes={nodes} edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onConnect={onConnect}
          fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <div className='nodesPanel'>
          { !isMessgaClicked && (
            <button className='button button-1' onClick={clickedMesage}>
            <div>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={'20px'} height={'20px'}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <path d="M8 10H16M8 14H16M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" 
                stroke="#2E84FF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"></path> </g>
              </svg>
            </div>
            <div>Message</div>
          </button>
          )}
          { isMessgaClicked && (
            <div>
              <div className='topContainer'>
                <div className='backIcon' onClick={clickedBack}>
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000" width={'20px'} height={'20px'}>
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round">
                    </g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                      <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g>
                  </svg>
                </div>
                <div className='messagetext'>
                  Message
                </div>
              </div>
              <div className='bottomContainer'>
                <div style={{marginBottom: '14px'}}>Text</div>
                <TextField
                    required
                    id="nodeMessage"
                    label="Enter the message"
                    onChange={handleDescriptionChange}
                    InputProps={{
                      className: "messageTextInput",
                    }}
                    multiline
                    rows={4}
                />
                <button className={`addButton ${(message.length === 0) ? 'disaable' : ''}`} 
                disabled={message.length === 0} onClick={addNode}>Add Node</button>
              </div> 
            </div> 
          )}
        </div>
      </div>
    </div>
  )
}

export default App
