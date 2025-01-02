import {
    getPanelElement,
    getPanelGroupElement,
    getResizeHandleElement,
    Panel,
    PanelGroup,
    PanelResizeHandle,
  } from "react-resizable-panels";
  import { useRef, useEffect, useContext, useState } from "react";
  import { UsersContext} from 'context/Context';
  import users from "data/users/users";
import User from "./user/User";


export function ContactList() {
    const refs = useRef();
    const [obj, setObj] = useState()
    const [selectedIndex, setSelectedIndex] = useState()
    const [layoutsOrder, setLayoutsOrder] = useState([]);

  const handleUserReorder = (sourceIndex, destinationIndex) => {
    const newLayouts = [...layoutsOrder];
    const [removed] = newLayouts.splice(sourceIndex, 1);
    newLayouts.splice(destinationIndex, 0, removed);
    setLayoutsOrder(newLayouts);
  };
  
    useEffect(() => {
      const groupElement = getPanelGroupElement("group");
      const leftPanelElement = getPanelElement("left-panel");
      const rightPanelElement = getPanelElement("right-panel");
      const resizeHandleElement = getResizeHandleElement("resize-handle");
      const jsonString = JSON.stringify(users); // 2 для форматирования с отступами
      // If you want to, you can store them in a ref to pass around
  
        setObj(JSON.parse(jsonString))
    
      refs.current = {
        groupElement,
        leftPanelElement,
        rightPanelElement,
        resizeHandleElement,
      };
    }, []);

    useEffect(() => {
      // This useEffect will run AFTER obj has been updated
      if (obj) { // Important check to prevent errors on initial render
        console.log("Updated obj:", obj);
          //Now you can safely use obj here
          console.log(obj?.layoutsOrder[0]?.content?.structure?.rows)
      }
    }, [obj]); // The dependency array [obj] is crucial
  
      console.log(obj)

      
    return(
    
      <UsersContext.Provider value={obj}>
        <PanelGroup direction="horizontal">
        <Panel defaultSize={30} minSize={20}>
        <ul>
          {
            obj?.layoutsOrder?.map((o, index) =>
              <li key={index} onClick={()=>setSelectedIndex(index)}>
                {o?.name ||  'salammssssssssss'}
              </li>
            )
          }
        </ul>
        </Panel>
        <PanelResizeHandle  className="border border-3 border-primary"/>
        <Panel minSize={30}>
          <User index={selectedIndex} />
        </Panel>
        <PanelResizeHandle className="border border-2 border-dark"/>
        <Panel defaultSize={30} minSize={20}>
          right
        </Panel>
      </PanelGroup>
      </UsersContext.Provider>
    );
  }