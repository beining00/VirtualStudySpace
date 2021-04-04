import React from 'react';
import ChatRoom from './ChatRoom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PersonalLog from './PersonalLog'

function MessageSection(){

    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Personal Log ">
            <PersonalLog />

            {/* <Sonnet /> */}
        </Tab>
        <Tab eventKey="profile" title="Global Chat">
        <ChatRoom />
            {/* <Sonnet /> */}
        </Tab>
        </Tabs>
    )
}

export default MessageSection;